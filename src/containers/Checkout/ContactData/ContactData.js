import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderFormOrder: [],
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
          autoFocus: true,
        },
        value: '',
        validation: {
          required: true
        },
        errorMessage: 'Please state your name, first and surename',
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required:true
        },
        errorMessage: 'Please state your street address',
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required:true,
          minLength: 5,
          maxLength: 5
        },
        errorMessage: 'Please state your zip code, 5 letters or numbers',
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        value: '',
        validation: {
          required:true
        },
        errorMessage: 'Please state name of your city',
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required:true
        },
        errorMessage: 'Please state your country',
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required:true,
          emailRegExp: true,
        },
        errorMessage: 'Please state your e-mail address test@test.com',
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
        ]},
        value: 'fastest',
        validation: {},
        valid: true,
      }
    },
    formIsValid: false,
  }

  componentDidMount() {
    const orderFormOrder = [];
    for (let key in this.state.orderForm) {
        orderFormOrder.push(key);
    };
    this.setState({orderFormOrder: orderFormOrder});

    this.fetchUserEmail();
  }

  fetchUserEmail = () => {
    if (this.props.isAuthenticated) {
      if (this.props.userData && this.props.userData.email) {
        const orderForm = {...this.state.orderForm};
        const orderFormElement = {...orderForm['email']}
        orderFormElement.value = this.props.userData.email;
        orderFormElement.touched = true;
        orderFormElement.valid = true;
        orderForm['email'] = orderFormElement;

        this.setState({
          orderForm: orderForm,
        });
      }
    }
  }

  updateInputValue(formElement, event) {
    const orderFormElement = updateObject(this.state.orderForm[formElement], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[formElement].validation),
      touched: true,
    });
    const orderForm = updateObject(this.state.orderForm, {
        [formElement]: orderFormElement,
    });

    const formIsValid = Object.values(orderForm).every(input => input.valid);

    this.setState({
      orderForm: orderForm,
      formIsValid: formIsValid
    });
  }

  orderHandler = (event) => {
    event.preventDefault();

    let orderDetails = {};
    orderDetails = Object.assign({},
      ...Object.keys(this.state.orderForm).map(formElement => {
        return {[formElement]: this.state.orderForm[formElement].value}
      }));

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderDetails: orderDetails,
      userId: this.props.userData.userId,
    }


    this.props.onOrderBurger(order, this.props.token);
  }

  render () {
    if (this.props.ingredients == null || !Object.values(this.props.ingredients).some(amount => amount > 0))
      return (<></>);

    let orderForm = this.state.orderFormOrder.map((formElement, i) => {

        return <Input
          value={this.state.orderForm[formElement].value}
          invalid={!this.state.orderForm[formElement].valid}
          errorMessage={this.state.orderForm[formElement].errorMessage}
          shouldValidate={this.state.orderForm[formElement].validation}
          touched={this.state.orderForm[formElement].touched}
          onChange={(event) => this.updateInputValue(formElement, event)}
          key={formElement}
          name={formElement}
          inputtype={this.state.orderForm[formElement].elementType}
          elementconfig={this.state.orderForm[formElement].elementConfig}
        />;
    });

    let form = <>
        <h4>Enter your fucking contacts!</h4>
        <form onSubmit={this.orderHandler}>
          {orderForm}
          <Button
            btnType={['Success']} disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </>;
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.bbr.ingredients,
    price: state.bbr.price,
    loading: state.or.loading,
    token: state.auth.token,
    userData: state.auth.userData,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) => (dispatch(actionCreators.purchaseBurger({order: order, token: token}))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
