import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul style={{ display: "flex" }}>
        <Link to="/">
          <li style={{ color: "red", fontSize: "18px", margin: "12px" }}>
            Home
          </li>
        </Link>
        <Link to="/DisplayAllSongs">
          <li style={{ color: "red", fontSize: "18px", margin: "12px" }}>
            My List
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
