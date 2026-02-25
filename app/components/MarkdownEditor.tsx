"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Bold, Italic, Heading, Link as LinkIcon,
    Quote, List, ListOrdered, Code, Image as ImageIcon
} from "lucide-react";

interface MarkdownEditorProps {
    content: string;
    onContentChange: (content: string) => void;
}

export default function MarkdownEditor({
    content,
    onContentChange,
}: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (before: string, after: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
        onContentChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const tools = [
        { icon: <Bold size={16} />, action: () => insertText("**", "**"), title: "굵게" },
        { icon: <Italic size={16} />, action: () => insertText("*", "*"), title: "기울임꼴" },
        { icon: <Heading size={16} />, action: () => insertText("### ", ""), title: "제목" },
        { divider: true },
        { icon: <LinkIcon size={16} />, action: () => insertText("[", "](url)"), title: "링크" },
        { icon: <ImageIcon size={16} />, action: () => insertText("![대체 텍스트](", ")"), title: "이미지" },
        { icon: <Quote size={16} />, action: () => insertText("> ", ""), title: "인용구" },
        { divider: true },
        { icon: <List size={16} />, action: () => insertText("- ", ""), title: "글머리 기호" },
        { icon: <ListOrdered size={16} />, action: () => insertText("1. ", ""), title: "번호 매기기" },
        { icon: <Code size={16} />, action: () => insertText("```\n", "\n```"), title: "코드 블록" },
    ];

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Editor Side */}
            <div className="flex flex-1 flex-col border-r border-gray-200 bg-gray-50">
                <div className="border-b border-gray-200 px-4 py-2 bg-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        마크다운 에디터
                    </span>
                    <div className="flex items-center gap-1">
                        {tools.map((tool, index) =>
                            tool.divider ? (
                                <span key={index} className="w-[1px] h-4 bg-gray-300 mx-1" />
                            ) : (
                                <button
                                    key={index}
                                    onClick={tool.action}
                                    title={tool.title}
                                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                                >
                                    {tool.icon}
                                </button>
                            )
                        )}
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    className="flex-1 resize-none bg-transparent p-6 text-sm font-mono text-gray-700 focus:outline-none"
                    placeholder="여기에 마크다운을 입력하세요..."
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                />
            </div>

            {/* Preview Side */}
            <div className="flex flex-1 flex-col bg-white overflow-y-auto w-1/2">
                <div className="border-b border-gray-200 px-4 py-2 bg-white">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        미리보기
                    </span>
                </div>
                <div className="prose prose-slate max-w-none p-8 lg:p-12 overflow-y-auto">
                    {content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    ) : (
                        <p className="text-gray-400 italic">미리보기가 이곳에 표시됩니다...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
