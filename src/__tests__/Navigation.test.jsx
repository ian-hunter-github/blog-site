import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import * as ResponsiveContext from "../hooks/useResponsive";

describe("Navigation Tests", () => {
  test("renders navigation links on large screens", () => {
    // Mock the responsive context to simulate a large screen
    vi.spyOn(ResponsiveContext, "useResponsive").mockReturnValue({
      isSmall: false,
      isMedium: true,
      isLarge: true,
    });

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

    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Editor/i)).toBeInTheDocument();
  });

  test("renders menu button on small screens and displays menu options", () => {
    // Mock the responsive context to simulate a small screen
    vi.spyOn(ResponsiveContext, "useResponsive").mockReturnValue({
      isSmall: true,
      isMedium: false,
      isLarge: false,
    });

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

    // Verify menu button is present
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();

    // Simulate clicking the menu button
    fireEvent.click(menuButton);

    // Verify menu options appear
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Editor/i)).toBeInTheDocument();
  });
});
