import "./SideBar.scss";
import { Link } from "react-router-dom";

type Routes = {
  name: string;
  path: string;
  icon: string;
};

const routes: Routes[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "",
  },
  {
    name: "Table",
    path: "/table",
    icon: "",
  },
  {
    name: "Link2",
    path: "/dashboard",
    icon: "",
  },
  {
    name: "auto",
    path: "/auto",
    icon: "",
  },
];

const SideBar = () => {
  return (
    <div className="sidebar__container">
      <ul className="link__list">
        {routes.map(({ name, path }) => (
          <li key={name} className="link">
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
