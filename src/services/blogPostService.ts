import { BlogPost } from "../types/blog";

const BASE_URL = import.meta.env.DEV
  ? "/api"
  : "https://blog-site-backend.netlify.app/.netlify/functions";

// Cache object for blog posts
const blogPostCache: Record<string, { post: BlogPost; fetchedAt: number }> = {};

const blogPostService = {
  /**
   * Fetch all blog posts from the server and update the cache.
   * @returns Promise resolving to an array of blog posts.
   */
  async fetchAll(): Promise<BlogPost[]> {
    try {
      const requestUrl = `${BASE_URL}${
        BASE_URL.endsWith("/") ? "" : "/"
      }fetchAll`;
      console.log(`[fetchAll] Making request to: ${requestUrl}`);
      console.log(
        `[fetchAll] Full resolved URL: ${new URL(
          requestUrl,
          window.location.href
        )}`
      );
      console.log(`[fetchAll] Request headers:`, {
        "Content-Type": "application/json",
      });

      const startTime = performance.now();
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const endTime = performance.now();

      console.log(
        `[fetchAll] Request took ${(endTime - startTime).toFixed(2)}ms`
      );
      console.log(
        `[fetchAll] Response status: ${response.status} ${response.statusText}`
      );

      // Log response headers if available
      const responseHeaders: Record<string, string> = {};
      if (response.headers) {
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        console.log(`[fetchAll] Response headers:`, responseHeaders);
      }

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[fetchAll] Response data:`, data);
      const posts: BlogPost[] = data.posts || [];

      // Update cache with fetched posts
      const now = Date.now();
      posts.forEach((post) => {
        blogPostCache[post.id] = { post, fetchedAt: now };
      });

      console.log(`Fetched ${posts.length} posts and updated cache.`);
      return posts;
    } catch (error) {
      console.error("Error fetching all posts:", error);
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
      const response = await fetch(
        `${BASE_URL}/findById?id=${encodeURIComponent(id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
        const headResponse = await fetch(
          `${BASE_URL}/findById?id=${encodeURIComponent(id)}`,
          {
            method: "HEAD",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!headResponse.ok) {
          throw new Error(`HEAD request failed: ${headResponse.statusText}`);
        }

        const serverTimestampStr = headResponse.headers.get("Last-Modified");
        if (!serverTimestampStr) {
          throw new Error("No Last-Modified header in HEAD response");
        }

        const serverTimestamp = new Date(serverTimestampStr).getTime();
        console.log(
          `HEAD request for ID ${id}: Server timestamp = ${serverTimestamp}, Cached timestamp = ${cached.fetchedAt}`
        );

        if (cached.fetchedAt >= serverTimestamp) {
          console.log(`Returning cached post for ID ${id}.`);
          return cached.post; // Return cached post if up-to-date
        }
      } catch (error) {
        console.error(
          `Error validating cache with HEAD request for ID ${id}:`,
          error
        );
        // If HEAD request fails, proceed to fetch fresh data
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
