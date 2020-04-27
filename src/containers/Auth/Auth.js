import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    authFormOrder: [],
    authForm: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required:true,
          minLength: 6
        },
        errorMessage: 'Please state your password (minum 6 characters)',
        valid: false,
        touched: false
      },
    },
    formIsValid: true,
    isSignup: true /* false means signIN */
  }

  componentDidMount() {
    const authFormOrder = [];
    for (let key in this.state.authForm) {
        authFormOrder.push(key);
    };
    this.setState({authFormOrder: authFormOrder});
  }

  updateInputValue(formElement, event) {
    const updatedAuthForm = updateObject(this.state.authForm, {
      [formElement]: updateObject(this.state.authForm[formElement], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.authForm[formElement].validation),
        touched: true
      })
    });

    const formIsValid = true;

    this.setState({
      authForm: updatedAuthForm,
      formIsValid: formIsValid
    });
  }

  authHandler = (event) => {
    event.preventDefault();

    let authDetails = {};
    authDetails = Object.assign({},
      ...Object.keys(this.state.authForm).map(formElement => {
        return {[formElement]: this.state.authForm[formElement].value}
      }));

    this.props.onAuth(authDetails, this.state.isSignup);
  }

  switchFormHandler = (event) => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  }

  render () {

    let authForm = this.state.authFormOrder.map((formElement, i) => {

        return <Input
          value={this.state.authForm[formElement].value}
          invalid={!this.state.authForm[formElement].valid}
          errorMessage={this.state.authForm[formElement].errorMessage}
          shouldValidate={this.state.authForm[formElement].validation}
          touched={this.state.authForm[formElement].touched}
          onChange={(event) => this.updateInputValue(formElement, event)}
          key={formElement}
          name={formElement}
          inputtype={this.state.authForm[formElement].elementType}
          elementconfig={this.state.authForm[formElement].elementConfig}
        />;
    });

    let formType = {
      title: 'New user? Enter credentials to sign up!',
      buttonText: 'Signup',
      switchText: 'Already an account? Switch to LOGIN'
    };
    if (!this.state.isSignup)
      formType = {
        title: 'Old friends? Enter credentials to login!',
        buttonText: 'Login',
        switchText: 'No account? Switch to SIGNUP'
      };

    let form = <>
        <h4>{formType.title}</h4>
        <form onSubmit={this.authHandler}>
          {authForm}
          <Button
            btnType={['Success']} disabled={!this.state.formIsValid}>{formType.buttonText}</Button>
        </form>
          <Button
            clicked={this.switchFormHandler}
            btnType={['Danger']} disabled={false}>{formType.switchText}</Button>
      </>;
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <div className={classes.ErrorMessage}>
          {this.props.error}
        </div>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isInTheOrderProcess: state.or.isInTheOrderProcess,
    authRedirectPath: state.auth.authRedirectPath,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (loginData, isSignup) => (dispatch(actionCreators.auth({loginData: loginData, isSignup: isSignup}))),
    onLogout: ()                  => (dispatch(actionCreators.logout())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
