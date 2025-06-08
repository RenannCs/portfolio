"use client";

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrolledDown = window.scrollY > 0; 
      setIsPageScrolled(scrolledDown);
    };

    checkScrollPosition();  

    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={`header${isPageScrolled ? " header--scrolled" : ""}${menuOpen ? " header--open" : ""}`}>
      <div className="header__overlay" onClick={() => setMenuOpen(false)}></div>
      <div className="header__container center">
        <h1 className="header__title">Renan Cordeiro</h1>
        <div className="header__nav-wrapper">
          <button className="header__close-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(false)}>&times;</button>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item"><a href="/">Home</a></li>
              <li className="header__nav-item"><a href="/projects">Projects</a></li>
              <li className="header__nav-item"><a href="/about">About</a></li>
              <li className="header__nav-item"><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
        <button className="header__menu-button" aria-label="Close menu" onClick={toggleMenu}>
          <span className="header__menu-button-line"></span>
          <span className="header__menu-button-line"></span>
          <span className="header__menu-button-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
