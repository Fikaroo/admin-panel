import { useState } from "react";
import "./switch.scss";
import { UseFormSetValue } from "react-hook-form";
import { AutoDetailForm } from "@/pages/Auto/Detail/AutoDetail";

type SwitchProps = {
  label?: string;
  isAcive?: boolean;
  setValue?: UseFormSetValue<AutoDetailForm>;
};

const Switch = ({ label, isAcive, setValue }: SwitchProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isAcive || false);

  const handleSwitch = () => {
    setIsOpen(!isOpen);
    setValue && setValue("isActive", isOpen);
  };

  return (
    <div className="switch">
      <button
        data-state={isOpen ? "checked" : "unchecked"}
        type="button"
        onClick={handleSwitch}
      >
        <span data-state={isOpen ? "checked" : "unchecked"} />
      </button>
      {label}
    </div>
  );
};

export default Switch;
