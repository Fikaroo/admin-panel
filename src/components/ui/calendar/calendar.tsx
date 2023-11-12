import React, { forwardRef, useState } from "react";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import useForkRef from "@mui/utils/useForkRef";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateRangePicker,
  DateRangePickerProps,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeFieldProps } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import calendarLogo from "@/assets/calendarIcon.svg";
import "./calendar.scss";
import { DateRange } from "@mui/x-date-pickers-pro";

interface DateRangeButtonFieldProps
  extends SingleInputDateRangeFieldProps<Dayjs> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

type DateRangeButtonFieldComponent = ((
  props: DateRangeButtonFieldProps & React.RefAttributes<HTMLDivElement>
) => React.JSX.Element) & { fieldType?: string };

const DateRangeButtonField = forwardRef(
  (props: DateRangeButtonFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      setOpen,
      label,
      id,
      disabled,
      InputProps: { ref: containerRef } = {},
      inputProps: { "aria-label": ariaLabel } = {},
    } = props;

    const handleRef = useForkRef(ref, containerRef);

    return (
      <Button
        sx={{
          border: "2px solid #fc0 !important",
          color: "#141414 !important",
          backgroundColor: label ? "#fc0 !important" : "#fff !important",
        }}
        className="outlineCalendar"
        variant="outlined"
        id={id}
        disabled={disabled}
        ref={handleRef}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
      >
        <img src={calendarLogo} className="outlineCalendar-icon" />
        <p className="outlineCalendar-text">
          {label ? `${label}` : "Выберите даты"}
        </p>
      </Button>
    );
  }
) as DateRangeButtonFieldComponent;

DateRangeButtonField.fieldType = "single-input";

const ButtonDateRangePicker = forwardRef(
  (
    props: Omit<DateRangePickerProps<Dayjs>, "open" | "onOpen" | "onClose">,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <DateRangePicker
        calendars={1}
        slots={{ field: DateRangeButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } as object | undefined }}
        ref={ref}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  }
);

type DateRangePickerWithButtonFieldProps = {
  onChange: (newDate: DateRange<Dayjs>) => void;
  value: DateRange<Dayjs> | undefined;
};

export default function DateRangePickerWithButtonField({
  onChange,
  value,
}: DateRangePickerWithButtonFieldProps) {
  //   const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDateRangePicker
        label={
          value?.[0] === null && value?.[1] === null
            ? null
            : value
                ?.map((date) => (date ? date.format("MM/DD/YYYY") : "null"))
                .join(" - ")
        }
        value={value}
        // onChange={(newValue) => setValue(newValue)}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
