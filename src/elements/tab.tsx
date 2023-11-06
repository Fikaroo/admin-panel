import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./tab.scss";

// Example links Array
// const links:Link[] = [
//   {
//     name: "Header & Footer",
//     to: "/",
//   },
//   {
//     name: "About Us & B2B",
//     to: "/",
//   },
//   {
//     name: "FAQ",
//     to: "/",
//   },
//   {
//     name: "Partners",
//     to: "/",
//   },
// ];

type Link = {
  name: string;
  to: string;
};

type TabProps = {
  children: React.ReactNode;
  links: Link[];
};

const Tab = ({ links, children }: TabProps) => {
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
