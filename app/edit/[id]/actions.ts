"use server";

import { createClient } from "@/lib/supabase/server";

export async function updatePost({
    id,
    title,
    content,
    isPublished,
    coverImageUrl,
    tags,
}: {
    id: string;
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

    const description = content.slice(0, 160).replace(/[#*`]/g, "") + "...";

    const { data, error } = await supabase
        .from("posts")
        .update({
            title,
            content,
            description,
            cover_image_url: coverImageUrl,
            is_published: isPublished,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error || !data) {
        return { error: error?.message || "게시글 수정에 실패했습니다." };
    }

    // Delete existing tags to replace them
    await supabase.from("post_tags").delete().eq("post_id", id);

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
