"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "../actions";

interface Post {
    id: string;
    title: string;
    author_id?: string;
    author_name: string;
    author_avatar_url: string;
    created_at: string;
    tags?: string[];
    description?: string;
}

export default function PostDetailHeader({
    post,
    currentUserId,
    currentUserEmail
}: {
    post: Post;
    currentUserId?: string;
    currentUserEmail?: string;
}) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const isAdmin = currentUserEmail === 'kcpak4175@gmail.com';
    const isAuthor = currentUserId === post.author_id;
    const canEditOrDelete = currentUserId && (isAdmin || isAuthor);

    const handleDelete = async () => {
        if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

        setIsDeleting(true);
        const result = await deletePost(post.id);

        if (result.error) {
            alert("게시글 삭제에 실패했습니다.");
            setIsDeleting(false);
        } else {
            alert("게시글이 삭제되었습니다.");
            router.push("/");
        }
    };
    const date = new Date(post.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    메인으로 돌아가기
                </Link>

                {canEditOrDelete && (
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/edit/${post.id}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                            수정
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            {isDeleting ? "삭제 중..." : "삭제"}
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-x-3 mb-6">
                {post.tags && post.tags.length > 0 && post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {tag}
                    </span>
                ))}
                <time dateTime={post.created_at} className="text-sm text-gray-500">
                    {date}
                </time>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4 leading-tight">
                {post.title}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {post.description || `${post.title}에 대한 핵심 내용과 인사이트를 확인해 보세요.`}
            </p>

            <div className="flex items-center gap-x-4 border-b border-gray-200 pb-10">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100 flex-none">
                    {post.author_avatar_url ? (
                        <Image
                            src={post.author_avatar_url}
                            alt={post.author_name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </div>
                <div className="text-sm">
                    <p className="font-bold text-gray-900 text-lg">{post.author_name}</p>
                    <p className="text-gray-500">작성자</p>
                </div>
            </div>
        </div>
    );
}
