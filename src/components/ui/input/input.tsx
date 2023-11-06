const Input = ({placeholder, title, value, onChange }: {placeholder:string,title:string, value:string, onChange: (e:string)=>void }) => {
  return (
    <div style={{marginBlock: 32}}>
      <label>{title}</label>
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        style={{marginTop: 6}}
        onChange={(event) => onChange(event.target.value)}
        type="text"
      />
    </div>
  );
};
export default Input;
