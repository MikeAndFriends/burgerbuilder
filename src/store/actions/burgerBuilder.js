import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: payload
  }
};

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: payload
  }
};

export const setIngredientAmount = (payload) => {
  return {
    type: actionTypes.SET_INGREDIENT_AMOUNT,
    payload: payload
  }
};

// Asyc fetching of ingredients from db
export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(getIngredientsSuccess(response.data));
    })
    .catch(error => {
      dispatch(getIngredientsFail());
    });
  };
};

export const getIngredientsFail = () => {
  return {
      type: actionTypes.GET_INGREDIENTS_FAIL
  }
};

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.GET_INGREDIENTS_SUCCESS,
    payload: {ingredients: ingredients}
  }
};
