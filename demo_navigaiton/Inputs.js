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
    email:'',
    numd:'',
    pass:'',
    cpass:'',

    users:'gray',
    emails:'gray',
    numds:'gray',
    passs:'gray',
    tests:'gray'
  }

  validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  validatePass = (pass,cpass)=>{
    if(pass!=cpass || pass==''){
      return false;
    }
    return true;
  }

  validateMobile = (mobile)=>{
    if(mobile.length==10){
      return true
    }
    else{
      return false
    }
  }

  validateUser = (user)=>{
    if(user==''){
      return false
    }
    else{
      return true
    }
  }

  success=()=>
  {
      setTimeout(function(){
          alert('Successfully Registered');
      }, 100);
      this.props.navigator.popToTop()
  }

  validate=()=>{
    if(this.state.users=='gray' && this.state.emails=='gray' && this.state.numds=='gray' && this.state.passs=='gray'){
      this.state.validate=true
      return true
    }
    else{
      this.state.validate=false
      return false
    }
  }
  submit =()=>{
      var email = this.validateEmail(this.state.email)
      var pass = this.validatePass(this.state.pass,this.state.cpass)
      var mobile = this.validateMobile(this.state.numd)
      var user = this.validateUser(this.state.user)
      if(user)[
        this.setState({users:"gray"})
      ]
      else{
        this.setState({users:"red"})
      }
      if(email==false){
        this.state.emails='red'
      }
      else{
        this.state.emails='gray'
      }

      if(pass==false){
        this.state.passs='red'
      }
      else{
        this.state.passs='gray'
      }

      if(mobile==false){
        this.state.numds='red'
      }
      else{
        this.state.numds='gray'
      }

      if(this.validate()==true){
        this.state.tests=this.validate()

        this.state.user=''
        this.state.email=''
        this.state.pass=''
        this.state.cpass=''
        this.state.numd=''
        this.success()


      }


      this.setState({test:user.toString()});
  }

  render() {
    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.main}
      scrollEnabled={true}>
        <View style={{justifyContent: 'center',justifyContent:'center',marginBottom: 30}} >
            <Text style={{fontSize: 30,color:'#fd6f54'}}>
            Registration
            </Text>
        </View>
        <TextInput
        style={[styles.inputs,{borderColor: this.state.users.toString()}]}
        secureTextEntry={false}
        placeholder="Username"
        keyboardType="default"
        onChangeText={(text) => this.setState({user:text})}
        value={this.state.user}
        returnKeyType='next'
        />

        <TextInput
        style={[styles.inputs,{borderColor: this.state.emails.toString()}]}
        secureTextEntry={false}
        placeholder="Email"
        keyboardType="default"
        onChangeText={(text) => this.setState({email:text})}
        value={this.state.email}
        returnKeyType='next'/>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.passs.toString()}]}
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="default"
        onChangeText={(text) => this.setState({pass:text})}
        value={this.state.pass}
        returnKeyType='next'/>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.passs.toString()}]}
        secureTextEntry={true}
        placeholder="Confirm Password"
        keyboardType="default"
        onChangeText={(text) => this.setState({cpass:text})}
        value={this.state.cpass}
        returnKeyType='next'/>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.numds.toString()}]}
        secureTextEntry={false}
        placeholder="Mobile Number"
        keyboardType="numeric"
        onChangeText={(text) => this.setState({numd:text})}
        value={this.state.numd}
        maxLength={10}
        returnKeyType='next'/>

        <TouchableOpacity style={styles.submit}
        onPress={
          ()=>this.submit()
        }>
        <Text style={{  color: 'white'}}>SignUp</Text>
        </TouchableOpacity>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
        main: {
          margin:10,
          flex: 1,
          justifyContent: 'center',
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
          marginTop: 30,
          width: '100%',
          height:50,
          backgroundColor: '#fd9385',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }
});
