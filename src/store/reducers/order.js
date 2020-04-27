import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  error: false,
  purchaseBurgerSuccess: false,
  loading: false,
  isInTheOrderProcess: false,
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false,
    purchaseBurgerSuccess: false
  });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    id: action.orderId,
    order: {
      ...action.order
    }
  }
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchaseBurgerSuccess: true,
    isInTheOrderProcess: false,
  });
};

const puchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true,
    purchaseBurgerSuccess: false
  });
};

const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload.orders,
    error: false,
    loading: false,
  });
};

const getOrdersFail = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false
  });
};

const resetOrderReceived = (state, action) => {
  return updateObject(state, {
    purchaseBurgerSuccess: false,
    loading: false
  });
};

const isOrdering =  (state, action) => {
  return updateObject(state, {
    isInTheOrderProcess: action.truefalse,
  });
};

// Reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return puchaseBurgerFail(state, action);
    case actionTypes.GET_ORDERS_START: return updateObject(state, {loading: true});
    case actionTypes.GET_ORDERS_SUCCESS: return getOrdersSuccess(state, action);
    case actionTypes.GET_ORDERS_FAIL: return getOrdersFail(state, action);
    case actionTypes.RESET_ORDER_RECEIVED: return resetOrderReceived(state, action);
    case actionTypes.SET_IS_IN_THE_ORDER_PROCESS: return isOrdering(state, action);
    default: return state;
  }
};

export default orderReducer;
