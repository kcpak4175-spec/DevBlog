"use client";

import ReactMarkdown from "react-markdown";

export default function PostContent({ content }: { content: string }) {
    return (
        <article className="prose prose-lg prose-slate max-w-none mb-16 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
}
