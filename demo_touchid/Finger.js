import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,Button,Image,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from 'react-native-shaking-text';


 
export default class Finger extends Component {

    static navigationOptions = ({ navigation }) => {
        return{
        headerTitle: "Home",
        headerTintColor: 'white',
        headerStyle:{backgroundColor:'#00897B'},
      }
    };

 

  state = { errorMessage: undefined };

 
  componentDidMount() {
      console.log("componentDidMount")
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        console.log("AUthenticate fingerprint")
        this.setState({errorMessage:"Authenticated successfully"})
        //Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        
        this.setState({ errorMessage: error.message });
        //this.description.shake();
      });
  }
 
  componentWillUnmount() {
    FingerprintScanner.release();
  }
 
  handleAuthenticationAttempted = (error) => {
    console.log("error2",error)
    //alert(error.message)
    this.setState({ errorMessage: error.message });
    this.forceUpdate()
    //this.description.shake();
  };
 
  render() {

    console.log(this.state)

    if(this.state.errorMessage=="Authenticated successfully"){
      this.props.navigation.navigate("ViewPasswords")
      console.log(this.state,"if")

    }
    
    return (
    
      <View style={{flex:1}}>
        <View style={{flex:1, justifyContent:'center',alignItems:"center"}}>
            <ShakingText>{this.state.errorMessage}</ShakingText>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
          <Image style={{margin:10,width:100,height:100}} source={require('./touch_id.png')} />
        </View>
      </View>
    );
  }
}
 

 