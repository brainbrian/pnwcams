import React from "react";
import { Link } from "gatsby";

import "../styles/components/Header.scss";

const Header = () => (
  <header className="header">
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link
            to="/surf"
            className="header__nav-btn"
            activeClassName="header__nav-btn--active"
          >
            <span className="h1">Surf Cams</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            to="/snow"
            className="header__nav-btn"
            activeClassName="header__nav-btn--active"
          >
            <span className="h1">Snow Cams</span>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
