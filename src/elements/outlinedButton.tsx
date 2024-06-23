import "./outlinedButton.scss";

interface OutlineButtonProps {
  icon?: string;
  text: string;
  full?: boolean;
  onClick: () => void;
  disabled?: boolean;
}
export default function OutlinedButton({
  icon,
  text,
  onClick,
  full,
  disabled,
}: OutlineButtonProps) {
  return (
    <button
      className="outline"
      style={{ width: full ? "100%" : "auto", justifyContent: "flex-start" }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img src={icon} className="outline-icon" />}
      <p className="outline-text">{text}</p>
    </button>
  );
}
