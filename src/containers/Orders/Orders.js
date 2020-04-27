import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';


class Orders extends Component {
  componentDidMount() {
    this.props.onGetOrders(this.props.token, this.props.userId);
  }

  render () {
    let ordersOutput = null;
    if (this.props.loading) {
      ordersOutput = <div style={{padding: '1px'}}><Spinner /></div>;
    }
    if (!this.props.loading && this.props.orders.length === 0) {
      ordersOutput = <div><center><h3>No orders found!</h3></center></div>;
  }
  if (!this.props.loading && this.props.orders.length > 0) {
      ordersOutput = this.props.orders.map((object, key, value) => {
        return <Order
          key={value[key].id}
          ingredients={value[key].order.ingredients}
          price={value[key].order.price} />
      });
    }

    return (
      <div>
        {ordersOutput}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    orders: state.or.orders,
    loading: state.or.loading,
    token: state.auth.token,
    userId: state.auth.userData.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: (token, userId) => (dispatch(actionCreators.getOrders({token: token, userId: userId}))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
