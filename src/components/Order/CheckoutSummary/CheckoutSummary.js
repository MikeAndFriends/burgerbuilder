import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  let checkoutSummary = <><h3>Your burger: We hope it will taste fucking good!</h3>
    <div className={classes.Tinyburger}>
      <Burger ingredients={props.ingredients} />
    </div>
  <div>
    <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
  </div>
  <Button
    btnType={['Danger']}
    clicked={props.checkoutCancelled}>CANCEL</Button>
  <Button
    btnType={['Success']}
    clicked={props.checkoutContinued}>CONTINUE TO CHECKOUT</Button>
  </>

  if (props.ingredients == null || !Object.values(props.ingredients).some(amount => amount > 0)) {
    checkoutSummary = <div><h3>Your cart is empty. <br />Please add ingredients...</h3></div>;
  }

  return (
    <div className={classes.CheckoutSummary}>
      {checkoutSummary}
    </div>
  );
};

export default CheckoutSummary;
