import { useState } from "react";
import "./switch.scss";

type SwitchProps = {
  label?: string;
};

const Switch = ({ label }: SwitchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = () => setIsOpen(!isOpen);

  return (
    <div className="switch">
      <label>
        <button
          data-state={isOpen ? "checked" : "unchecked"}
          type="button"
          onClick={handleSwitch}
        >
          <span data-state={isOpen ? "checked" : "unchecked"} />
        </button>
        {label}
      </label>
    </div>
  );
};

export default Switch;
