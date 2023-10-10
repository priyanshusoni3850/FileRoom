// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Your Logo" />
          <span>FileRoom</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
