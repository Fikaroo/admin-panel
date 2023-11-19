import { useRef, useState } from "react";
import "./Auto.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { catalogApis, getDataWithPagination } from "@/api";
import { Catalog, DataWithPagination } from "@/types";
import SearchElement from "@/elements/search";
import OutlinedButton from "@/elements/outlinedButton";
import FilledButton from "@/elements/filledButton";
import plusLogo from "@/assets/plusIcon.svg";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import calendarLogo from "@/assets/calendarIcon.svg";
import useOutSideClick from "@/hooks/useOutSideClick";
import dayjs from "dayjs";
import { DateRange, DayPicker } from "react-day-picker";

const Auto = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [value, setValue] = useState<DateRange | undefined>();
  const ref = useRef(null);
  const { isOpen: show, setIsOpen: setShow } = useOutSideClick(ref);
  const [minActionDate, setMinActionDate] = useState(dayjs(1997).toISOString());
  const [maxActionDate, setMaxActionDate] = useState(dayjs().toISOString());
  const [pageNum, setPageNum] = useState(1);
  const {
    data: catalogData,
    isLoading,
    error,
    isValidating,
  } = useSWR<DataWithPagination<Catalog[]>>(
    catalogApis.search({
      pageNum,
      pageSize: 10,
      minActionDate,
      maxActionDate,
      searchString,
    }),
    getDataWithPagination
  );

  const handleDateSelect = (newValue: DateRange | undefined) => {
    newValue?.from !== undefined
      ? setMinActionDate(newValue?.from.toISOString())
      : setMinActionDate("");

    newValue?.to !== undefined
      ? setMaxActionDate(newValue?.to.toISOString())
      : setMaxActionDate("");

    setValue({ from: newValue?.from, to: newValue?.to });
  };

  const handleNewAutoClick = () => {
    navigate("detail");
  };
  const handleSearch = (str: string) => setSearchString(str);

  return (
    <div>
      <div className="headerTitle">Автомобили</div>
      <div className="subHeader">
        <SearchElement onChange={handleSearch} />

        <div ref={ref} style={{ display: "flex", position: "relative" }}>
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
                right: 135,
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
          <FilledButton
            icon={plusLogo}
            text={"Новое авто"}
            onClick={handleNewAutoClick}
          />
        </div>
      </div>

      {isValidating || isLoading ? (
        <Loading />
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
