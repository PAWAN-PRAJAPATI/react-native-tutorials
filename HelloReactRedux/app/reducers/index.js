import { combineReducers } from 'redux';
import * as myreducers from './myreducers'

export default combineReducers(Object.assign(
    myreducers
));
