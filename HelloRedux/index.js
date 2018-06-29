
import AppContainer from './containers/Helloworld'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import React from 'react'
import { createStore,compose,applyMiddleware } from 'redux'
import {AppRegistry} from 'react-native'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger({});
//keep in mind the compose
const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);


const store = createStore(rootReducer,{},enhancer)

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('HelloWorld1', () => App);
