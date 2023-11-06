import "./filledButton.scss";

interface FilledButtonProps{
  icon?: string,
  text: string,
  onClick: () => void,
}
export default function FilledButton({icon, text, onClick}:FilledButtonProps) {
  return (
    <button className="filled" onClick={onClick}>
        <img src={icon} className="filled-icon" />
        <p className="filled-text">{text}</p>
    </button>
    
  );
}