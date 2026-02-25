"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface WritingHeaderProps {
    title: string;
    onTitleChange: (title: string) => void;
    onSaveDraft: () => void;
    onPublish: () => void;
    isSaving: boolean;
    isPublishing: boolean;
    coverImageUrl: string;
    onCoverImageUrlChange: (url: string) => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

export default function WritingHeader({
    title,
    onTitleChange,
    onSaveDraft,
    onPublish,
    isSaving,
    isPublishing,
    coverImageUrl,
    onCoverImageUrlChange,
    tags,
    onTagsChange,
}: WritingHeaderProps) {
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (newTag && !tags.includes(newTag)) {
                onTagsChange([...tags, newTag]);
            }
            e.currentTarget.value = "";
        }
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 flex-1">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline font-bold text-blue-600 text-lg">DevBlog</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />
                    <div className="flex flex-col flex-1 h-full justify-center">
                        <label htmlFor="post-title" className="text-[10px] font-bold text-blue-500 uppercase tracking-tight mb-0.5">
                            제목
                        </label>
                        <input
                            id="post-title"
                            type="text"
                            placeholder="게시글 제목을 입력하세요..."
                            className="bg-transparent text-lg font-bold text-gray-900 placeholder-gray-300 focus:outline-none w-full"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />
                    <div className="flex flex-col flex-1 h-full justify-center hidden md:flex">
                        <label htmlFor="post-cover" className="text-[10px] font-bold text-blue-500 uppercase tracking-tight mb-0.5">
                            커버 이미지 URL
                        </label>
                        <input
                            id="post-cover"
                            type="url"
                            placeholder="이미지 주소를 붙여넣으세요 (선택)"
                            className="bg-transparent text-sm font-medium text-gray-900 placeholder-gray-300 focus:outline-none w-full"
                            value={coverImageUrl}
                            onChange={(e) => onCoverImageUrlChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 flex-1 justify-center hidden lg:flex border-l border-r border-gray-200 px-4">
                    <div className="flex flex-col flex-1 h-full justify-center w-full max-w-[200px]">
                        <label htmlFor="post-tags" className="text-[10px] font-bold text-blue-500 uppercase tracking-tight mb-0.5">
                            태그 (엔터로 추가)
                        </label>
                        <div className="flex flex-wrap gap-1 mb-1">
                            {tags.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-blue-900 text-[10px] font-bold">×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            id="post-tags"
                            type="text"
                            placeholder={tags.length === 0 ? "태그 입력 후 엔터..." : "추가 태그..."}
                            className="bg-transparent text-sm font-medium text-gray-900 placeholder-gray-300 focus:outline-none w-full"
                            onKeyDown={handleTagKeyDown}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onSaveDraft}
                        disabled={isSaving || isPublishing}
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-2 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? "저장 중..." : "임시저장"}
                    </button>
                    <button
                        onClick={onPublish}
                        disabled={isSaving || isPublishing}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:bg-blue-600 focus:outline-none transition-all disabled:opacity-50"
                    >
                        {isPublishing ? "발행 중..." : "발행"}
                    </button>
                </div>
            </div>
        </header>
    );
}
