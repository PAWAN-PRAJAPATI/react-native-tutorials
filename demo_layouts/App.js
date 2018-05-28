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
  View
} from 'react-native';


export default class App extends Component {
  render() {
    return (
      <View style={styles.main}>
          <View style={styles.box1}>
              <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
              <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
              <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          </View>

          <View style={styles.box2}>
              <View style={styles.box21}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
              </View>
              <View style={styles.box22}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
              </View>
          </View>

          <View style={styles.box3}>
              <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
              <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
              <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'blue'
  },
  box1:{
    flex:1,
    flexDirection:'row', //set primary axis to row(horizontal)
    backgroundColor:'crimson',
    justifyContent:'center', //align items in primary axis
    alignItems:'flex-end' //align items in secondary axis
  },

  box2:{
    flex:2,
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'cornsilk'
  },

  box21:{
    flex:1,
    backgroundColor:'indigo',
    flexDirection:'column',
    justifyContent:'flex-end' //align items in primary axis
  },
  box22:{
    flex:1,
    backgroundColor:'darkcyan',
    justifyContent:'space-evenly',
    alignItems:'center'
  },

  box3:{
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'cyan',
    justifyContent:'space-around'

  }
});
