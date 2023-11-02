import { useState } from "react";
import "./Analytics.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { analyticsColumns } from "./components/analyticsColumns";
import { Catalog, DataWithPagination } from "@/types";
import { getAnalyticsDataWithPagination } from "@/api";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";

const Analytics = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data: analyticsData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Catalog[]>>(
    // `/catalog?localize=true&pageNum=${pageIndex}&pageSize=10`, Burda zakazlarin api-si olmalidir
    getAnalyticsDataWithPagination
  );
  const handleFilterClick = () => {};

  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
        </div>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        analyticsData?.data && (
          <DataTable
            rowLink="detail"
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pagination={analyticsData.pagination}
            data={analyticsData?.data}
            columns={analyticsColumns}
          />
        )
      )}
    </div>
  );
};

export default Analytics;
