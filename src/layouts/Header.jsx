import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <a href="/">Logo</a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
