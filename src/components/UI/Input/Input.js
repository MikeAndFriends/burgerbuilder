import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  let isInvalide = false;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    isInvalide = true;
  }

  switch (props.inputtype) {
    case ('input'):
      inputElement = <input
        value={props.value}
        onChange={props.onChange}
        className={inputClasses.join(' ')}
        {...props.elementconfig} />;
      break;
    case ('select'):
      inputElement = <select
        onChange={props.onChange}
        className={inputClasses.join(' ')} >
          {props.elementconfig.options.map(option => {
            return <option key={option.value} value={option.value} >
              {option.displayValue}
            </option>
          })}
      </select>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementconfig} >
      </textarea>;
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementconfig} />;
  }

  return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {isInvalide? <div
          className={classes.ValidationError}>
            {props.errorMessage}</div> : ''}
    </div>
  );
};

export default input;
