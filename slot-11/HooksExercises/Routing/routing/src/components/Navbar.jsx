import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // (bạn có thể tạo file CSS riêng để highlight link)

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Trang Chủ
      </NavLink>
      {" | "}
      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Sản Phẩm
      </NavLink>
      {" | "}
      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Liên Hệ
      </NavLink>
    </nav>
  );
}

export default Navbar;
