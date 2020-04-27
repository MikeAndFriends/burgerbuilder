import React from 'react';
import classes from './BurgerControl.module.css';
import PropTypes from 'prop-types';

const burgerControl = (props) => {
  return (
    <>
      <div className={classes.BuildControl}>
        <div className={classes.Label} style={{textTransform: 'capitalize'}}>
          {props.type}
        </div>
        <input
          onChange={props.changed}
          id={props.type} value={props.no} />
        <button
          className={classes.More}
          onClick={props.plus} id={props.type}>+</button>
        <button
          className={classes.Less}
          onClick={props.minus}
          id={props.type}
          disabled={props.no <=0 ? true : false}>-</button>
      </div>
    </>
  );
}

burgerControl.propTypes = {
  type: PropTypes.oneOf([
    'bread-bottom',
    'bread-top',
    'meat',
    'cheese',
    'salad',
    'bacon']),
  no: PropTypes.number.isRequired,
  plus: PropTypes.func,
  minus: PropTypes.func,
};

export default burgerControl;
