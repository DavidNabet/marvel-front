import React from "react";
import logo from "../assets/marvel-logo.svg";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setSearchName }) => {
  const { location } = useLocation();
  console.log(location);
  return (
    <header>
      <div className="container header">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <nav className="menu_container">
          <ul>
            <Link to="/" className={location === "/" ? "active" : ""}>
              <li>personnages</li>
            </Link>
            <Link
              to="/comics"
              className={location === "/comics" ? "active" : ""}
            >
              <li>comics</li>
            </Link>
            <Link
              to="/bookmark"
              className={location === "/bookmark" ? "active" : ""}
            >
              <li>favoris</li>
            </Link>
          </ul>
        </nav>
        <div className="connect_container">
          <Link to="/signup">
            <button className="signup">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button className="login">Se connecter</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
