import { useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

import { getDataWithPagination } from "@/api";

import { Catalog, DataWithPagination } from "@/types";

const Auto = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data: catalogData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Catalog[]>>(
    `/catalog?localize=true&pageNum=${pageIndex}&pageSize=3`,
    getDataWithPagination
  );
  return (
    <div>
      Auto
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        catalogData?.data && (
          <DataTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pagination={catalogData.pagination}
            data={catalogData?.data}
            columns={columns}
          />
        )
      )}
    </div>
  );
};

export default Auto;
