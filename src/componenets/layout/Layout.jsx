import React from "react";
import "./Layout.css";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Header />
        <div className="layout__content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
