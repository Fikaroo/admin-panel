import "./textarea.scss"
const TextArea = ({
  title,
  subtitle,
  maxSymbol,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  maxSymbol: string;
  value: string;
  onChange: (e: string) => void;
}) => {
  return (
    <div style={{ marginBlock: 32 }}>
      <label className="textAreaTitle">{title}</label>
      <p className="textAreaSubTitle">{subtitle}</p>
      <textarea
        className="textareaElement"
        value={value}
        // maxLength={500}
        style={{ marginTop: 6 }}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="maxSymbol">{maxSymbol}</p>
    </div>
  );
};
export default TextArea;
