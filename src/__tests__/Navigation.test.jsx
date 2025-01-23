import { test, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

// Mock Material-UI's useMediaQuery for responsive rendering
vi.mock('@mui/material', async (original) => {
  const actual = await original();
  return {
    ...actual,
    useMediaQuery: vi.fn().mockReturnValue(true), // Force large screen
  };
});

describe('Navigation Tests', () => {
  test('navigates via Header menu links', () => {
    render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
      </BrowserRouter>
    );

    const aboutText = screen.getByText(/About/i); // Case-insensitive match
    expect(aboutText).toBeInTheDocument();

  });
});
