/* eslint-disable @typescript-eslint/no-explicit-any */
import { catalogApis, getDataWithPagination } from "@/api";
import plusLogo from "@/assets/plusIcon.svg";
import Loading from "@/components/Loading";
import { DataTable } from "@/components/ui/data-table";
import FilledButton from "@/elements/filledButton";
import SearchElement from "@/elements/search";
import { Catalog, DataWithPagination } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { KeyedMutator } from "swr";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import "./Auto.scss";
import { CarDateDisable } from "./components/car-date-disable";
import { columns } from "./components/columns";

interface AutoState {
  disabled: boolean;
  mutator: KeyedMutator<DataWithPagination<Catalog[]>> | KeyedMutator<null>;
  setMutator: (newMutator: KeyedMutator<DataWithPagination<Catalog[]>>) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAutoStore = create<AutoState>()(
  devtools(
    persist(
      (set) => ({
        disabled: false,
        mutator: async () => null,
        setMutator: (newMutator) => set(() => ({ mutator: newMutator })),
      }),
      {
        name: "auto-storage",
      }
    )
  )
);

const Auto = () => {
  const { setMutator } = useAutoStore();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const ref = useRef(null);
  const [pageNum, setPageNum] = useState(1);
  const {
    data: catalogData,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR<DataWithPagination<Catalog[]>>(
    catalogApis.search({
      pageNum,
      pageSize: 10,
      searchString,
    }),
    getDataWithPagination
  );

  const handleNewAutoClick = () => {
    navigate("detail");
  };
  const handleSearch = (str: string) => setSearchString(str);

  useEffect(() => {
    setMutator(mutate);
  }, []);

  return (
    <div>
      <div className="headerTitle">Автомобили</div>

      <CarDateDisable />

      <div className="subHeader">
        <SearchElement onChange={handleSearch} />

        <div ref={ref} style={{ display: "flex", position: "relative" }}>
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
