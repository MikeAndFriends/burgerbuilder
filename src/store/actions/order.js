import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Asyc sending order to db
export const purchaseBurger = (payload) => {

  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + payload.token, payload.order)
      .then(response => {
        dispatch(purchaseBurgerSuccess({orderId: response.data.name, order: payload.order}));
        setTimeout(() => {
          dispatch(resetOrderReceived());
        }, 3000);
      })
      .catch(error => {
        dispatch(purchaseBurgerFail({error}));
      });
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
};

export const purchaseBurgerSuccess = (payload) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: payload.orderId,
    order: payload.order
  }
};

export const resetOrderReceived = () => {
  return {
    type: actionTypes.RESET_ORDER_RECEIVED,
  }
};

export const purchaseBurgerFail = (payload) => {
  return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: payload.error
  }
};

export const getOrders = (payload) => {
  return dispatch => {
    dispatch(getOrdersStart());
    const queryParams = '?auth=' + payload.token
      + '&orderBy="userId"'
      + '&equalTo="' + payload.userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(response => {
        let orders = null;
        if (response.data == null) {
          orders = [];
        } else {
          orders = Object.entries(response.data).map((array, id, order) => {
            return {id: array[0], order: array[1]}
          });
        }
        dispatch(getOrdersSuccess(orders));
    })
    .catch(error => {
      dispatch(getOrdersFail(error));
    });
  }
};

export const getOrdersFail = (error) => {
  return {
      type: actionTypes.GET_ORDERS_FAIL,
      error: error,
  }
};

export const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START
  }
};

// If orders successfully fetched from db, then set state...
export const getOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    payload: {orders: orders}
  }
};

export const isInTheOrderProcess = (truefalse) => {
  return {
    type: actionTypes.SET_IS_IN_THE_ORDER_PROCESS,
    truefalse: truefalse
  }
};
