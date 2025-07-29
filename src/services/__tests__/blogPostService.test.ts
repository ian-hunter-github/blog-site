import { vi, describe, it, expect, beforeEach } from "vitest";
import blogPostService from "../blogPostService";

// Mock the global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the environment variable
vi.mock("../../utils/envWrapper", () => ({
  getEnvVar: vi.fn(() => "/api"),
}));

describe("blogPostService", () => {
  const mockPosts = [
    {
      id: "2e5830f8-7040-4d5b-9432-5ed094425329",
      title: "Strength Training After 50: A Guide to Staying Strong",
      summary:
        "Why strength training is essential for maintaining health and independence after 50",
      content: "Turning 50 is a significant milestone...",
      image: "strength-training.jpg",
      author: "Dr. Sarah Johnson",
      created_at: "2025-01-15T09:00:00+00:00",
      updated_at: "2025-01-20T14:30:00+00:00",
    },
    {
      id: "4c92e9ea-fa19-4ed5-a65d-f3841acf63e1",
      title: "The Science of Muscle Preservation",
      summary:
        "Understanding sarcopenia and how to combat age-related muscle loss",
      content:
        "From our 30s onward, muscle mass and strength begin to decline...",
      image: "muscle-science.jpg",
      author: "Dr. Michael Chen",
      created_at: "2025-02-10T11:00:00+00:00",
      updated_at: "2025-02-15T10:15:00+00:00",
    },
  ];

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("fetchAll", () => {
    it("should fetch and return all blog posts", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ posts: mockPosts }),
      });

      const result = await blogPostService.fetchAll();

      expect(result).toEqual(mockPosts);
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/fetchAll",
        expect.objectContaining({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });

    it("should throw an error when response is not ok", async () => {
      // Mock failed response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(blogPostService.fetchAll()).rejects.toThrow(
        "Error fetching posts: Not Found"
      );
    });

    it("should handle missing posts array in response", async () => {
      // Mock response with missing posts array
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await blogPostService.fetchAll();
      expect(result).toEqual([]);
    });
  });

  describe("fetchById", () => {
    it("should fetch and return a single blog post", async () => {
      const mockPost = mockPosts[0];

      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ post: mockPost }),
      });

      const result = await blogPostService.fetchById(mockPost.id);

      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/findById?id=${encodeURIComponent(mockPost.id)}`,
        expect.objectContaining({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });

    it("should return null when post is not found", async () => {
      // Mock successful response with no post
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await blogPostService.fetchById("non-existent-id");
      expect(result).toBeNull();
    });

    it("should throw an error when response is not ok", async () => {
      // Mock failed response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(blogPostService.fetchById("some-id")).rejects.toThrow(
        "Error fetching post by ID: Not Found"
      );
    });
  });

  describe("fetchPostByIdWithCache", () => {
    it("should return cached post when up-to-date", async () => {
      const mockPost = mockPosts[0];
      const now = Date.now();

      // Mock fetchAll response to populate cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ posts: [mockPost] }),
      });
      await blogPostService.fetchAll();

      // Mock HEAD response for cache validation
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: {
          get: (header: string) =>
            header === "Last-Modified"
              ? new Date(now - 1000).toUTCString()
              : null,
        },
      });

      const result = await blogPostService.fetchPostByIdWithCache(mockPost.id);
      expect(result).toEqual(mockPost);
    });

    it("should fetch fresh post when cache is stale", async () => {
      const mockPost = mockPosts[0];
      const now = Date.now();

      // Pre-populate cache with stale data
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ posts: [{ ...mockPost, title: "Old Title" }] }),
      });
      await blogPostService.fetchAll();

      // Mock HEAD response indicating newer version exists
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: {
          get: (header: string) =>
            header === "Last-Modified"
              ? new Date(now + 1000).toUTCString()
              : null,
        },
      });

      // Mock fresh fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ post: mockPost }),
      });

      // Mock that the cache was populated earlier
      vi.spyOn(Date, "now").mockReturnValueOnce(now - 2000);

      const result = await blogPostService.fetchPostByIdWithCache(mockPost.id);
      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });
});
