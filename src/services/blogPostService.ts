import { getEnvVar } from '../utils/envWrapper';
import { BlogPost } from '../types/blog';

const BASE_URL = getEnvVar('VITE_BACKEND_URL');

const blogPostService = {
  /**
   * Fetch all blog posts from the server.
   * @returns Promise resolving to an array of blog posts.
   */
  fetchAll: async (): Promise<BlogPost[]> => {
    try {
      const response = await fetch(`${BASE_URL}/fetchAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }

      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  },

  /**
   * Fetch a blog post by its ID from the server.
   * @param id The ID of the blog post to fetch.
   * @returns Promise resolving to a blog post.
   */
  fetchById: async (id: string): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`${BASE_URL}/findById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching post by ID: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.post) {
        return data.post;
      } else {
        console.warn('No post found for the provided ID.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error;
    }
  },
};

export default blogPostService;
