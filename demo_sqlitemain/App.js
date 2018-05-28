/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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

import UpdateContact from './UpdateContact.js'
import AddContacts from './AddContacts.js'
import SQLite from 'react-native-sqlite-storage';

export default class NavigatorIOSApp extends React.Component {



  constructor(props, context) {
    super(props, context);
    //this._onForward = this._onForward.bind(this);
  }
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: App,
          title:'Home',
          navigationBarHidden: true,
        }}
        style={{flex: 1}}
      />
    );
  }
}


class App extends Component<Props> {


  constructor(props) {
      super(props);
      this.child = React.createRef();

      this.state = {
          temp:[{name:'pawan',email:'prajapati@gmail.com'}],
          names:[{name:'pawan',email:'prajapati@gmail.com'}],
          search:''
      }
  }

  find=(text)=>{

    // TEMP: This is more feasible alternative. It returns whole object from the array following the functions in the filter
    /*
    names = this.state.names
    var filtered item = names.filter((item)=>{
    var  v = item.name.toLowerCase().match(text)
    return v
    })
    */

    this.state.search = text
    var search = this.state.search.toString().toLocaleLowerCase()
    var names = this.state.names;
    //this.setState({temp:[]})
    this.state.temp=[]
    //this.forceUpdate()
    //.alert(search)hjf
    for (var i=0, size = names.length ; i<size ; i++){
        var item = names[i]
        var name = item.name.toString().toLowerCase()
        var check = name.includes(search)
        if(check==true){
          var l = this.state.temp
          l.push(names[i])
          this.state.temp=l
        }

    this.forceUpdate()//re-render the component
    }
    //Alert.alert(this.state.temp.length.toString())
    return
  }

  componentDidMount=()=>{
    this.callback()
  }

  callback=()=>{

    var templist = []
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successCB, this.errorCB);
    db.transaction((tx,tmeplist) => {
      tx.executeSql('SELECT * FROM Contacts',[], (tx, results) => {
      console.log("Query completed");

      var len = results.rows.length;
      //console.log(results)
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        //console.log(row);
        templist.push({name:row.name,email:row.email,number:row.number})
      }
      this.setState({names:templist})
      this.setState({temp:templist})

      //console.log(this.state.names)
      //this.forceUpdate()
      });
    });
  }

  _delete=(item)=>{
    //console.log(item)
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Contacts where name='"+item.name+"'");
                      //console.log(item.email)
                      this.callback()
      });

  }
  _edit=(item)=>{
    this.props.navigator.push({
      component: UpdateContact,
      callback:this.callback,
      passProps:{item},
    });



  }
  _add=()=>{
    this.props.navigator.push({
      component: AddContacts,
      callback:this.callback
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.searchnadd}>
          <TextInput
          style={[styles.inputs,{width:'70%'}]}
          secureTextEntry={false}
          placeholder="Username"
          keyboardType="default"
          onChangeText={this.find}
          auto-capitalization={false}
          />

        <TouchableOpacity style={styles.submit} onPress={this._add}>
          <Text style={{  color: 'white'}}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listinthis}>
            <FlatList
                style={{width:'100%'}}
                data={this.state.temp}
                renderItem={({item}) =>
                <Swipeout autoClose={true} close={true} backgroundColor="#FAFAFA"
                right={[{
                 text:"Delete",
                 color:"#e57373",
                 backgroundColor:"#FAFAFA",
                 onPress:()=>{this._delete(item)}
                  },
                 {
                  text:"Edit",
                  color:"#e57373",
                  backgroundColor:"#FAFAFA",
                  onPress:()=>{this._edit(item)}
                  }
                ]}
              style={{backgroundColor: 'white'}}>

                      <TouchableHighlight onPress={()=> Alert.alert(item.name)} >

                          <View style={styles.list}>
                              <Text style={[styles.listtext,{color:'#b71c1c',fontWeight:'bold'}]}>{item.name}</Text>
                              <Text style={styles.listtext}>{item.number}</Text>
                              <Text style={styles.listtext}>{item.email}</Text>

                          </View>
                      </TouchableHighlight>
                  </Swipeout>
                  }
                  keyExtractor={(item,index)=> index.toString()}
            />
        </View>

      </View>
    );
  }
}
