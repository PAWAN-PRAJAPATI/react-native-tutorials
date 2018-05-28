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
  TouchableOpacity
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import styles from './style.js'

type Props = {};
export default class AddContacts extends Component<Props> {

  state= {
    validate:false,

    user:'',
    email:'',
    numd:'',

    users:'gray',
    emails:'gray',
    numds:'gray',
    tests:'gray',

  }


    errorCB=(err)=> {
      console.log("SQL Error: " + err);
    }

    successCB=() =>{
      console.log("SQL executed fine");
    }

    openCB=() =>{
      console.log("Database OPENED");
    }

    add=(name,email,number)=>{
      var name = this.state.user
      var email = this.state.email
      var number = this.state.numd

      var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successCB, this.errorCB);
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts('+

                        'name varchar(255),'+
                        'email varchar(255),'+
                        'number varchar(255))');

        console.log("Query completed");
        tx.executeSql("Insert into Contacts values("+"'"+name+"','"+email+"','"+number+"');")
        console.log("Query completed");

        tx.executeSql('SELECT * FROM Contacts',[], (tx, results) => {
        console.log("Query completed");

        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //console.log(row);
          //this.state.tmep.push({name:row.name,email:row.email,number:row.number})
          //this.forceUpdate()
        }
        });

      });
    }

  validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  validateMobile = (mobile)=>{
    if(mobile.length==10){
      return true
    }
    else{
      return false
    }
  }

  validateUser = (item)=>{
    if(user==''){
      return false
    }
    else{
      return true
    }
  }

  submit =()=>{
      /*
      var user = this.validateUser(this.state.user)
      var email = this.validateUser(this.state.user)
      var mobile = this.validateUser(this.state.user)

      if(user)[
        this.setState({users:"gray"})
      ]
      else{
        this.setState({users:"red"})
        this.state.validate=false
      }
      if(email==false){
        this.state.emails='red'
        this.state.validate=false
      }
      else{
        this.state.emails='gray'
      }

      if(mobile==false){
        this.state.numds='red'
        this.state.validate=false
      }
      else{
        this.state.numds='gray'
        this.state.validate=true
      }

      if(this.state.validate==true){
        this.add()
        this.state.user=''
        this.state.email=''
        this.state.numd=''
        this.props.route.callback()
        this.props.navigator.pop()
      }

      this.setState({test:user.toString()});
      */
     this.add()
     //this.props.route.callback()
     //this.props.navigator.pop()
}

  render() {
    return (


      <View style={styles.inputBox}>
        <TextInput
        style={[styles.inputs,{borderColor: this.state.users.toString()}]}
        secureTextEntry={false}
        placeholder="Title"
        keyboardType="default"
        onChangeText={(text) => this.setState({user:text})}
        value={this.state.user}
        />

        <TextInput
        style={[styles.inputs,{borderColor: this.state.emails.toString(),height:'60%'}]}
        secureTextEntry={false}
        placeholder="Note"
        keyboardType="default"
        onChangeText={(text) => this.setState({email:text})}
        multiline = {true}
        numberOfLines = {4}
        value={this.state.email}/>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.numds.toString(),height:'30%'}]}
        secureTextEntry={false}
        placeholder="Comment"
        keyboardType="default"
        onChangeText={(text) => this.setState({numd:text})}
        value={this.state.numd}
        maxLength={10}
        multiline = {true}
        numberOfLines = {4}/>

        <View style={{alignItems: 'center',width: '100%'}}>
        <TouchableOpacity style={[styles.submit,{width:'100%'}]}
        onPress={this.submit}>
        <Text style={{ color: 'white'}}>Deploy 10</Text>
        </TouchableOpacity>
      </View>
    </View>

    );
  }
}
