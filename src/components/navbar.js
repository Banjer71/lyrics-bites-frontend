import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/DisplayAllSongs">
          <li>My List</li>
        </Link>
        <li>SignUp</li>
        <li>Login</li>
      </ul>
    </div>
  );
};

export default Navbar;
