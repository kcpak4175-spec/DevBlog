"use client";

import Image from "next/image";
import { useState } from "react";

export default function PostThumbnail({
    coverImageUrl,
    title
}: {
    coverImageUrl: string | null;
    title: string
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl ring-1 ring-gray-900/10">
            {coverImageUrl && !imageError ? (
                <Image
                    src={coverImageUrl}
                    alt={`Cover image for ${title}`}
                    fill
                    className="object-cover"
                    priority
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-12">
                    <div className="text-white text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl border-4 border-white/30 border-dashed animate-pulse flex items-center justify-center font-bold text-3xl">
                            dev
                        </div>
                        <p className="text-white/80 font-medium">No cover image provided</p>
                    </div>
                </div>
            )}
        </div>
    );
}
