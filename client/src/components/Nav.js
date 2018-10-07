import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav-container">
      <NavLink
        exact
        to="/"
        id="brand"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'none' }}
      >
        BC/AD
      </NavLink>
      <NavLink
        exact
        to="/register"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'white' }}
      >
        Register
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
        to="/authenticators"
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
