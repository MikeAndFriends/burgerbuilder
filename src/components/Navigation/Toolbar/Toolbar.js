import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../../hoc/Layout/Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>
      <DrawerToggler clickToShowSideDrawer={props.clickToShowSideDrawer} />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;
