import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav-container">
      <NavLink
        exact
        to="/"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'white' }}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/assets"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'white' }}
      >
        Assets
      </NavLink>
      <NavLink
        to="/auth"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'white' }}
      >
        Authenticators
      </NavLink>
    </div>
  );
};

export default Nav;
