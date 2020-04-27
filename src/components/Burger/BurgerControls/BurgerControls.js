import React from 'react';
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const burgerControls = (props) => {
  let burgerOutput = [];
  let numberOfIngredients = 0;

  props.ingredientsOrder.map((ingredient, key) => {
    burgerOutput.push(<BurgerControl
            key={ingredient + key}
            type={ingredient}
            no={props.ingredients[ingredient]}
            changed={(event) => props.changed(ingredient, event.target.value)}
            plus={() => props.plus(ingredient)}
            minus={() => props.minus(ingredient)} />);
            numberOfIngredients = numberOfIngredients + props.ingredients[ingredient];
            return null;
  });

  return <div className={classes.BurgerControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {burgerOutput}
    <button
      className={classes.OrderButton}
      onClick={props.order}
      disabled={numberOfIngredients <= 0}>
        {props.isAuthenticated
          ? 'ORDER NOW'
          : 'SIGNUP to ORDER'}
    </button>
  </div>

};

export default burgerControls;
