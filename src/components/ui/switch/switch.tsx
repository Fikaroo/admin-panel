import { useEffect, useState } from "react";
import "./switch.scss";
import { UseFormSetValue } from "react-hook-form";
import { AutoDetailFormSchema } from "@/pages/Auto/Detail/AutoDetail";
import { useAutoStore } from "@/pages/Auto/Auto";

type SwitchProps = {
  label?: string;
  isAcive?: boolean;
  setValue?: UseFormSetValue<AutoDetailFormSchema>;
  onChange?: (...event: unknown[]) => void;
};

const Switch = ({ label, isAcive, onChange }: SwitchProps) => {
  const { disabled } = useAutoStore();
  const [isOpen, setIsOpen] = useState<boolean>(isAcive || false);
  const handleSwitch = () => {
    setIsOpen(!isOpen);
    onChange && onChange(!isOpen);
  };

  useEffect(() => {
    isAcive && setIsOpen(isAcive);
  }, [isAcive, isOpen, disabled]);

  return (
    <div className="switch">
      <button
        data-state={isOpen ? "checked" : "unchecked"}
        type="button"
        onClick={handleSwitch}
        disabled={disabled}
      >
        <span data-state={isOpen ? "checked" : "unchecked"} />
      </button>
      {label}
    </div>
  );
};

export default Switch;
