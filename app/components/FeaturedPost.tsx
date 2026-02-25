"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedPostProps {
    post: {
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
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    const [imageError, setImageError] = useState(false);

    const date = new Date(post.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 mb-16 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        {post.tags && post.tags.length > 0 ? (
                            post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                추천
                            </span>
                        )}
                        <span className="text-sm text-gray-500">{date}</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            {post.title}
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {post.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
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
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{post.author_name}</p>
                                <p className="text-xs text-gray-500">작성자</p>
                            </div>
                        </div>

                        <Link
                            href={`/posts/${post.id}`}
                            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500"
                        >
                            글 읽기 <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="flex-1 w-full lg:w-auto h-[320px] relative rounded-2xl overflow-hidden bg-[#1D1B22] border border-gray-800 shadow-2xl">
                    {post.cover_image_url && !imageError ? (
                        <Image
                            src={post.cover_image_url}
                            alt={`${post.title} 추천 이미지`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <>
                            {/* Fallback code placeholder if no image */}
                            <div className="absolute top-0 left-0 right-0 h-10 bg-[#2D2A33] border-b border-gray-800 flex items-center px-4 gap-2 z-10">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="p-6 pt-16 font-mono text-sm text-green-400 opacity-90 leading-relaxed overflow-hidden">
                                {`// 코드 예제 플레이스홀더\nfunction createSystem(config) {\n  return {\n    theme: applyTheme(config.theme),\n    components: buildComponents(config),\n    utils: compileUtils(config)\n  };\n}\n\nconst designSystem = createSystem({\n  theme: 'dark',\n  colors: {\n    primary: '#3B82F6',\n    secondary: '#10B981'\n  }\n});`}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
