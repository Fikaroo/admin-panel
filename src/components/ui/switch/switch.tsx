import { useState } from "react";
import "./switch.scss";

type SwitchProps = {
  label?: string;
  isAcive?: boolean;
};

const Switch = ({ label, isAcive }: SwitchProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isAcive || false);

  const handleSwitch = () => setIsOpen(!isOpen);

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
