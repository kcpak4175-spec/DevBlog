"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
    const supabase = await createClient();

    // The RLS policy will automatically reject the delete if the user is not the author or an admin
    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/");
    return { success: true };
}

export async function getComments(postId: string) {
    const supabase = await createClient();
    const { data: comments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
    return comments || [];
}

export async function createComment(postId: string, content: string) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: "로그인이 필요합니다." };
    }

    if (!content.trim()) {
        return { error: "댓글 내용을 입력해 주세요." };
    }

    const emailStr = user.email || "";
    const authorName = emailStr.includes("@") ? emailStr.split("@")[0] : "Anonymous";

    const { data, error } = await supabase
        .from("comments")
        .insert({
            post_id: postId,
            author_id: user.id,
            author_name: authorName,
            content: content.trim()
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating comment:", error);
        return { error: "댓글 작성 중 오류가 발생했습니다." };
    }

    revalidatePath(`/posts/${postId}`);
    return { success: true, comment: data };
}

export async function deleteComment(commentId: string, postId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

    if (error) {
        console.error("Error deleting comment:", error);
        return { error: "댓글 삭제 중 오류가 발생했습니다." };
    }

    revalidatePath(`/posts/${postId}`);
    return { success: true };
}
