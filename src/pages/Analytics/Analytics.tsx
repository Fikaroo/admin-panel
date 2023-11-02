import { useState } from "react";
import "./Analytics.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { analyticsColumns } from "./components/analyticsColumns";
import { Analytic, DataWithPagination } from "@/types";
import { getDataWithPagination } from "@/api";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";
import calendarLogo from "@/assets/calendarIcon.svg";

const Analytics = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    data: analyticsData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Analytic[]>>(
    // `/catalog?localize=true&pageNum=${pageIndex}&pageSize=10`, Burda zakazlarin api-si olmalidir
    getDataWithPagination
  );

  const handleDateSelect = () => {};
  const handleFilterClick = () => {};

  return (
    <div>
      <div className="headerTitle">Аналитика</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <OutlinedButton
            icon={calendarLogo}
            text={"Выберите даты"}
            onClick={handleDateSelect}
          />
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
            pageNum={pageNum}
            setPageNum={setPageNum}
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
