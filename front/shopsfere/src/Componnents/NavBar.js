import React from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import '../App.css'; // Import the CSS file
import logo from '../logo.webp';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="searchContainer">
        <input type="text" placeholder="Rechercher" className="searchInput" />
        <button className="searchButton">
          <FaSearch />
        </button>
      </div>

      <div className="logoContainer">
        <img src={logo} alt="" className="logo" />
      </div>

      <div className="cartContainer">
        <FaShoppingCart className="cartIcon" />
      </div>

      <div className="profileContainer">
        <FaUser className="profileIcon" />
      </div>
    </nav>
  );
};

export default Navbar;
