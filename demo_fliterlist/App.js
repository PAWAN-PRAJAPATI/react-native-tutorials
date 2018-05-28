/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from './style.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  TextInput,Alert
} from 'react-native';

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            names:[
              {name:'Asd',price:'123'},
              {name:'fgh',price:'123'},
              {name:'qwe',price:'123'},
              {name:'rty',price:'123'},
              {name:'xcv',price:'123'},
              {name:'sdt',price:'123'},
              {name:'sdf',price:'123'},
              {name:'asdf',price:'123'},
              {name:'sdf',price:'123'},
              {name:'aws',price:'123'},
              {name:'asd',price:'123'},
              {name:'gli',price:'123'},
              {name:'owi',price:'123'},
            ],

            search:'',

            temp:[
              {name:'Asd',price:'123'},
              {name:'fgh',price:'123'},
              {name:'qwe',price:'123'},
              {name:'rty',price:'123'},
              {name:'xcv',price:'123'},
              {name:'sdt',price:'123'},
              {name:'sdf',price:'123'},
              {name:'asdf',price:'123'},
              {name:'sdf',price:'123'},
              {name:'aws',price:'123'},
              {name:'asd',price:'123'},
              {name:'gli',price:'123'},
              {name:'owi',price:'123'},
            ],
          }
        };

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
    render() {
      return (
        <View style={styles.main}>
          
              <TextInput
              style={styles.inputs}
              secureTextEntry={false}
              placeholder="Username"
              keyboardType="default"
              onChangeText={this.find}
              value={this.state.search}
              auto-capitalization={false}
              />

              <View style={styles.listinthis}>
                  <FlatList
                      style={{width:'100%'}}
                      data={this.state.temp}
                      renderItem={({item}) =>
                          <TouchableHighlight onPress={()=> Alert.alert(item.name)} >

                              <View style={styles.list}>
                                  <Text style={styles.listtext}>{item.name}</Text>
                                  <Text style={styles.listtext}>{item.price}</Text>
                              </View>

                          </TouchableHighlight>
                          }
                          keyExtractor={(item,index)=> index.toString()}
                  />

              </View>

        </View>
      );
    }
}
