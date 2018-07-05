import React, { Component } from 'react';
import {
  Alert,
  Text,StyleSheet,TextInput,
  View,Button,Image,TouchableOpacity,AsyncStorage
} from 'react-native';
import images from './images'

//import {styles} from './styles'

 
class AddPassword extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return{
        headerTitle: "Add Password",
        headerTintColor: 'white',
        headerStyle:{backgroundColor:'#00897B'},
        headerLeft:null,
        headerRight: (
          <TouchableOpacity style={{marginRight:10}}   onPress={()=>params.addPwd(navigation)} >
            <Image style={styles.icon} source={images.save}/>
          </TouchableOpacity>
        ),
      }
    };

    
 

  state = {  };

 
  componentDidMount() {

    //static getAllKeys([callback]: ?(error: ?Error, keys: ?Array<string>) => void)
  
  }

  componentWillMount(){
    console.log("componentWillMount")
    this.props.navigation.setParams({ addPwd: this.addPwd});
  }

  addPwd=(navigation)=>{
    var date = new Date()
    console.log(date)
    try{
        var state = this.state
        var date = new Date()
        state.key = date.getTime().toString()
        AsyncStorage.setItem(state.key,JSON.stringify(state),()=>{

           navigation.navigate("ViewPasswords")
        })
    }catch(error){
        console.log(error)
    }
  }

  componentWillUnmount() {
  }
 
  
 
  render() {
      console.log(this.state)
    
    return (
    
      <View style={{width:'100%'}}>
        <View>

            <TextInput
            style={styles.pwdinput}
            secureTextEntry={false}
            placeholder="Title"
            keyboardType="default"
            onChangeText={(text) => this.setState({title:text})}
            value={this.state.title}
            />

            <TextInput
            style={styles.pwdinput}
            secureTextEntry={false}
            placeholder="Pwd"
            keyboardType="default"
            onChangeText={(text) => this.setState({pwd:text})}
            multiline = {true}
            value={this.state.pwd}/>

            <TextInput
            style={styles.pwdinput}
            secureTextEntry={false}
            placeholder="Comment"
            keyboardType="default"
            onChangeText={(text) => this.setState({comment:text})}
            value={this.state.comment}
            numberOfLines = {4}
            multiline = {true}
            numberOfLines = {4}/>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    pwdinput:{
        width:'90%',
        height:40,
        borderRadius:4,padding:3,
        margin:13,
        backgroundColor: 'white',
      },
      icon:{
        height: 30,
        width:30,
        color:'white',
        fontSize: 16
    }
})

export default AddPassword;


    