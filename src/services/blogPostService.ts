import { getEnvVar } from '../utils/envWrapper';
import { BlogPost } from '../types/blog';

const BASE_URL = getEnvVar('VITE_BACKEND_URL');

// Cache object for blog posts
const blogPostCache: Record<string, { post: BlogPost; fetchedAt: number }> = {};

const blogPostService = {
  /**
   * Fetch all blog posts from the server and update the cache.
   * @returns Promise resolving to an array of blog posts.
   */
  async fetchAll(): Promise<BlogPost[]> {
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
      const posts: BlogPost[] = data.posts || [];

      // Update cache with fetched posts
      const now = Date.now();
      posts.forEach((post) => {
        blogPostCache[post.id] = { post, fetchedAt: now };
      });

      console.log(`Fetched ${posts.length} posts and updated cache.`);
      return posts;
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
  async fetchById(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${BASE_URL}/findById?id=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching post by ID: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Fetched post with ID ${id} from server.`);
      return data.post || null;
    } catch (error) {
      console.error(`Error fetching post by ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a blog post by its ID, using cache if possible and validating with a HEAD request.
   * @param id The ID of the blog post to fetch.
   * @returns Promise resolving to a blog post.
   */
  async fetchPostByIdWithCache(id: string): Promise<BlogPost | null> {
    const cached = blogPostCache[id];

    if (cached) {
      try {
        // Use HEAD to check if the post is up-to-date
        const headResponse = await fetch(`${BASE_URL}/findById?id=${encodeURIComponent(id)}`, {
          method: 'HEAD',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const serverTimestampStr = headResponse.headers.get('Last-Modified');
        console.log("TS FROM SERVER='" + serverTimestampStr + "'");
        const serverTimestamp = serverTimestampStr ? new Date(serverTimestampStr).getTime() : NaN;

        console.log(
          `HEAD request for ID ${id}: Server timestamp = ${serverTimestamp}, Cached timestamp = ${cached.fetchedAt}`
        );

        if (!isNaN(serverTimestamp) && cached.fetchedAt >= serverTimestamp) {
          console.log(`Returning cached post for ID ${id}.`);
          return cached.post; // Return cached post if up-to-date
        }
      } catch (error) {
        console.error(`Error validating cache with HEAD request for ID ${id}:`, error);
      }
    }

    // Fetch post from the server if cache is missing or stale
    console.log(`Fetching post with ID ${id} from server.`);
    const post = await this.fetchById(id);

    if (post) {
      blogPostCache[id] = { post, fetchedAt: Date.now() }; // Update cache
      console.log(`Updated cache for post with ID ${id}.`);
    }

    return post;
  },
};

export default blogPostService;
