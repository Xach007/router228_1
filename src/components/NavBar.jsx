import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink className="nav-link" to="/" end>
        ToDo List
      </NavLink>
      <NavLink className="nav-link" to="/notebook">
        Notebook
      </NavLink>
    </nav>
  );
};

export default NavBar;
