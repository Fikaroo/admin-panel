import { useState } from "react";
import "./switch.scss";

const Switch = () => {
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
      </label>
    </div>
  );
};

export default Switch;
