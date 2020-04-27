import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

// Lazy loading
import { lazy } from 'react';
const CheckoutSummary = lazy(() => import('../../components/Order/CheckoutSummary/CheckoutSummary'));
const ContactData = lazy(() => import('./ContactData/ContactData'));

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      if (this.props.purchaseBurgerSuccess) {
      } else {
        summary =
          <div>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              price={this.props.price}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinuedHandler} />
            <Route
              path={this.props.match.path + '/contact-data' }
              component={ContactData} />
          </div>
      }
    }

      return (
        <>
          {summary}
        </>
      );
  }
};

const mapStateToProps = state => {
  return {
    ingredients: state.bbr.ingredients,
    price: state.bbr.price,
    purchaseBurgerSuccess: state.or.purchaseBurgerSuccess,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients:  () => (dispatch(actionCreators.initIngredients())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
