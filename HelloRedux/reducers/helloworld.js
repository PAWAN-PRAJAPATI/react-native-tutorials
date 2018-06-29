export const  helloWorld_reducer = (state={}, action) => {
   console.log(state)

    if(action.type=='HELLO_WORLD'){
      console.log("helloWorld_reducer")
        return (
            {
              log: action.log,
            }
          )
    }
    else{
      return state
    }
}

export const  helloWorld_reducer_1 = (state={}, action) => {
  console.log(action.log_1)

   if(action.type=='HELLO_WORLD_1'){
     console.log("helloWorld_reducer_1")
       return (
           {
             log_1: action.log_1,
           }
          )
   }
   else{
     return state
   }
}

/*
export const myreducer2 = createReducer({}, {
[types.ACTION2](state, action) {
    let newState = {text:'newState-myreducer2'}
    return newState;
},
});
*/