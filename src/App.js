import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

// Lazy loading
import { lazy } from 'react';
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  state = {
    show: true
  }


  componentDidMount () {
    this.props.onAuthCheckIfLoggedIn();
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
          {/* <Route render={() => <h1>404 Not found :-(</h1>} /> */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
            {/* <Route render={() => <h1>404 Not found :-(</h1>} /> */}
        </Switch>
      );
    }


    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckIfLoggedIn: () => (dispatch(actionCreators.authCheckIfLoggedIn())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
