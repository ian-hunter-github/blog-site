import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { BlogPost } from "../types/blog";

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
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={post.image || "/placeholder.png"}
          alt={post.title || "No image available"}
          sx={{ height: 200 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title || "Untitled Post"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Gracefully handle null or undefined summary */}
            {post.summary
              ? post.summary.length > 100
                ? `${post.summary.slice(0, 100)}...`
                : post.summary
              : "No summary available."}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
