import * as types from './types'
import Api from '../lib/api';

export function myAction1(){
    console.log('myactions - myAction1');
    return {
        type: types.ACTION1
    }
}

export function myAction2(){
    console.log('myactions - myAction2');
    return {
        type: types.ACTION2
    }
}

export function myAction3(){
    console.log('myactions - myAction3');
    return {
        type: types.ACTION3
    }
}

export function selectItem(item){
    console.log('myactions - selectItem');
    return {
        type: types.SELECTITEM,
        item: item
    }
}

export function getList(){
    console.log('myactions - getList');
    return (dispatch, getState) => {
        //console.log(getState);
        return Api.get('breeds/list/all',{}).then(json => {

            //Parse response
            console.log('response received');
            console.log(json);
            const arr = Object.keys(json.message).map( (key) => { return {key: key, text: key} });
            console.log(arr);
            dispatch(setList({list: arr}));
        }).catch(((ex) => {

            console.log(ex);

            dispatch(showError({error: json.message}));
        }))

    };
}

export function showError({error}){
    console.log('myactions - showError');
    return {
        type: types.SHOWERROR,
        data: error
    };
}

export function setList({list}){
    console.log('myactions - setList');
    return {
        type: types.GETLIST,
        list: list
    };

}