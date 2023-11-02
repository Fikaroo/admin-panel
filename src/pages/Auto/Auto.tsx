import { useState } from "react";
import "./Auto.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { calatogApis, getDataWithPagination } from "@/api";
import { Catalog, DataWithPagination } from "@/types";
import SearchElement from "@/elements/search";
import OutlinedButton from "@/elements/outlinedButton";
import FilledButton from "@/elements/filledButton";
import filterUpLogo from "@/assets/filterIcon.svg";
import plusLogo from "@/assets/plusIcon.svg";

const Auto = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    data: catalogData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Catalog[]>>(
    calatogApis.search({ pageNum, pageSize: 10 }),
    getDataWithPagination
  );

  const handleFilterClick = () => {};

  const handleNewAutoClick = () => {};

  return (
    <div>
      <div className="headerTitle">Автомобили</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
          <FilledButton
            icon={plusLogo}
            text={"Новое авто"}
            onClick={handleNewAutoClick}
          />
        </div>
      </div>

      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        catalogData?.data && (
          <DataTable
            rowLink="detail"
            pageNum={pageNum}
            setPageNum={setPageNum}
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
