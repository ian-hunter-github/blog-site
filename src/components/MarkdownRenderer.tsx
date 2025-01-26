import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import remarkGfm from "remark-gfm";
import { Typography } from "@mui/material";

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <Typography
      component="div"
      sx={{
        "& h1, & h2, & h3": {
          marginTop: "1.5rem",
          marginBottom: "1rem",
          fontWeight: 600,
        },
        "& p": {
          marginBottom: "1rem",
          lineHeight: 1.6,
        },
        "& pre": {
          borderRadius: "4px",
          margin: "1rem 0",
        },
        '& code:not([class*="language-"])': {
          backgroundColor: "#f5f5f5",
          padding: "0.2em 0.4em",
          borderRadius: "3px",
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          margin: "1rem 0",
        },
        "& th, & td": {
          border: "1px solid #ddd",
          padding: "8px",
        },
        "& th": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                customStyle={{ margin: 0 }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          table({ children }) {
            return (
              <div style={{ overflowX: "auto" }}>
                <table>{children}</table>
              </div>
            );
          },
        }}
      >
        {sanitizedMarkdown}
      </ReactMarkdown>
    </Typography>
  );
}
