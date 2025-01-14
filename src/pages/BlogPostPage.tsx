import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const renderHTML = (text: string) => {
  const processedText = text.replace(/\\n/g, "\n"); // Ensure escaped newlines are converted
  return (
    <ReactMarkdown
      children={processedText}
      remarkPlugins={[remarkGfm]} // GitHub Flavored Markdown (tables, etc.)
      rehypePlugins={[rehypeRaw]} // Allow raw HTML rendering
    />
  );
};

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve post ID from route
  const { posts } = usePosts(); // Access posts from context

  // Ensure posts are valid and find the specific post by ID
  const post = Array.isArray(posts) ? posts.find((post) => post.id == id) : null;

  if (!post) {
    return (
      <Layout>
        <h1>Post Not Found</h1>
        <p>The post you are looking for does not exist or has been removed.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      <div>{renderHTML(post.content)}</div>
    </Layout>
  );
};

export default BlogPostPage;
