import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import blogPostService from '../../services/blogPostService';
import BlogPostPage from '../../pages/BlogPostPage';

vi.mock('../../services/blogPostService', () => ({
  default: {
    fetchById: vi.fn(),
  },
}));

const mockPost = {
  id: '1',
  title: 'Markdown Heading',
  content: 'This is a sample content with markdown.',
  summary: 'A brief summary of the post.',
  created_at: '2023-01-01',
  author: 'Test Author',
  image: '/placeholder.png',
};

describe('Markdown Handling', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('renders valid markdown in BlogPostPage', async () => {
    // Mock the fetchById method to resolve with mockPost
    blogPostService.fetchById.mockResolvedValue(mockPost);

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the post to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Markdown Heading/i)).toBeInTheDocument();
      expect(screen.getByText(/This is a sample content with markdown./i)).toBeInTheDocument();
    });
  });
});
