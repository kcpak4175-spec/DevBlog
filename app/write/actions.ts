"use server";

import { createClient } from "@/lib/supabase/server";

export async function getTags() {
    const supabase = await createClient();
    const { data: tags, error } = await supabase
        .from("tags")
        .select("id, name")
        .order("name");

    if (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
    return tags || [];
}

export async function createPost({
    title,
    content,
    isPublished,
    coverImageUrl,
    tags,
}: {
    title: string;
    content: string;
    isPublished: boolean;
    coverImageUrl?: string;
    tags?: string[];
}) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: "로그인이 필요합니다." };
    }

    const emailStr = user.email || "";
    const authorName = emailStr.includes("@") ? emailStr.split("@")[0] : "Anonymous";

    const description = content.slice(0, 160).replace(/[#*`]/g, "") + "...";

    const { data, error } = await supabase
        .from("posts")
        .insert({
            title,
            content,
            description,
            cover_image_url: coverImageUrl,
            author_id: user.id,
            author_name: authorName,
            is_published: isPublished,
            published_at: isPublished ? new Date().toISOString() : null,
        })
        .select()
        .single();

    if (error || !data) {
        return { error: error?.message || "게시글 작성에 실패했습니다." };
    }

    if (tags && tags.length > 0) {
        for (const tagName of tags) {
            // Check if tag already exists
            const { data: existingTag } = await supabase
                .from("tags")
                .select("id")
                .eq("name", tagName)
                .single();

            let tagId = existingTag?.id;

            // If tag doesn't exist, insert it
            if (!tagId) {
                const { data: newTag, error: insertError } = await supabase
                    .from("tags")
                    .insert({ name: tagName })
                    .select("id")
                    .single();

                if (insertError) {
                    console.error(`Error inserting tag "${tagName}":`, insertError);
                }

                if (newTag) {
                    tagId = newTag.id;
                }
            }

            // Link tag to post
            if (tagId) {
                const { error: linkError } = await supabase
                    .from("post_tags")
                    .insert({ post_id: data.id, tag_id: tagId });

                if (linkError) {
                    console.error(`Error linking tag ${tagId} to post ${data.id}:`, linkError);
                }
            }
        }
    }

    return { success: true, post: data };
}
