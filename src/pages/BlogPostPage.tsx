import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import blogPostService from "../services/blogPostService";
import { BlogPost } from "../types/blog";
import ErrorBoundary from "../components/ErrorBoundary";
import { Box, CircularProgress } from "@mui/material";

const renderMarkdown = (text: string) => {
  const processedText = text.replace(/\\n/g, "\n");
  return (
    <ReactMarkdown
      children={processedText}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};

const BlogPostContent: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{renderMarkdown(post.content)}</div>
    </div>
  );
};

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log(`Fetching post with id: ${id}`);
        const fetchedPost = await blogPostService.fetchPostByIdWithCache(id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          console.warn(`Post with id ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <div>
        <h1>Post Not Found</h1>
        <p>The post you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BlogPostContent post={post} />
    </ErrorBoundary>
  );
};

export default BlogPostPage;
