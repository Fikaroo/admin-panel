import "./search.scss";
import search from "@/assets/search.svg";

type SearchElementProps = {
  onChange: (str: string) => void;
};

export default function SearchElement({ onChange }: SearchElementProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div className="search-element">
      <img src={search} className="search-icon" />
      <input
        onChange={handleInput}
        type="text"
        placeholder={"Поиск"}
        className="search"
      />
    </div>
  );
}
