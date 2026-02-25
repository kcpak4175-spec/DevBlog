import Link from "next/link";

interface CategoryFilterProps {
    categories: { id: string; name: string }[];
    currentCategory?: string;
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">게시글 태그</h2>

            {/* Design mock has View all text, we can link to something or just render it */}
            <Link href="/" className="text-base font-semibold text-blue-600 hover:text-blue-500 sm:order-last whitespace-nowrap">
                전체보기
            </Link>

            <div className="flex flex-nowrap gap-2 sm:mr-auto sm:ml-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">


                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/?category=${category.name}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${currentCategory === category.name
                            ? "bg-gray-900 text-white"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
