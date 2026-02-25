import Footer from "./components/Footer";
import Header from "./components/Header";
import FeaturedPost from "./components/FeaturedPost";
import CategoryFilter from "./components/CategoryFilter";
import PostCard from "./components/PostCard";
import Pagination from "./components/Pagination";
import { createClient } from "@/lib/supabase/server";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category;
  const searchQuery = params.search;
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 6;
  const supabase = await createClient();

  // Fetch categories
  const { data: categoriesData } = await supabase
    .from("tags")
    .select("id, name, post_tags!inner(post_id)")
    .order("name");
  const categories = categoriesData || [];

  // Fetch featured post
  const { data: featuredPostsData } = await supabase
    .from("posts")
    .select("*, post_tags(tags(name))")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(1);

  let featuredPost = featuredPostsData?.[0] as any;
  if (featuredPost) {
    featuredPost = {
      ...featuredPost,
      tags: featuredPost.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || []
    };
  }

  // Fetch paginated regular posts
  let selectQuery = currentCategory
    ? "*, post_tags!inner(tag_id, tags(name))"
    : "*, post_tags(tags(name))";

  let query = supabase
    .from("posts")
    .select(selectQuery, { count: "exact" })
    .eq("is_featured", false);

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  query = query.order("created_at", { ascending: false });

  if (currentCategory) {
    const category = categories.find(c => c.name === currentCategory);
    if (category) {
      query = query.eq("post_tags.tag_id", category.id);
    }
  }

  const { data: postsData, count } = await query
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  const posts = (postsData || []).map(p => {
    const postData = p as any;
    return {
      ...postData,
      tags: postData.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || []
    };
  });
  const postsCount = count || 0;

  const totalPages = postsCount ? Math.ceil(postsCount / itemsPerPage) : 0;
  const baseUrl = currentCategory ? `/?category=${encodeURIComponent(currentCategory)}` : "/";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentPage === 1 && !currentCategory && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}

        <CategoryFilter
          categories={categories}
          currentCategory={currentCategory || undefined}
        />

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={baseUrl}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">등록된 게시글이 없습니다</h3>
            <p className="mt-1 text-sm text-gray-500">
              조건에 맞는 게시글이 없습니다.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
