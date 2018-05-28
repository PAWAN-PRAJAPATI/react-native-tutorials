/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//http://api.apixu.com/v1/forecast.json?key=6befcca42827401eb8e123253181805&q=Paris forcast
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,TouchableOpacity,
  Alert,ActivityIndicator,
  Image,ImageBackground,NavigatorIOS
} from 'react-native';

import styles from './styles.js'
import Search from  './Search.js'

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
          passProps: {index: 1},
          rightButtonTitle:'Add',
          onRightButtonPress: this.addCity,
          navigationBarHidden: true,
        }}
        style={{flex: 1}}
      />
    );
  }
}


class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={
        url:'https://api.apixu.com/v1/forecast.json?key=6befcca42827401eb8e123253181805&q=',
        city:'Search City',
        data:'',
        isLoading:false,
        try:'',
    }
  }

  getCityObj=()=>{
    var filtered_item = cities.filter((item)=>{
    var  v = item.name.toLowerCase().match("Vadodara")
    return v
    });
    console.log(filtered_item);
  }
  addCity=()=>{
    this.props.navigator.push({
      component: Search,
      title: 'Search',
      passProps: {},
      navigationBarHidden:true,
      callback:this.callback
    });
  }

  callback=(data)=>{
  this.setState({
    city:data.vicinity
  })
  this.setData()
  console.log(data)
  //this.forceUpdate()
  }

  setData=()=>{
     return fetch(this.state.url+this.state.city)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          temp_c: responseJson.current.temp_c,
          humidity: responseJson.current.humidity,
          text: responseJson.current.condition.text,
          name: responseJson.location.name,
          icon:"https://"+responseJson.current.condition.icon.slice(2),
          mintemp_c:responseJson.forecast.forecastday[0].day.mintemp_c,
          maxtemp_c:responseJson.forecast.forecastday[0].day.maxtemp_c,
          isLoading:false,
        }, function(){
          console.log(this.state.data)
          console.log(this.state.icon)
        });

      })
      .catch((error) =>{
        console.error(error+"error");
      });
  }

  _search=()=>{
    this.setData()
    //Alert.alert(this.state.data);
  }

  render() {
    return (
      <View style={styles.main}>
        <ImageBackground blurRadius={5} style={{width:'100%',height:'100%'}} source={{uri:'/Users/aidev20/Desktop/test/WeatherApp/back2.png'}}>
        <View style={styles.searchbar}>
          <TouchableOpacity style={styles.submit}
            onPress={this.addCity}>
            <Text style={{color: 'white'}}><Text style={{fontSize: 20,color: "white"}}>{this.state.city}</Text>

            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize: 20,color: "white"}}>{this.state.temp_c} &#8451;</Text>
            <View style={{flexDirection: 'row',margin: 7,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{fontSize: 13,marginRight: 7, color: "blue"}}>{this.state.mintemp_c} &#8451;</Text>
                <Text style={{fontSize: 13,color: "red"}}>{this.state.maxtemp_c} &#8451;</Text>
              </View>
            </View>

            <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: 'white'}}>{this.state.text}</Text>
            <View style={{flexDirection: 'row',margin: 7,justifyContent: 'center',alignItems: 'center'}}>
                  <Image style={{width:20,height: 20,marginRight: 7,}} source={{uri:'/Users/aidev20/Downloads/humidity.png'}}/>
                <Text style={{fontSize: 16, color: "white"}}>{this.state.humidity}</Text>
              </View>
            </View>

            <Image
               style={{width:100, height: 100}}
               source={{uri:this.state.icon}}
              />

          </View>
        </View>
      </ImageBackground>
      </View>
    );
  }
}
