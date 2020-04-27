import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';
// Manually inject match props for routing in a component

const burger = (props) => {
  const transIngredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array( props.ingredients[ingredient] )].map( ( _, i ) => {
                  return <BurgerIngredient key={ingredient + i} type={ingredient} />;
              } );
          } )
          .reduce((arr, el) => {
              return arr.concat(el)
          }, []);

  return <div className={classes.Burger}>
  <BurgerIngredient type='bread-top' />
    {transIngredients.length === 0 ? 'Please add ingredients...' : transIngredients}
  <BurgerIngredient type='bread-bottom' />
  </div>
}

export default burger;
