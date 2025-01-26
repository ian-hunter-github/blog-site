import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "../components/Pagination";
import { useResponsive } from "../hooks/useResponsive";

vi.mock("../hooks/useResponsive");

describe("Pagination Component", () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.mocked(useResponsive).mockReturnValue({
      isSmall: false,
      isMedium: false,
      isLarge: true,
    });
  });

  it("renders pagination controls", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onPageChange when next button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("renders vertical layout on mobile", () => {
    vi.mocked(useResponsive).mockReturnValue({
      isSmall: true,
      isMedium: false,
      isLarge: false,
    });

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const stack = screen.getByRole("group");
    expect(stack).toHaveStyle("flex-direction: column");
  });

  it("renders horizontal layout on desktop", () => {
    vi.mocked(useResponsive).mockReturnValue({
      isSmall: false,
      isMedium: false,
      isLarge: true,
    });

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const stack = screen.getByRole("group");
    expect(stack).toHaveStyle("flex-direction: row");
  });
});
