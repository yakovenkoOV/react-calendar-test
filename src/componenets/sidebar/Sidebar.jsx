import React from "react";
import "./Sidebar.css";
import {
  FaEnvelope,
  FaGlobe,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaCalendarAlt,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-name">
        <h2>IMPEKABLE</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <FaHome className="icon" />
            <span>Home</span>
          </li>
          <li>
            <FaChartSimple className="icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <FaEnvelope className="icon" />
            <span>Inbox</span>
          </li>
          <li>
            <FaBoxOpen className="icon" />
            <span>Products</span>
          </li>
          <li>
            <FaFileInvoiceDollar className="icon" />
            <span>Invoices</span>
          </li>
          <li>
            <FaUserFriends className="icon" />
            <span>Customers</span>
          </li>
          <li className="active">
            <FaCalendarAlt className="icon" />
            <span>Calendar</span>
          </li>
          <li>
            <FaGlobe className="icon" />
            <span>Help Center</span>
          </li>
          <li>
            <FaCog className="icon" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
