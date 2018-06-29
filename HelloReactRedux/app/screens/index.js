import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'

import AppContainer from './AppContainer'
import Screen2 from './Screen2'

const loggerMiddleware = createLogger({});// predicate: (getStae, action) => __DEV__ 

function configureStore(initialState){
  console.log('configureStore');
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});

export function registerScreens() {

    Navigation.registerComponent('home.screen1', () => AppContainer, store, Provider);
    Navigation.registerComponent('home.screen2', () => Screen2, store, Provider);
    console.log('registerScreens');

}