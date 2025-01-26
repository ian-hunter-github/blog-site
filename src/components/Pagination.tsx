import { Button, Stack, Typography } from "@mui/material";
import { useResponsive } from "../hooks/useResponsive";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { isSmall: isMobile } = useResponsive();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      justifyContent="center"
      mt={4}
      alignItems="center"
      role="group"
    >
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Typography variant={isMobile ? "body1" : "body2"}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
