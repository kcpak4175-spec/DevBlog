"use client";

import { Share2, Link as LinkIcon, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({
    postId,
    title
}: {
    postId: string;
    title: string
}) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    };

    const shareViaEmail = () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=Check this out: ${shareUrl}`;
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: shareUrl,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="border-t border-gray-200 pt-10 mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4">
                <div className="flex items-center gap-x-2 text-gray-900 font-semibold">
                    <Share2 className="w-5 h-5" />
                    <span>이 페이지 공유하기</span>
                </div>

                <div className="flex items-center gap-x-3">
                    <button
                        onClick={shareOnTwitter}
                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        aria-label="Twitter에 공유"
                    >
                        <Twitter className="w-5 h-5" />
                    </button>

                    <button
                        onClick={shareViaEmail}
                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        aria-label="이메일로 공유"
                    >
                        <Mail className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleNativeShare}
                        className={`flex items-center gap-x-2 px-5 py-2.5 rounded-full font-medium transition-all ${copied
                                ? "bg-green-600 text-white"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                    >
                        {copied ? (
                            <span>링크 복사됨!</span>
                        ) : (
                            <>
                                <LinkIcon className="w-4 h-4" />
                                <span>링크 복사</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
