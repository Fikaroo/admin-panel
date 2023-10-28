import { getData } from "@/api";
import { DataTable } from "@/components/ui/data-table";
import useSWR from "swr";
import { columns } from "./components/columns";
import { Catalog } from "@/types";
import { useState } from "react";

const Auto = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data: catalogData,
    isLoading,
    error,
  } = useSWR<Catalog[]>(
    `/catalog?localize=true&pageNum=${pageIndex}&pageSize=2`,
    getData
  );

  console.log(catalogData);

  return (
    <div>
      Auto
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        catalogData && <DataTable data={catalogData} columns={columns} />
      )}
    </div>
  );
};

export default Auto;
