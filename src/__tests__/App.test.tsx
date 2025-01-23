import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

test('renders the app root component', () => {
  render(<div>Hello, world!</div>);
  expect(screen.getByText(/Hello, world!/i)).toBeInTheDocument();
});

test('checks mocked environment variables', () => {
  const backendUrl = globalThis.importMeta.env.VITE_BACKEND_URL;
  const fetchRemoteData = globalThis.importMeta.env.VITE_FETCH_REMOTE_DATA;

  expect(backendUrl).toBe('http://mock-backend-url.com');
  expect(fetchRemoteData).toBe('false');
});

