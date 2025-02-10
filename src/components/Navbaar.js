import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbaar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li>
          <Link to="/" className="navLink">
            Home
          </Link>
        </li>
        <li>
          <Link to="/output" className="navLink">
            Output
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
