import { format } from "date-fns";
import { useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

import { discountApis, postData } from "@/api";
import calendarLogo from "@/assets/calendarIcon.svg";
import OutlinedButton from "@/elements/outlinedButton";
import useOutSideClick from "@/hooks/useOutSideClick";
import { defaultToast } from "@/utils";

import "react-day-picker/dist/style.css"; // Ensure DayPicker styles are included

const CarDateDisable = () => {
  const { trigger } = useSWRMutation(discountApis.deactivateAll, postData);
  const ref = useRef(null);
  const { isOpen, setIsOpen } = useOutSideClick(ref);

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const dateText = date?.from
    ? date.to
      ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      : format(date.from, "LLL dd, y")
    : "Выберите даты";

  const handleSubmit = () => {
    if (!date?.from) {
      return toast.error("Дата не выбрана");
    } else if (!date?.to) {
      return toast.error("Дата окончания не выбрана");
    }
    defaultToast(trigger({ startDate: date?.from, endDate: date?.to }));
  };

  return (
    <div style={{ display: "flex", margin: "20px 0" }}>
      <div
        ref={ref}
        style={{ display: "flex", position: "relative", width: 300 }}
      >
        <OutlinedButton
          icon={calendarLogo}
          text={dateText}
          onClick={() => setIsOpen(!isOpen)}
          full
        />
        {isOpen && (
          <DayPicker
            style={{
              position: "absolute",
              background: "white",
              padding: 20,
              top: 40,
              right: -6,
              zIndex: 10,
              border: "1px solid var(--gray-200, #EAECF0)",
              borderRadius: "4px",
            }}
            defaultMonth={new Date()}
            disabled={{ before: new Date() }}
            mode="range"
            selected={date}
            onSelect={setDate}
            showOutsideDays
          />
        )}
      </div>
      <button className="filled" onClick={handleSubmit}>
        <p className="filled-text">Деактивировать все</p>
      </button>
    </div>
  );
};

export { CarDateDisable };
