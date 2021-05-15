import React from "react";
import logo from "../assets/marvel-logo.svg";
import { Link, useLocation } from "react-router-dom";

const Header = ({
  handleSearchPerso,
  handleSearchComic,
  tokenUser,
  setUserToken,
}) => {
  const location = useLocation();
  return (
    <header>
      <div className="container header">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        {tokenUser ? (
          <nav className="menu_container">
            <ul>
              <Link to="/">
                <li className={location.pathname === "/" ? "active" : ""}>
                  personnages
                </li>
              </Link>
              <Link to="/comics">
                <li className={location.pathname === "/comics" ? "active" : ""}>
                  comics
                </li>
              </Link>
              <Link to="/bookmark">
                <li
                  className={location.pathname === "/bookmark" ? "active" : ""}
                >
                  favoris
                </li>
              </Link>
            </ul>
          </nav>
        ) : null}
        {location.pathname === "/comics" ? (
          <form className="search_container">
            <input
              type="text"
              onChange={handleSearchComic}
              placeholder="Chercher un comic"
            />
          </form>
        ) : location.pathname === "/" ? (
          <form className="search_container">
            <input
              type="text"
              onChange={handleSearchPerso}
              placeholder="Chercher un personnage"
            />
          </form>
        ) : null}
        <div className="connect_container">
          {tokenUser ? (
            <>
              <span>
                {tokenUser.username.charAt(0).toUpperCase() +
                  tokenUser.username.slice(1)}
              </span>
              <button onClick={() => setUserToken(null)} className="disconnect">
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="signup">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login">Se connecter</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
