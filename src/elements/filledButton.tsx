import "./filledButton.scss";

interface FilledButtonProps {
  icon?: string;
  text: string;
  onClick: () => void;
  full?: boolean;
  disabled?: boolean;
}
export default function FilledButton({
  icon,
  text,
  onClick,
  full,
  disabled,
}: FilledButtonProps) {
  return (
    <button
      className="filled"
      style={{ width: full ? "100%" : "auto" }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img src={icon} className="filled-icon" />}
      <p className="filled-text">{text}</p>
    </button>
  );
}
