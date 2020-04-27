import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};
const INITIAL_PRICE = 4;

const initialState = {
  ingredients: null,
  ingredientsOrder: ['salad', 'bacon', 'cheese', 'meat'],
  price: INITIAL_PRICE,
  error: false,
}

const sumBurgerPrice = (ingredients) => {
  let price = INITIAL_PRICE;
  Object.keys(ingredients).map((ingredient, key) => {
    price = price + INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
    return null;
  });
  return price;
}

const addIngredient = (state, action) => {

  const updatedIngredientA = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1 };
  const updatedIngredientsA = updateObject(state.ingredients, updatedIngredientA);
  const updatedStateA = {
    ingredients: updatedIngredientsA,
    price: state.price + INGREDIENT_PRICES[action.payload.ingredient]
  };
  return updateObject(state, updatedStateA);
};

const removeIngredient = (state, action) => {

  const updatedIngredientR = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] > 0 ? state.ingredients[action.payload.ingredient] - 1 : 0 };
  const updatedIngredientsR = updateObject(state.ingredients, updatedIngredientR);
  const updatedStateR = {
    ingredients: updatedIngredientsR,
    price: state.price - INGREDIENT_PRICES[action.payload.ingredient]
  };
  return updateObject(state, updatedStateR);
};

const setIngredientAmount = (state, action) => {

  let newAmount = parseInt(action.payload.amount, 10);
  if(isNaN(newAmount)) newAmount = 0;
  newAmount = (newAmount < 1) ? 0 : newAmount;

  const updatedIngredientS = { [action.payload.ingredient]: newAmount };
  const updatedIngredientsS = updateObject(state.ingredients, updatedIngredientS);
  const updatedStateS = {
    ingredients: updatedIngredientsS,
    price: sumBurgerPrice(updatedIngredientsS)
  };
  return updateObject(state, updatedStateS);
};

const getIngredientsSuccess = (state, action) => {
  return updateObject(state, {
    ingredients: { // Manually set order of ingredients
          salad: action.payload.ingredients.salad,
          bacon: action.payload.ingredients.bacon,
          cheese: action.payload.ingredients.cheese,
          meat: action.payload.ingredients.meat,
      },
    price: sumBurgerPrice(action.payload.ingredients),
    burgerError: false
  });
};

// Reducer
const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENT_AMOUNT: return setIngredientAmount(state, action);
    case actionTypes.GET_INGREDIENTS_SUCCESS: return getIngredientsSuccess(state, action);
    case actionTypes.GET_INGREDIENTS_FAIL: return updateObject(state, {error: true});
    default: return state;
  }
}

export default burgerBuilderReducer;
