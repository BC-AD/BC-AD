import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav-container">
      <div
        id='brand'
        className='navlink'>BC/AD</div>
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
      {/*<NavLink
        to="/authenticators"
        className="navlink"
        style={{ textDecoration: 'none' }}
        activeStyle={{ textDecoration: 'none', color: 'white' }}
      >
        Authenticators
      </NavLink>*/}
    </div>
  );
};

export default Nav;
