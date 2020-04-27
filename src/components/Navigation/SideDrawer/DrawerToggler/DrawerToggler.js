import React from 'react';
import classes from './DrawerToggler.module.css';

const drawerToggler = (props) => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clickToShowSideDrawer}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggler;
