/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Alert,Linking,Platform,
  Button,PermissionsAndroid
} from 'react-native';

import  RNSettings from 'react-native-settings'



export default class App extends Component<Props> {

  state={
    initialPosition:"Press getLocation"
  }
  componentDidMount(){
    console.log("componentDidMount")
    //navigator.geolocation.requestAuthorization();
    /*
    RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).
    then((result) => {
    if (result === RNSettings.ENABLED) {
      console.log('location is enabled')
    }
  })
  */
    //this.requestCameraPermission()
  }
  /*
  async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            //alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("You've access for the location");
                } else {
                    alert("You don't access for the location")
                    //this.gotoSettings()
                }
            } catch (err) {
                alert(err)
            }
        }
    };
    */

  location_alert=(tag)=>{
      Alert.alert(
      'Alert',
      'Please turn on location',
      [

        {text: 'Cancel', onPress: () => {
          console.log("Cancel")
          //this.stop_tracking()
        }},
        {text: 'Ok', onPress: () => {

          Platform.OS=='ios' ? (this.gotoSettings_ios(tag)) : (this.gotoSettings_android())

        }},
      ],
      { cancelable: false }
    )
  }


  gotoSettings_ios=(tag)=>{
    if(tag=="PERMISSION_DENIED"){
      //goes to app location setting where user can set permission as Never or While Using
      Linking.canOpenURL('app-settings:').then(supported => {
      Linking.openURL("app-settings:")})
    }
    else{
      //goes to device location setting where user can turn locatin on or off
      Linking.canOpenURL('app-settings:').then(supported => {
      Linking.openURL("App-Prefs:root=General")})
    }
  }
  //goes to device location setting where user can turn locatin on or off
  gotoSettings_android=()=>{
    RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(() => this.getLocation())
  }




checkLocationSettings=()=>{
  console.log("checkLocationSettings")

    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {

    if (result == RNSettings.ENABLED) {
          this.getLocation()
       }
    else {
         console.log("location is unenabled")
         //Alert will not be displayed if without setTimeout
         setTimeout(()=> this.location_alert(),100)
       }
    })
  }


  getLocation=()=>{
    console.log("getLocation")
    navigator.geolocation.getCurrentPosition(
       (position) => {

          const initialPosition = JSON.stringify(position);
          this.setState({initialPosition})
          console.log(position)
       },
       (error) => {
         console.log(error)
         if(error.PERMISSION_DENIED){
           this.location_alert("PERMISSION_DENIED")
         }
         else if(error.code==3){
           Alert.alert("Request timeout")
         }
       },
       { enableHighAccuracy: false, timeout: 10000, maximumAge: 20000 }
    );
  }


  gotoSettings=()=>{
    RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).
    then((result) => {
      console.log("result",result)
    if (result === RNSettings.ENABLED) {
      console.log('location is enabled')
    }
  })
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Geolocation demo
        </Text>
        <Text style={styles.instructions}>
          {this.state.initialPosition}
        </Text>
        <Button title="getLocation" onPress = {this.checkLocationSettings}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
