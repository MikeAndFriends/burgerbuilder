import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import PurchaseBurgerSuccessMessage from '../../components/Order/PurchaseSuccessMessage';

export class BurgerBuilder extends Component {
  state = {
      purchasing: false, /* ORDER NOW button clicked*/
      loading: false,
  }

  componentDidMount () {
    if (this.props.ingredients == null) {
      this.props.onInitIngredients();
    }
    if (this.props.purchaseBurgerSuccess) {
      this.props.onInitIngredients();
    }

  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState((prevState, props) => {
        return  {
          purchasing: !prevState.purchasing,
        }
      });
    } else {
      this.props.onSetIsInTheOrderProcess(true);
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  }

  purchaseContinueHandler = () => {
    if (this.props.isAuthenticated) {
      this.props.onSetIsInTheOrderProcess(true);
      this.props.history.push('/checkout');
    } else {
      this.props.onSetIsInTheOrderProcess(true);
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  }

  confirmPuchaseSuccessMessage = () => {
    this.props.onConfirmPuchaseSuccessMessage();
  }


  render () {

    let orderSummary = <OrderSummary
                clickedCancel={this.purchaseHandler}
                clickedContinue={this.purchaseContinueHandler} />;

    let burgerAndControls = <>
      <Burger
        ingredients={this.props.ingredients} />
      <BurgerControls
        ingredientsOrder={this.props.ingredientsOrder}
        ingredients={this.props.ingredients}
        changed={this.props.onSetIngredientAmount}
        plus={this.props.onAddIngredient}
        minus={this.props.onRemoveIngredient}
        price={this.props.price}
        order={this.purchaseHandler}
        isAuthenticated={this.props.isAuthenticated} />;
    </>
  if (this.props.ingredients == null) {
      burgerAndControls = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        <PurchaseBurgerSuccessMessage
          show={this.props.purchaseBurgerSuccess}
          confirmed={this.confirmPuchaseSuccessMessage} />
        {burgerAndControls}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.bbr.ingredients,
    ingredientsOrder: state.bbr.ingredientsOrder,
    price: state.bbr.price,
    purchaseBurgerSuccess: state.or.purchaseBurgerSuccess,
    error: state.bbr.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient:      (ingredient)         => (dispatch(actionCreators.addIngredient({ingredient: ingredient}))),
    onRemoveIngredient:   (ingredient)         => (dispatch(actionCreators.removeIngredient({ingredient: ingredient}))),
    onSetIngredientAmount:(ingredient, amount) => (dispatch(actionCreators.setIngredientAmount({ingredient: ingredient, amount: amount}))),
    onInitIngredients:    ()                   => (dispatch(actionCreators.initIngredients())),
    onConfirmPuchaseSuccessMessage: ()         => (dispatch(actionCreators.resetOrderReceived())),
    onSetIsInTheOrderProcess:  (truefalse)     => (dispatch(actionCreators.isInTheOrderProcess(truefalse))),
    onSetAuthRedirectPath:     (path)          => (dispatch(actionCreators.setAuthRedirectPath(path))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
