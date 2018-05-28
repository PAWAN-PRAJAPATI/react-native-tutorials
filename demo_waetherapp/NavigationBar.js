import React, { Component } from 'react';
import {NavigatorIOS} from 'react-native';
import App from './App.js'
export default class NavigationBar extends React.Component {

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: App,
          title:'Home',
          passProps: {index: 1},

        }}
        style={{flex: 1}}
      />
    );
  }
}
