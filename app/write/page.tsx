"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import WritingHeader from "../components/WritingHeader";
import MarkdownEditor from "../components/MarkdownEditor";

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleSave = async (isPublished: boolean) => {
        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        if (isPublished) {
            setIsPublishing(true);
        } else {
            setIsSaving(true);
        }

        try {
            let finalCoverImage = coverImageUrl;

            // 1. 파일이 있으면 Supabase Storage에 업로드 (클라이언트 사이드에서 바로 처리하거나, Presigned URL 사용 가능. 여기서는 클라이언트 래퍼 사용)
            if (coverImageFile) {
                // To safely upload from client, we use the browser client
                const { createClient } = await import('@/lib/supabase/client');
                const supabaseClient = createClient();

                const fileExt = coverImageFile.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError, data: uploadData } = await supabaseClient.storage
                    .from('post_images')
                    .upload(filePath, coverImageFile);

                if (uploadError) {
                    console.error("Image upload error:", uploadError);
                    alert("이미지 업로드에 실패했습니다. 버킷 권한을 확인해주세요.");
                    setIsSaving(false);
                    setIsPublishing(false);
                    return;
                }

                // Get public URL
                const { data: { publicUrl } } = supabaseClient.storage
                    .from('post_images')
                    .getPublicUrl(filePath);

                finalCoverImage = publicUrl;
            }
            // 2. 파일도 없고 URL도 없으면 기존처럼 랜덤 이미지 생성
            else if (finalCoverImage.trim() === "") {
                const seedString = title.trim() ? encodeURIComponent(title.trim()) : "random-seed-" + Date.now();
                finalCoverImage = `https://picsum.photos/seed/${seedString}/800/400`;
            }

            const result = await createPost({
                title,
                content,
                isPublished,
                coverImageUrl: finalCoverImage,
                tags
            });

            if (result.error) {
                if (result.error.includes("is_published")) {
                    alert("데이터베이스 스키마가 업데이트되지 않았습니다. 마이그레이션을 실행해 주세요.\n(Error: is_published column not found)");
                } else {
                    alert("Failed to save post. Please try again.");
                }
                return;
            }

            alert(isPublished ? "Published successfully!" : "Draft saved successfully!");

            if (isPublished && result.post) {
                router.push(`/posts/${result.post.id}`);
            } else {
                router.push("/");
            }
        } catch (error: any) {
            console.error("Error saving post:", error);
            alert("Failed to save post. Please try again.");
        } finally {
            setIsSaving(false);
            setIsPublishing(false);
        }
    };

    return (
        <div className="flex h-screen flex-col bg-white overflow-hidden">
            <WritingHeader
                title={title}
                onTitleChange={setTitle}
                onSaveDraft={() => handleSave(false)}
                onPublish={() => handleSave(true)}
                isSaving={isSaving}
                isPublishing={isPublishing}
                coverImageUrl={coverImageUrl}
                onCoverImageUrlChange={setCoverImageUrl}
                coverImageFile={coverImageFile}
                onCoverImageFileChange={setCoverImageFile}
                tags={tags}
                onTagsChange={setTags}
            />
            <main className="flex-1 overflow-hidden flex flex-col">
                <MarkdownEditor content={content} onContentChange={setContent} />
            </main>
        </div>
    );
}
