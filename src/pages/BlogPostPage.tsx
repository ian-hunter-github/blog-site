import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogPostService from '../services/blogPostService';
import { BlogPost } from '../types/blog';

const renderMarkdown = (content: string) => (
  <ReactMarkdown
    children={content}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
  />
);

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const fetchedPost = await blogPostService.fetchById(id);
          if (fetchedPost) {
            fetchedPost.content = fetchedPost.content.replace(/\\n/g, '\n\n'); // Ensure spacing
            setPost(fetchedPost);
          } else {
            setError('Post not found.');
          }
        } else {
          setError('No post ID provided.');
        }
      } catch (err) {
        setError('Error fetching post. Please try again later.');
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      <div>{renderMarkdown(post.content)}</div>
    </div>
  );
};

export default BlogPostPage;
