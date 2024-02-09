// Navbar.js
import React from "react";
import Cookies from "js-cookie";
import "../components/css/navbar.css";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    Cookies.remove("token");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          URL Shortener
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <div className="nav-link" onClick={handleSignOut}>
              Sign Out
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
