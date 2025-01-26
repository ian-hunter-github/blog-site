import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { BlogPost } from "../types/blog";
import blogPostService from "../services/blogPostService";
import ErrorBoundary from "../components/ErrorBoundary";

interface PostsContextType {
  posts: BlogPost[] | null;
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[] | null>>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postsPerPage: number;
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogPostService.fetchAll();
        setPosts(allPosts);
        setTotalPages(Math.ceil(allPosts.length / postsPerPage));
      } catch (error) {
        console.error("Error fetching posts in PostsProvider:", error);
      }
    };

    if (!posts || posts.length === 0) {
      fetchPosts();
    }
  }, [posts]);

  const getPaginatedPosts = () => {
    if (!posts) return null;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  return (
    <ErrorBoundary>
      <PostsContext.Provider
        value={{
          posts: getPaginatedPosts(),
          setPosts,
          currentPage,
          totalPages,
          setCurrentPage,
          postsPerPage,
        }}
      >
        {children}
      </PostsContext.Provider>
    </ErrorBoundary>
  );
};

export default PostsProvider;
