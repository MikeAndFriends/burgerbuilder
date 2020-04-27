import React from 'react';
import Logo from '../../../hoc/Layout/Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <Backdrop
        show={props.show}
        clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed} >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
