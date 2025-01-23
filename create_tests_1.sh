#!/bin/bash

# Abort if any command fails
set -e

# Ensure a commit message is provided
# if [ -z "$1" ]; then
#   echo "Please provide a commit message."
#   exit 1
# fi

# Create test directories
mkdir -p src/__tests__
mkdir -p src/utils/__tests__
mkdir -p src/components/BlogCard/__tests__
mkdir -p src/pages/__tests__

# Create test files
cat > src/__tests__/EnvVars.test.ts << 'EOF'
import { test, expect } from 'vitest';

// Current expected environment variables and their values
const expectedEnvVars = {
  VITE_BACKEND_URL: 'http://mock-backend-url.com',
  VITE_FETCH_REMOTE_DATA: 'false',
};

test('checks environment variables in .env', () => {
  Object.entries(expectedEnvVars).forEach(([key, value]) => {
    expect(import.meta.env[key]).toBe(value);
  });
});
EOF

cat > src/utils/__tests__/MarkdownHandling.test.ts << 'EOF'
import { test, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import BlogCard from '../../components/BlogCard/BlogCard';
import BlogPostPage from '../../pages/BlogPostPage';

const mockPost = {
  id: '1',
  title: 'Valid Markdown',
  summary: 'This is a summary',
  content: '## Markdown Heading\n\n**Bold Text**\n\n- List Item 1\n- List Item 2',
  created_at: '2023-01-01',
  author: 'Author Name',
  image: '/placeholder.png',
};

describe('Markdown Handling', () => {
  test('renders valid markdown in BlogCard', () => {
    const { getByText } = render(<BlogCard post={mockPost} />);
    expect(getByText(/Markdown Heading/i)).toBeInTheDocument();
  });

  test('renders valid markdown in BlogPostPage', () => {
    const { getByText } = render(<BlogPostPage post={mockPost} />);
    expect(getByText(/Markdown Heading/i)).toBeInTheDocument();
  });

  test('handles malformed markdown gracefully', () => {
    const malformedPost = { ...mockPost, content: '<bad>html</bad>' };
    const { getByText } = render(<BlogPostPage post={malformedPost} />);
    expect(getByText(/html/i)).toBeInTheDocument();
  });
});
EOF

cat > src/__tests__/Palette.test.ts << 'EOF'
import { test, expect } from 'vitest';

// Static reference of approved palette
const expectedPalette = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
};

test('ensures all colors are from the approved palette', () => {
  const usedColors = ['#3498db', '#2ecc71', '#ecf0f1', '#e74c3c']; // Replace with dynamic extraction
  usedColors.forEach((color) => {
    expect(Object.values(expectedPalette)).toContain(color);
  });
});
EOF

cat > src/__tests__/Navigation.test.ts << 'EOF'
import { test, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Navigation Tests', () => {
  test('navigates via Header menu links', () => {
    const { getByText } = render(<Header />);
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    expect(window.location.pathname).toBe('/about');
  });

  test('navigates via AppBar links', () => {
    // Implement AppBar navigation test
  });

  test('navigates via site logo', () => {
    // Implement logo navigation test
  });
});
EOF

# Mock data file for tests
cat > src/utils/mockPalette.ts << 'EOF'
const mockPalette = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
};
export default mockPalette;
EOF

# Mock .env values
cat > src/utils/mockEnv.ts << 'EOF'
export const mockEnv = {
  VITE_BACKEND_URL: 'http://mock-backend-url.com',
  VITE_FETCH_REMOTE_DATA: 'false',
};
EOF

echo "Test files created. Please update the codebase and run 'vitest' to verify."
