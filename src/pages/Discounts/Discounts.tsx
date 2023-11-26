import { useRef, useState } from "react";
import "./Discounts.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { discountColumns } from "./components/discountColumns";
import { discountApis, getDataWithPagination } from "@/api";
import { Discount, DataWithPagination } from "@/types";
import SearchElement from "@/elements/search";
import OutlinedButton from "@/elements/outlinedButton";
import FilledButton from "@/elements/filledButton";
import plusLogo from "@/assets/plusIcon.svg";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import calendarLogo from "@/assets/calendarIcon.svg";
import useOutSideClick from "@/hooks/useOutSideClick";
import { DateRange, DayPicker } from "react-day-picker";

const Discounts = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [value, setValue] = useState<DateRange | undefined>();
  const ref = useRef(null);
  const { isOpen: show, setIsOpen: setShow } = useOutSideClick(ref);
  const [minActionDate, setMinActionDate] = useState("");
  const [maxActionDate, setMaxActionDate] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const {
    data: discountData,
    isLoading,
    error,
    isValidating,
  } = useSWR<DataWithPagination<Discount[]>>(
    discountApis.search({
      pageNum,
      pageSize: 10,
      includeCatalog: true,
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

  const handleNewDiscountClick = () => {
    navigate("detail/newDiscountPrice");
  };

  const handleSearch = (str: string) => setSearchString(str);
  return (
    <div>
      <div className="headerTitle">Акции</div>
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
                right: 145,
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
            text={"Новая акция"}
            onClick={handleNewDiscountClick}
          />
        </div>
      </div>

      {isValidating || isLoading ? (
        <Loading />
      ) : error ? (
        <>Error</>
      ) : (
        discountData?.data && (
          <DataTable
            rowLink="detail/newDiscountPrice"
            pageNum={pageNum}
            setPageNum={setPageNum}
            pagination={discountData.pagination}
            data={discountData?.data}
            columns={discountColumns}
          />
        )
      )}
    </div>
  );
};

export default Discounts;
