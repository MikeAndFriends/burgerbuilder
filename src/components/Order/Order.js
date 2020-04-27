import React from 'react';
import classes from './Order.module.css';



const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients:{Object.keys(props.ingredients).map((ingredient) => (
        <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            borderRadius: '4px',
            padding: '2px 5px',
            margin: '0 2px',
            border: '1px solid #ccc'
        }} key={ingredient}>{ingredient} ({props.ingredients[ingredient]})</span>
      ))}
    </p>
    <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
  </div>
);

export default order;
