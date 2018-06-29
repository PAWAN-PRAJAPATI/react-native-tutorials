import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const myreducer1 = createReducer({}, {
    [types.ACTION1](state, action) {
        let newState = {text:'newState-myreducer1-2'}
        return newState;
      },
      [types.ACTION2](state, action) {
        let newState = {text:'newState-myreducer1-2'}
        return newState;
      },
});
  
export const myreducer2 = createReducer({}, {
[types.ACTION2](state, action) {
    let newState = {text:'newState-myreducer2'}
    return newState;
},
});
  
export const myreducer3 = createReducer({}, {
    [types.ACTION3](state, action) {
        let newState = {text:'newState-myreducer3'}
        return newState;
    },
});  

export const mylist = createReducer({}, {
    [types.GETLIST](state, action) {
        return action.list;
    },
});
  

export const myitem = createReducer({}, {
    [types.SELECTITEM](state, action) {
        return action.item;
    },
});
            