import "./outlinedButton.scss";

interface OutlineButtonProps{
  icon: string,
  text: string,
  onClick: () => void,
}
export default function OutlinedButton({icon, text,onClick}:OutlineButtonProps) {
  return (
    <button className="outline" onClick={onClick}>
        <img src={icon} className="outline-icon" />
        <p className="outline-text">{text}</p>
    </button>
    
  );
}
