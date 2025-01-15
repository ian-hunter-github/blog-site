import { Link } from "react-router-dom";
import { Card, Box } from "@mui/material";
import { BlogPost } from "../../types/blog";
import BlogCardStyles from "./BlogCardStyles.ts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/post/${post.id}`}
      aria-label={`Read more about ${post.title}`}
      style={{ textDecoration: "none" }}
    >
      <Card sx={BlogCardStyles.card}>
        {/* Date */}
        <Box sx={BlogCardStyles.date}>
          {new Date(post.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) || "Unknown Date"}
        </Box>

        {/* Title */}
        <Box sx={BlogCardStyles.title}>
          {post.title || "Untitled Post"}
        </Box>

        {/* Author */}
        <Box sx={BlogCardStyles.author}>
          {post.author || ""}
        </Box>

        {/* Summary */}
        <Box sx={BlogCardStyles.summary}>
          {post.summary
            ? post.summary.length > 100
              ? `${post.summary.slice(0, 100)}...`
              : post.summary
            : "No summary available."}
        </Box>
      </Card>
    </Link>
  );
}
