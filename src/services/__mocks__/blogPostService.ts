export const blogPostService = {
    fetchPosts: vi.fn(() =>
      Promise.resolve({
        posts: [
          { id: "1", title: "Test Post", content: "Sample content" },
        ],
      })
    ),
  
    fetchPostById: vi.fn((id: string) =>
      Promise.resolve({
        id,
        title: `Test Post ${id}`,
        content: `Sample content for post ${id}`,
      })
    ),
  };
  