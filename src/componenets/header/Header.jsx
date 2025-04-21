import React from "react";
import "./Header.css";
import { FaBell, FaGlobe, FaSearch } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <FaSearch className="icon-header"></FaSearch>
        <input
          type="text"
          placeholder="Search transactions, invoices or help"
        />
      </div>
      <div className="header-icons">
        <FaGlobe className="icons" />
        <IoMdChatboxes className="icons" />
        <FaBell className="icons" />
      </div>
      <div className="header-user-info">
        <span className="header-user-name">John Doe</span>
        <img
          src={"/user.jpg"}
          alt="User avatar"
          className="header-user-avatar"
        />
      </div>
    </header>
  );
};

export default Header;
