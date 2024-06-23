/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table/table";

import ArrowLeft from "@/assets/arrow-narrow-left.svg?react";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/types";
import { useNavigate } from "react-router-dom";
import PaginationButton from "../pagination-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: Pagination;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  rowLink?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  pageNum,
  setPageNum,
  rowLink,
}: DataTableProps<TData, TValue>) {
  const paginationRange = usePagination({
    totalCount: pagination.total_pages,
    siblingCount: 2,
    pageSize: 1,
    currentPage: pageNum,
  });
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePrevPage = () => {
    if (pagination?.prev_page === "true") {
      setPageNum((prev) => (prev -= 1));
    }
  };

  const handleNextPage = () => {
    if (pagination?.next_page === "true") {
      setPageNum((prev) => (prev += 1));
    }
  };

  const handleToPage = (index: number) => setPageNum(index);

  const handleRowNavigate = (id: string) =>
    rowLink && navigate(`${rowLink}/${id}`);

  return (
    <div className="table-container">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  const { id } = row?.original as { id: string };
                  handleRowNavigate(id);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.;
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <tr>
            <td colSpan={columns.length}>
              <div className="pagination">
                <div
                  data-state={pagination.prev_page}
                  onClick={handlePrevPage}
                  className="left"
                >
                  <ArrowLeft className="leftIcon" />
                  Пред.
                </div>
                <div className="center">
                  {paginationRange?.map((pageNumber, index) => (
                    <PaginationButton
                      key={index}
                      pageNumber={pageNumber}
                      page={pageNum}
                      handlePageChange={handleToPage}
                    />
                  ))}
                </div>
                <div
                  data-state={pagination.next_page}
                  onClick={handleNextPage}
                  className="right"
                >
                  След.
                  <ArrowLeft className="rightIcon" />
                </div>
              </div>
            </td>
          </tr>
        </TableFooter>
      </Table>
    </div>
  );
}
