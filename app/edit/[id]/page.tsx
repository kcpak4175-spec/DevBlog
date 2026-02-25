import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditPageClient from "./components/EditPageClient";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch existing post with its tags
    const { data: postData } = await supabase
        .from("posts")
        .select("*, post_tags(tags(name))")
        .eq("id", id)
        .single();

    if (!postData) {
        redirect("/");
    }

    // Flatten tags array
    const post = {
        ...postData,
        tags: postData.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || []
    };

    // Checking permission
    const isAdmin = user.email === 'kcpak4175@gmail.com';
    const isAuthor = user.id === post.author_id;

    if (!isAdmin && !isAuthor) {
        redirect(`/posts/${id}`);
    }

    return <EditPageClient post={post} />;
}
