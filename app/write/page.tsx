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
            // 항상 타이틀 기반 랜덤 시드로 이미지 생성
            const seedString = title.trim() ? encodeURIComponent(title.trim()) : "random-seed-" + Date.now();
            const finalCoverImage = `https://picsum.photos/seed/${seedString}/800/400`;

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
                tags={tags}
                onTagsChange={setTags}
            />
            <main className="flex-1 overflow-hidden flex flex-col">
                <MarkdownEditor content={content} onContentChange={setContent} />
            </main>
        </div>
    );
}
