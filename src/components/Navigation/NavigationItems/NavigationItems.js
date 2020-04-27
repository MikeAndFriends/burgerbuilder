import React from 'react';
import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navItems = (props) => (
  <ul className={classes.NavigationItems}>
      <NavItem exact link='/'>BurgerBuilder</NavItem>
      {props.isAuthenticated
        ? <NavItem link='/checkout'>Checkout</NavItem>
        : null }
      {props.isAuthenticated
        ? <NavItem link='/orders'>Orders</NavItem>
        : null}
      {props.isAuthenticated
        ? <NavItem link='/logout'>Logout</NavItem>
        : <NavItem link='/login'>Login</NavItem>}

  </ul>
);

export default navItems;
