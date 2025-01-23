import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PostsProvider } from '../../context/PostsContext';
import BlogPostPage from '../../pages/BlogPostPage';

import { mockEnvVars, restoreEnvVars } from '../mockEnv';

import { vi } from 'vitest';

const mockPosts = [
  {
    id: '1',
    title: 'Markdown Heading',
    content: 'This is a sample content with markdown.',
    author: 'Test Author',
    date: '2023-01-01',
    image: '/placeholder.png',
  },
];

describe('Markdown Handling', () => {

  const consoleSpy = vi.spyOn(console, 'log');

  beforeEach(() => {
    mockEnvVars({
      VITE_BACKEND_URL: 'http://mock-backend.local',
      VITE_FETCH_REMOTE_DATA: 'false',
    });
    consoleSpy.mockImplementation(() => { }); // Mock implementation
  });

  afterEach(() => {
    restoreEnvVars();
    consoleSpy.mockRestore(); // Restore the original console.log behavior    
  });

  test('renders valid markdown in BlogPostPage', () => {

    // Check that mocked values are being used
    expect(import.meta.env.VITE_FETCH_REMOTE_DATA).toBe('false');

    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        initialEntries={['/posts/1']}
      >
        <PostsProvider initialPosts={mockPosts}>
          <Routes>
            <Route path="/posts/:id" element={<BlogPostPage />} />
          </Routes>
        </PostsProvider>
      </MemoryRouter>
    );

    // Verify that the correct post is rendered
    expect(screen.getByText(/Markdown Heading/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a sample content with markdown./i)).toBeInTheDocument();

  });

});
