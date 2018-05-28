import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, TouchableOpacity,View,StyleSheet} from 'react-native';
import Inputs from './Inputs.js';
import Flat from './Flat.js'
import Login from  './Login.js'


export default class NavigatorIOSApp extends React.Component {

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title:'Home',
          passProps: {index: 1},

        }}
        style={{flex: 1}}
      />
    );
  }
}

var NavigationBarRouteMapper = {
RightButton: function(route, navigator, index, navState) {
  console.log(route.component);
  return (
    <TouchableOpacity
      onPress={route.component.onRightButton}
      style={{width: 100, height: 44, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Right Button</Text>
    </TouchableOpacity>
  );
},
};
class MyScene extends React.Component {
  static propTypes = {
      title: PropTypes.string.isRequired,
      navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    //this._onForward = this._onForward.bind(this);
  }

  register=()=> {
    this.props.navigator.push({
      component: Inputs,
      title: 'Registration',
      passProps: {},
    });
  }

  login=()=>{
    this.props.navigator.push({
      component: Login,
      title: 'Login',
      passProps: {},
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.submit}
          onPress={this.login}>
              <Text style={{  color: 'white'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submit}
          onPress={this.register}>
              <Text style={{  color: 'white'}}>Register</Text>
        </TouchableOpacity>

      </View>
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
        submit:{
          width: '50%',
          height:50,
          backgroundColor: '#fd9385',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          margin:7
        }
})
