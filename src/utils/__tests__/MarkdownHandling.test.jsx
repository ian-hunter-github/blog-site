import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostPage from '../../pages/BlogPostPage';
import blogPostService from '../../services/blogPostService';
import { vi } from 'vitest';

vi.mock('../../services/blogPostService', () => ({
  default: {
    fetchPostByIdWithCache: vi.fn(),
  },
}));

describe('Markdown Handling', () => {
  const mockPost = {
    id: '1',
    title: 'Markdown Heading',
    content: 'This is a sample content with markdown.\n\nMore text.',
    author: 'Test Author',
    date: '2023-01-01',
    image: '/placeholder.png',
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test('renders valid markdown in BlogPostPage', async () => {
    // Mock the fetchPostByIdWithCache method
    vi.mocked(blogPostService.fetchPostByIdWithCache).mockResolvedValue(mockPost);

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure the post is fetched and rendered correctly
    await waitFor(() => {
      expect(screen.getByText(/Markdown Heading/i)).toBeInTheDocument();
      expect(screen.getByText(/This is a sample content with markdown./i)).toBeInTheDocument();
    });

    // Verify the service call
    expect(blogPostService.fetchPostByIdWithCache).toHaveBeenCalledWith('1');
    expect(blogPostService.fetchPostByIdWithCache).toHaveBeenCalledOnce();
  });

  test('renders "Post Not Found" when post is missing', async () => {
    // Mock the fetchPostByIdWithCache method to return null
    vi.mocked(blogPostService.fetchPostByIdWithCache).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure the "Post Not Found" message is rendered
    await waitFor(() => {
      expect(screen.getByText(/Post Not Found/i)).toBeInTheDocument();
      expect(
        screen.getByText(/The post you are looking for does not exist or has been removed./i)
      ).toBeInTheDocument();
    });

    // Verify the service call
    expect(blogPostService.fetchPostByIdWithCache).toHaveBeenCalledWith('1');
    expect(blogPostService.fetchPostByIdWithCache).toHaveBeenCalledOnce();
  });
});
