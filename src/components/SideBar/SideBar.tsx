import { Component } from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";

type SideBarProps = object;

type SideBarState = {
  routes: Routes[];
};

type Routes = {
  name: string;
  path: string;
  icon: string;
};

export class SideBar extends Component<SideBarProps, SideBarState> {
  state: SideBarState = {
    routes: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "",
      },
      {
        name: "Link1",
        path: "/dashboard",
        icon: "",
      },
      {
        name: "Link2",
        path: "/dashboard",
        icon: "",
      },
      {
        name: "Link3",
        path: "/dashboard",
        icon: "",
      },
    ],
  };

  render() {
    const { routes } = this.state;
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
  }
}

export default SideBar;
