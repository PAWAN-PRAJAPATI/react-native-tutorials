
import styles from './style.js';

import React, { Component } from 'react';
import {
 Platform,
 StyleSheet,
 Text,Alert,
 View,Button,TextInput,TouchableOpacity,NavigatorIOS,FlatList,TouchableHighlight
} from 'react-native';
import Quote from './Swipe.js'
import Swipeout from 'react-native-swipeout';


import AddContacts from './AddContacts.js'
import SQLite from 'react-native-sqlite-storage';

export default class NavigatorIOSApp extends React.Component {
  state= {
    validate:false,

    user:this.props.item.name,
    email:this.props.item.email,
    numd:this.props.item.number,


    users:'gray',
    emails:'gray',
    numds:'gray',
    passs:'gray',
    tests:'gray',

  }


  constructor(props, context) {
    super(props, context);
    //this._onForward = this._onForward.bind(this);
  }

  _edit=()=>{
    //this.props.navigator.pop()
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successCB, this.errorCB);
    db.transaction((tx) => {

      tx.executeSql("UPDATE Contacts SET email="+"'"+this.state.email+"' WHERE name='"+this.props.item.name +"'");
      tx.executeSql("UPDATE Contacts SET number="+"'"+this.state.numd+"' WHERE name='"+this.props.item.name +"'");

      console.log("Hello")

                      console.log(this.props.item.name)

      });
      this.props.route.callback()
      this.props.navigator.pop()
  }
  render() {
    return (
      <View style={styles.inputBox}>

        <View style={{marginTop: 55,justifyContent: 'center',justifyContent:'center',marginBottom: 30}} >
            <Text style={{fontSize: 30,color:'#fd6f54'}}>
            {this.props.item.name}
            </Text>
        </View>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.users.toString(),height:'50%'}]}
        secureTextEntry={false}
        placeholder="Note"
        keyboardType="default"
        multiline = {true}
        numberOfLines = {4}
        value = {this.props.item.email}
        onChangeText={(text) => this.setState({email:text})}/>

        <TextInput
        style={[styles.inputs,{borderColor: this.state.emails.toString(),height:'30%'}]}
        secureTextEntry={false}
        placeholder="Comment"
        keyboardType="default"
        multiline = {true}
        numberOfLines = {4}
        value = {this.props.item.number}
        onChangeText={(text) => this.setState({numd:text})}/>

            <View style={{alignItems: 'center',width: '100%'}}>
            <TouchableOpacity style={[styles.submit,{width:'100%'}]}
            onPress={this._edit}>
            <Text style={{ color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
      </View>
      )
    }
}
