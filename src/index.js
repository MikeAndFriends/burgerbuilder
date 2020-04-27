import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

//Redux and thunk
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// Lazy loading
import { Suspense } from 'react';
import Spinner from './components/UI/Spinner/Spinner';

const rootReducer = combineReducers({
  bbr: burgerBuilderReducer,
  or: orderReducer,
  auth: authReducer
});

// Only use devtools if in development mode...
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {


  // Redux DevTools Extension
  // Advanced store setup
  composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
}

// Thunk enables the async middelware (eg. fetching data from db)
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <HashRouter basename={'/demo/burger'}>
        <App />
      </HashRouter>
  </Suspense>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
