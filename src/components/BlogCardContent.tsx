import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";

interface BlogCardContentProps {
  summary: string;
}

export default function BlogCardContent({ summary }: BlogCardContentProps) {
  return (
    <Box
      sx={{
        "& h1": {
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "10px",
        },
        "& p": { marginBottom: "10px" },
        "& table": { borderCollapse: "collapse", width: "100%" },
        "& th, & td": {
          border: "1px solid #ccc",
          padding: "8px",
          textAlign: "left",
        },
        "& th": { backgroundColor: "#f4f4f4", fontWeight: "bold" },
      }}
    >
      <ReactMarkdown>{summary}</ReactMarkdown>
    </Box>
  );
}
