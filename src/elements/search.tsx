import "./search.scss";
import search from "@/assets/search.svg";

export default function SearchElement() {
  return (
    <div className="search-element">
        <img src={search} className="search-icon" />
        <input type="text" placeholder={"Поиск"} className="search"/>
    </div>
    
  );
}
