"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    description: string;
    content: string;
    author_name: string;
    author_avatar_url: string;
    cover_image_url: string | null;
    created_at: string;
    tags?: string[];
}

interface PostCardProps {
    post: Post;
    index: number;
}

const placeholderColors = [
    "bg-teal-800",
    "bg-gray-800",
    "bg-[#F4F1ED]",
    "bg-[#111111]",
    "bg-[#F3F4F6]",
    "bg-[#B5C2BE]"
];

export default function PostCard({ post, index }: PostCardProps) {
    const [imageError, setImageError] = useState(false);

    const date = new Date(post.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const bgColor = placeholderColors[index % placeholderColors.length];

    return (
        <article className="flex flex-col items-start justify-between rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-full aspect-[16/9] ${bgColor} relative flex items-center justify-center overflow-hidden`}>
                {post.cover_image_url && !imageError ? (
                    <Image
                        src={post.cover_image_url}
                        alt={`${post.title} 커버 이미지`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <>
                        {/* Fallback pattern if no image is available or error occurred */}
                        {index % 3 === 0 && (
                            <div className="w-32 h-32 rounded-full border-[16px] border-white/20 border-dashed animate-pulse text-white/10 flex items-center justify-center font-bold tracking-tighter text-4xl select-none">
                                dev
                            </div>
                        )}
                        {index % 3 === 1 && (
                            <div className="w-48 h-32 bg-gray-900/50 rounded flex flex-col p-4 text-xs font-mono text-white/50 shadow-inner">
                                <div className="h-2 w-full bg-white/20 rounded mb-2 animate-pulse"></div>
                                <div className="h-2 w-3/4 bg-white/20 rounded mb-2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-2 w-5/6 bg-white/20 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                <div className="mt-auto opacity-30 text-[10px]"># BLOG_TRACE</div>
                            </div>
                        )}
                        {index % 3 === 2 && (
                            <div className="relative group">
                                <svg className="w-32 h-32 text-orange-400 opacity-60 group-hover:opacity-80 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                                <div className="absolute inset-0 blur-2xl bg-orange-500/10 rounded-full -z-10"></div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="p-6 flex flex-col flex-1 w-full">
                <div className="flex items-center gap-x-4 text-xs mb-4">
                    <time dateTime={post.created_at} className="text-gray-500">
                        {date}
                    </time>
                    {post.tags && post.tags.length > 0 && post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-gray-100">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 line-clamp-2">
                        <Link href={`/posts/${post.id}`}>
                            <span className="absolute inset-0" />
                            {post.title}
                        </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                        {post.description}
                    </p>
                </div>

                <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
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
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {post.author_name}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}
