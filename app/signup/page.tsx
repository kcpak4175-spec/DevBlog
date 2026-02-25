import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
    title: "회원가입 | DevLog",
    description: "DevLog에 가입하여 개발 블로그를 시작하세요.",
};

export default function SignupPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* 헤더 */}
            <header className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <svg
                                viewBox="0 0 32 32"
                                fill="none"
                                className="h-7 w-7"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="4"
                                    y="6"
                                    width="18"
                                    height="22"
                                    rx="2"
                                    fill="#38bdf8"
                                />
                                <rect
                                    x="10"
                                    y="4"
                                    width="18"
                                    height="22"
                                    rx="2"
                                    fill="#0ea5e9"
                                />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-gray-900">DevLog</span>
                    </Link>
                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            블로그
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            튜토리얼
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            소개
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600"
                        >
                            로그인
                        </Link>
                    </nav>
                </div>
            </header>

            {/* 메인 */}
            <main className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
                        {/* 로고 */}
                        <div className="mb-6 flex justify-center">
                            <svg
                                viewBox="0 0 32 32"
                                fill="none"
                                className="h-10 w-10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="4"
                                    y="6"
                                    width="18"
                                    height="22"
                                    rx="2"
                                    fill="#38bdf8"
                                />
                                <rect
                                    x="10"
                                    y="4"
                                    width="18"
                                    height="22"
                                    rx="2"
                                    fill="#0ea5e9"
                                />
                            </svg>
                        </div>

                        {/* 제목 */}
                        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
                            새 계정 만들기
                        </h1>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            이메일로 간편하게 가입하세요.
                        </p>

                        {/* 회원가입 폼 */}
                        <SignupForm />

                        {/* 로그인 링크 */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            이미 계정이 있으신가요?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-sky-500 hover:text-sky-600 transition-colors"
                            >
                                로그인
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
