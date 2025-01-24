import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { BlogPost } from "../types/blog";
import blogPostService from "../services/blogPostService";

interface PostsContextType {
  posts: BlogPost[] | null;
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[] | null>>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

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

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogPostService.fetchAll(); // Use the service
        setPosts(allPosts); // Update the context with fetched posts
      } catch (error) {
        console.error("Error fetching posts in PostsProvider:", error);
      }
    };

    if (!posts || posts.length === 0) {
      fetchPosts(); // Only fetch if posts are not already set
    }
  }, [posts]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;