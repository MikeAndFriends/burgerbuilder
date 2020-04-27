import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';

class OrderSummary extends Component {

  componentWillUpdate() {
  }

  render() {
    if (this.props.ingredients == null) return (
      <>
        <h3>No ingredients found!</h3>
      </>
    );

    const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient) => {
      return (
        <li key={ingredient}>
          <span style={{textTransform: 'capitalize'}}>
            {ingredient}:
          </span> {this.props.ingredients[ingredient]}
        </li>);
    });

    return (
      <>
        <h3>Your Order:</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
          <Button btnType={['Danger']} clicked={this.props.clickedCancel}>CANCEL</Button>
          <Button btnType={['Success']} clicked={this.props.clickedContinue}>CONTINUE</Button>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    ingredients: state.bbr.ingredients,
    price: state.bbr.price
  };
}

export default connect(mapStateToProps)(OrderSummary);
