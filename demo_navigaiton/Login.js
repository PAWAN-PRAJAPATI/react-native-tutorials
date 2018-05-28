/**
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Flat from './Flat.js';

export default class Inputs extends Component {


  state= {
    validate:false,

    user:'',
    pass:'',

    users:'gray',
    passs:'gray',
    tests:'gray'
  }

  validatePass = (pass,cpass)=>{
    if(pass==''){
      return false;
    }
    return true;
  }

  validateUser = (user)=>{
    if(user==''){
      return false
    }
    else{
      return true
    }
  }

  test2=()=>
  {
      setTimeout(function(){
          alert('Successfully Registered');
      }, 100);
      this.props.navigator.pop()

  }

  validate=()=>{
    if(this.state.users=='gray' && this.state.passs=='gray'){
      this.state.validate=true
      return true
    }
    else{
      this.state.validate=false
      return false
    }
  }
  goToHome=()=>{
    this.props.navigator.pop()
  }
  submit =()=>{
      var pass = this.validatePass(this.state.pass,this.state.cpass)
      var user = this.validateUser(this.state.user)
      if(user)[
        this.setState({users:"gray"})
      ]
      else{
        this.setState({users:"red"})
      }

      if(pass==false){
        this.state.passs='red'
      }
      else{
        this.state.passs='gray'
      }

      const nav = this.props.navigator

      if(this.validate()==true){
        this.state.tests=this.validate()
        //const naviga = this.prop.navigator
        let nextIndex = ++this.props.index;
        this.props.navigator.push({
          component: Flat,
          rightButtonTitle:"Logout",
           leftButtonTitle: ' ',
          title: 'The Jungle Book',
          passProps: {index: nextIndex,name:this.state.user.toString()},
          onRightButtonPress: function(){
            nav.popToTop()
          }
        });

        this.state.user=''
        this.state.pass=''
      }


  }

  render() {
    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.main}
      scrollEnabled={true}>

        <TextInput
        style={[styles.inputs,{marginTop:90, borderColor: this.state.users.toString()}]}
        secureTextEntry={false}
        placeholder="Username"
        keyboardType="default"
        onChangeText={(text) => this.setState({user:text})}
        value={this.state.user}
        returnKeyType='next'
        />

        <TextInput
        style={[styles.inputs,{borderColor: this.state.passs.toString()}]}
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="default"
        onChangeText={(text) => this.setState({pass:text})}
        value={this.state.pass}
        returnKeyType='next'/>
        <TouchableOpacity style={styles.submit}
        onPress={
          ()=>this.submit()
        }>
        <Text style={{  color: 'white'}}>SignIn</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
        main: {
          margin:10,
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fffae8',
          padding: 10
        },

        inputs:{
          width:'100%',
          height:50,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius:10,
          padding:3,
          margin:10,
          backgroundColor: '#fff0ed'
        },
        submit:{
          marginTop:30,
          width: '100%',
          height:50,
          backgroundColor: '#fd9385',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }
});
