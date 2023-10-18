import { Component } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import "./Layout.scss";

export class Layout extends Component {
  render() {
    return (
      <div className="layout__container">
        <SideBar />

        <div className="outlet__container">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default Layout;
