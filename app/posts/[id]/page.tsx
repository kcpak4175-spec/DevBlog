import { createClient } from "@/lib/supabase/server";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PostDetailHeader from "@/app/posts/[id]/components/PostDetailHeader";
import PostThumbnail from "@/app/posts/[id]/components/PostThumbnail";
import PostContent from "@/app/posts/[id]/components/PostContent";
import ShareButtons from "@/app/posts/[id]/components/ShareButtons";
import PostComments from "@/app/posts/[id]/components/PostComments";
import { getComments } from "./actions";

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: postData } = await supabase
        .from("posts")
        .select("*, post_tags(tags(name))")
        .eq("id", id)
        .single();

    let post = null;
    if (postData) {
        post = {
            ...postData,
            tags: postData.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || []
        } as any;
    }

    const comments = await getComments(id);

    if (!post) {
        return (
            <div className="flex min-h-screen flex-col bg-slate-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">게시물을 찾을 수 없습니다.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
            <Header />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
                <PostDetailHeader
                    post={post}
                    currentUserId={user?.id}
                    currentUserEmail={user?.email}
                />
                <PostThumbnail coverImageUrl={post.cover_image_url} title={post.title} />
                <PostContent content={post.content} />
                <ShareButtons postId={post.id} title={post.title} />
                <PostComments
                    postId={post.id}
                    initialComments={comments}
                    currentUserId={user?.id}
                    currentUserEmail={user?.email}
                />
            </main>
            <Footer />
        </div>
    );
}
