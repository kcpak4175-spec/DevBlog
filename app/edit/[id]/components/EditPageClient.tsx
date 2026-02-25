"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePost } from "../actions";
import WritingHeader from "@/app/components/WritingHeader";
import MarkdownEditor from "@/app/components/MarkdownEditor";

export default function EditPageClient({ post }: { post: any }) {
    const router = useRouter();
    const [title, setTitle] = useState(post.title || "");
    const [content, setContent] = useState(post.content || "");
    const [tags, setTags] = useState<string[]>(post.tags || []);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleSave = async (isPublished: boolean) => {
        if (!title.trim()) {
            alert("제목을 입력해 주세요.");
            return;
        }

        if (isPublished) {
            setIsPublishing(true);
        } else {
            setIsSaving(true);
        }

        try {
            // 항상 타이틀 기반 랜덤 시드로 이미지 생성
            const seedString = title.trim() ? encodeURIComponent(title.trim()) : "random-seed-" + Date.now();
            const finalCoverImage = `https://picsum.photos/seed/${seedString}/800/400`;

            const result = await updatePost({
                id: post.id,
                title,
                content,
                isPublished,
                coverImageUrl: finalCoverImage,
                tags
            });

            if (result.error) {
                alert("게시글 수정에 실패했습니다: " + result.error);
                return;
            }

            alert(isPublished ? "글이 성공적으로 수정(발행)되었습니다!" : "임시저장 되었습니다!");

            if (isPublished && result.post) {
                router.push(`/posts/${result.post.id}`);
            } else {
                router.push("/");
            }
        } catch (error: any) {
            console.error("Error updating post:", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
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
                tags={tags}
                onTagsChange={setTags}
            />
            <main className="flex-1 overflow-hidden flex flex-col">
                <MarkdownEditor content={content} onContentChange={setContent} />
            </main>
        </div>
    );
}
