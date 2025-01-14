import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <div>
      <ReactMarkdown>
        {sanitizedMarkdown}
      </ReactMarkdown>
    </div>
  );
}
