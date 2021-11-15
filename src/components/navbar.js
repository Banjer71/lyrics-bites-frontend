import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const { authState } = auth;
  return (
    <div>
      <ul className="navbar">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/DisplayAllSongs">
          <li>My List</li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/displayAllSongs" : "/signup"}>
          <li>
            {authState.userInfo.firstName
              ? authState.userInfo.firstName
              : "Signup"}
          </li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/displayAllSongs" : "/login"}>
          <li>{authState.userInfo.firstName ? "Logout" : "Login"}</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
