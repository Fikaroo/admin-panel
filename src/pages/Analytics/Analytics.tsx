import { useRef, useState } from "react";
import "./Analytics.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { analyticsColumns } from "./components/analyticsColumns";
import { Analytic, DataWithPagination } from "@/types";
import { analyticsApis, getDataWithPagination } from "@/api";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";
import calendarLogo from "@/assets/calendarIcon.svg";
import dayjs from "dayjs";
import { DateRange, DayPicker } from "react-day-picker";
import Loading from "@/components/Loading";
import "react-day-picker/dist/style.css";
import useOutSideClick from "@/hooks/useOutSideClick";

const Analytics = () => {
  const [value, setValue] = useState<DateRange | undefined>();
  const ref = useRef(null);
  const { isOpen: show, setIsOpen: setShow } = useOutSideClick(ref);
  const [pageNum, setPageNum] = useState(1);
  const [minActionDate, setMinActionDate] = useState(dayjs(1997).toISOString());
  const [maxActionDate, setMaxActionDate] = useState(dayjs().toISOString());
  const {
    data: analyticsData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Analytic[]>>(
    analyticsApis.search({
      pageNum,
      pageSize: 10,
      minActionDate,
      maxActionDate,
    }),
    getDataWithPagination
  );

  const handleDateSelect = (newValue: DateRange | undefined) => {
    if (newValue?.from !== undefined && newValue?.to !== undefined) {
      setMinActionDate(newValue.from.toISOString());
      setMaxActionDate(newValue.to.toISOString());
    }
    newValue?.from !== undefined &&
      setMinActionDate(newValue?.from.toISOString());

    setValue({ from: newValue?.from, to: newValue?.to });
  };

  const [sort, setSort] = useState(false);
  const handleFilterClick = () => {
    setSort(!sort);
  };
  const handleOptionClick = () => {};

  return (
    <div>
      <div className="headerTitle">Аналитика</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <div ref={ref} style={{ position: "relative" }}>
            <OutlinedButton
              icon={calendarLogo}
              text={"Выберите даты"}
              onClick={() => setShow(!show)}
            />

            {show ? (
              <DayPicker
                style={{
                  position: "absolute",
                  background: "white",
                  padding: 20,
                  top: 40,
                  left: -20,
                  zIndex: 10,
                  border: "1px solid var(--gray-200, #EAECF0)",
                  borderRadius: "4px",
                }}
                defaultMonth={new Date()}
                mode="range"
                selected={value}
                onSelect={(newValue) => handleDateSelect(newValue)}
                // footer={footer}
              />
            ) : null}
          </div>
          {/* <DateRangePickerWithButtonField
            value={value}
            onChange={(newValue) => handleDateSelect(newValue)}
          /> */}
          {/* {show ? <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangeCalendar
              calendars={1}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider> : null} */}

          <div style={{ position: "relative" }}>
            <OutlinedButton
              icon={filterUpLogo}
              text={"Фильтры"}
              onClick={handleFilterClick}
            />
            {sort && (
              <div className="sort-options-analytics">
                <ul>
                  <li onClick={() => handleOptionClick()}>По времени</li>
                  <li onClick={() => handleOptionClick()}>
                    По модели автомобиля
                  </li>
                  <li onClick={() => handleOptionClick()}>По IP</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <>Error</>
      ) : (
        analyticsData?.data && (
          <DataTable
            rowLink=""
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
