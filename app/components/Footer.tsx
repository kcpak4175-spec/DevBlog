import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-gray-200 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-white font-bold text-xs">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-gray-900">DevBlog</span>
                    </div>

                    <nav className="flex items-center gap-6">
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">소개</Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">개인정보처리방침</Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">이용약관</Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">문의하기</Link>
                    </nav>
                </div>

                <div className="mt-8 flex items-center justify-center sm:mt-12">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} DevBlog 플랫폼(주) 모든 권리 보유.
                    </p>
                </div>
            </div>
        </footer>
    );
}
