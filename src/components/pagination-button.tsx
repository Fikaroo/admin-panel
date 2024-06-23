import { DOTS } from "@/hooks/usePagination";
import { Button } from "@mui/material";

type PaginationButtonProps = {
  pageNumber: string | number;
  handlePageChange: (pageNum: number) => void;
  page: number;
};

const PaginationButton = ({
  pageNumber,
  handlePageChange,
  page,
}: PaginationButtonProps) => {
  if (pageNumber === DOTS) {
    return (
      <Button disabled className="number" key={pageNumber}>
        ...
      </Button>
    );
  }

  return (
    <Button
      data-state={page === pageNumber}
      className="number"
      key={pageNumber}
      onClick={() => handlePageChange(Number(pageNumber))}
    >
      {pageNumber}
    </Button>
  );
};

export default PaginationButton;
