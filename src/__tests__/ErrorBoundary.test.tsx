import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ErrorBoundary from "../components/ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("Test error");
  return null;
};

const GoodComponent = () => <div>Everything is fine</div>;

describe("ErrorBoundary", () => {
  beforeEach(() => {
    // Mock console.error to avoid test noise
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Everything is fine")).toBeInTheDocument();
  });

  it("displays fallback UI when error occurs", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  // it("resets error state when Try Again is clicked", async () => {
  //   const { rerender } = render(
  //     <ErrorBoundary>
  //       <GoodComponent />
  //     </ErrorBoundary>
  //   );

  //   // Simulate error by replacing with ErrorComponent
  //   rerender(
  //     <ErrorBoundary>
  //       <ErrorComponent />
  //     </ErrorBoundary>
  //   );

  //   // Verify error state
  //   expect(screen.getByText("Something went wrong")).toBeInTheDocument();

  //   // Click Try Again
  //   fireEvent.click(screen.getByText("Try Again"));

  //   // Verify error state is cleared and component is remounted
  //   expect(screen.getByText("Everything is fine")).toBeInTheDocument();
  //   expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  // });

  it("shows error details in development mode", () => {
    process.env.NODE_ENV = "development";

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(screen.getByText(/ErrorBoundary.test.tsx/)).toBeInTheDocument();
  });
});
