/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image
} from 'react-native';
import Layouts from './Layouts.js'

export default class Flat extends Component{

  constructor(props) {
      super(props);
      this.state = {
          names:[
            {name:'mowgli',image:'/Users/aidev20/Desktop/test/demo_flatlist/mowgli.jpg'},
            {name:'bageers',image:'/Users/aidev20/Desktop/test/demo_flatlist/bageera.jpeg'},
            {name:'bhaloo',image:'/Users/aidev20/Desktop/test/demo_flatlist/bhaloo.jpg'},
            {name:'bhaloo',image:'/Users/aidev20/Desktop/test/demo_flatlist/sherkhan.jpg'},
            {name:'bhaloo',image:'/Users/aidev20/Desktop/test/demo_flatlist/akela.jpg'},
            {name:'bhaloo',image:'/Users/aidev20/Desktop/test/demo_flatlist/rakshak.jpg'}
          ]
      };
  }


  viewLayouts=()=>{
    const nav = this.props.navigator

    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: Layouts,
      title: 'Layouts',
      rightButtonTitle:"Logout",
      onRightButtonPress: function(){
        nav.popToTop()
      },
      passProps: {index: nextIndex},
    });
    this.props.navigator.pop()

  }

  render() {
    return (
      <View style={styles.main}>

       <View style={styles.heading}>
          <Text>Welcome {this.props.name}!</Text>
       </View>
       <View style={{height:600}}>
          <FlatList
              data={this.state.names}
              renderItem={({item}) =>
                  <TouchableHighlight onPress={this.viewLayouts}>
                      <View style={styles.list}>

                          <Text style={styles.listtext}>{item.name.toString()}</Text>
                          <Image style={styles.listimage} source={{ uri: item.image }} />

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

const styles = StyleSheet.create({

    heading:{
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'burlywood',
      borderRadius:10,
      margin:7
    },
    main:{
      flex:1,
      height: '100%',
      flexDirection:'column',
      alignItems:'center',
      marginTop:60,
      backgroundColor:'antiquewhite'
    },
    list:{
      flexDirection:'row',
      backgroundColor:'burlywood',
      borderRadius:10,
      margin:3,
      alignItems: 'center'

    },
    listtext:{
      margin:7,
      width:'45%',

    },
    listimage:{
      margin:7,
      borderRadius:7,
      width:'45%',
      height:100
    }
});
