import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { BlogPost } from "../types/blog";

interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  created_at: string;
  author: string;
  image: string;
}

interface PostsContextType {
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

// Create the PostsContext with a default value of undefined
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Custom hook to use the PostsContext
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};

interface PostsProviderProps {
  children: ReactNode;
}

// PostsProvider component
export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (posts === null) {
      fetchPosts();
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fetchAll`);
      const data = await response.json();
      const processedPosts = data.posts.map((post: BlogPost) => ({
        ...post,
        content: post.content.replace(/\n/g, "\n\n"),
      }));
      setPosts(processedPosts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };
  
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
