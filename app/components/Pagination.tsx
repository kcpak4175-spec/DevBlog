import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string; // e.g., "/" or "/?category=React"
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    // A simple implementation matching the mock's visual style.
    // In a real app with many pages, you'd add complex logic for ellipsis "...".

    // Format base URL to handle existing query parameters
    const getPageUrl = (page: number) => {
        const divider = baseUrl.includes("?") ? "&" : "?";
        return page === 1 ? baseUrl : `${baseUrl}${divider}page=${page}`;
    };

    return (
        <nav className="mt-16 flex justify-center border-t border-gray-200 pt-16">
            <ul className="flex items-center gap-1">
                <li>
                    <Link
                        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${currentPage <= 1 ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            }`}
                        aria-disabled={currentPage <= 1}
                    >
                        <span className="sr-only">이전 페이지</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </li>

                {/* Simplified page numbers rendering matching the design 1, 2, 3 ... 12 */}
                <li>
                    <Link
                        href={getPageUrl(1)}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${currentPage === 1 ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        aria-current={currentPage === 1 ? "page" : undefined}
                    >
                        1
                    </Link>
                </li>

                {totalPages > 1 && (
                    <li>
                        <Link
                            href={getPageUrl(2)}
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${currentPage === 2 ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
                                }`}
                            aria-current={currentPage === 2 ? "page" : undefined}
                        >
                            2
                        </Link>
                    </li>
                )}

                {totalPages > 2 && (
                    <li>
                        <Link
                            href={getPageUrl(3)}
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${currentPage === 3 ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
                                }`}
                            aria-current={currentPage === 3 ? "page" : undefined}
                        >
                            3
                        </Link>
                    </li>
                )}

                {totalPages > 4 && (
                    <li className="inline-flex h-10 w-10 items-center justify-center text-gray-500">
                        ...
                    </li>
                )}

                {totalPages > 3 && (
                    <li>
                        <Link
                            href={getPageUrl(totalPages)}
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
                                }`}
                            aria-current={currentPage === totalPages ? "page" : undefined}
                        >
                            {totalPages}
                        </Link>
                    </li>
                )}

                <li>
                    <Link
                        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${currentPage >= totalPages ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            }`}
                        aria-disabled={currentPage >= totalPages}
                    >
                        <span className="sr-only">다음 페이지</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
