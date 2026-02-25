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
            // 외부 이미지가 지정되지 않았을 경우, 기본 이미지로 생성
            // (랜덤 디자인 텍스처 등 다양성을 위해 사용할 수 있는 무료 이미지 Placeholder 서비스나 seed 사용)
            const finalCoverImage = coverImageUrl.trim() !== ""
                ? coverImageUrl
                : `https://picsum.photos/seed/${encodeURIComponent(title)}/800/400`;

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
                tags={tags}
                onTagsChange={setTags}
            />
            <main className="flex-1 overflow-hidden flex flex-col">
                <MarkdownEditor content={content} onContentChange={setContent} />
            </main>
        </div>
    );
}
