import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./tab.scss";

const links = [
  {
    name: "Header & Footer",
    to: "/",
  },
  {
    name: "About Us & B2B",
    to: "/",
  },
  {
    name: "FAQ",
    to: "/",
  },
  {
    name: "Partners",
    to: "/",
  },
];

const Tab = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <div className="tabs">
        {links.map(({ name, to }) => (
          <Link data-state={to === pathname} to={to} key={name} className="tab">
            <p className="tab__title">{name}</p>
          </Link>
        ))}
      </div>
      {children}
    </Fragment>
  );
};

export default Tab;
