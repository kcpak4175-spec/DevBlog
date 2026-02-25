"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { createComment, deleteComment } from "../actions";
import { Trash2 } from "lucide-react";

interface Comment {
    id: string;
    post_id: string;
    author_id: string;
    author_name: string;
    author_avatar_url: string | null;
    content: string;
    created_at: string;
}

interface PostCommentsProps {
    postId: string;
    initialComments: Comment[];
    currentUserId?: string;
    currentUserEmail?: string;
}

export default function PostComments({
    postId,
    initialComments,
    currentUserId,
    currentUserEmail,
}: PostCommentsProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isAdmin = currentUserEmail === 'kcpak4175@gmail.com';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!newComment.trim()) return;

        setIsSubmitting(true);
        const result = await createComment(postId, newComment);

        if (result.error) {
            alert(result.error);
        } else if (result.comment) {
            setComments([...comments, result.comment]);
            setNewComment("");
        }

        setIsSubmitting(false);
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm("댓글을 삭제하시겠습니까?")) return;

        const result = await deleteComment(commentId, postId);

        if (result.error) {
            alert(result.error);
        } else {
            setComments(comments.filter(c => c.id !== commentId));
        }
    };

    return (
        <div className="mt-16 pt-10 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
                댓글 {comments.length}
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 flex gap-4">
                <div className="flex-none">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 ring-2 ring-white">
                        {currentUserId ? (
                            <svg className="h-full w-full text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <textarea
                        rows={3}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none p-3 text-sm text-black placeholder:text-gray-400 border bg-white"
                        placeholder={currentUserId ? "다양한 의견을 남겨주세요." : "로그인 후 댓글을 남길 수 있습니다."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={!currentUserId || isSubmitting}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={!currentUserId || !newComment.trim() || isSubmitting}
                            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 disabled:opacity-50 transition-colors"
                        >
                            {isSubmitting ? "등록 중..." : "댓글 달기"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.length > 0 ? (
                    comments.map((comment) => {
                        const isCommentAuthor = currentUserId === comment.author_id;
                        const canDelete = isAdmin || isCommentAuthor;

                        return (
                            <div key={comment.id} className="flex gap-4">
                                <div className="flex-none">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 ring-2 ring-white">
                                        {comment.author_avatar_url ? (
                                            <Image
                                                src={comment.author_avatar_url}
                                                alt={comment.author_name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {comment.author_name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
                                            </span>
                                        </div>
                                        {canDelete && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-sm text-gray-500">아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
