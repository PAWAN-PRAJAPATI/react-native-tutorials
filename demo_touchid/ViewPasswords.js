import React, { Component } from 'react';
import {
  Alert,AsyncStorage,
  Text,StyleSheet,FlatList,TouchableHighlight,
  View,Button,Image,TouchableOpacity
} from 'react-native';
import images from './images'
import Swipeable from 'react-native-swipeable';

//import {styles} from './styles'

 
class ViewPasswords extends Component {
 
  static navigationOptions = ({ navigation }) => {
    return{
    headerTitle: "My Passwords",
    headerTintColor: 'white',
    headerStyle:{backgroundColor:'#00897B'},
    headerLeft:null,
    headerRight: (
      <TouchableOpacity style={{marginRight:10}} onPress={ () => navigation.navigate("AddPassword")}>
        <Image style={styles.icon} source={images.add}/>
      </TouchableOpacity>
    ),
  }
};


  state = {  };

  
//static getItem(key: string, [callback]: ?(error: ?Error, result: ?string) => void)
  getAllPwd=()=>{
    var pwds = new Array()
    AsyncStorage.getAllKeys((error,keys)=>{
      for(var i = 0;i<keys.length;i++) {
        var element = keys[i]
        console.log(element,"element")
        AsyncStorage.getItem(element,(error,result)=>{
          pwd = JSON.parse(result)
          pwds.push(pwd)
          if(pwds.length==keys.length){
            console.log(pwds,(pwds.length))
            this.setState({pwds:pwds})
          }
        })
      };      
    })  
  }
  componentDidMount() {
      this.getAllPwd()
  }
 
  componentWillUnmount() {
  }
  rightButtons(data){ 
    return[
    <View style={{flex:1,width:'50%', flexDirection:'row', alignItems:'center',justifyContent:'space-around'}}>
    <TouchableHighlight onPress={()=>
      {console.log("in delete",data.key)
      AsyncStorage.removeItem(data.key,(error)=>this.getAllPwd())}}><Text>Delete</Text></TouchableHighlight>,
    <TouchableHighlight onPress={()=>console.log(data)}><Text>Edit</Text></TouchableHighlight>
    </View>
    ];
  }
  
 
  render() {
    console.log(this.state,"state")
    

    const {navigate} = this.props.navigation
    if(this.state.pwds)
    {
      
      var pwds = this.state.pwds
      console.log(pwds,"if")
      var list_pwds = pwds.map((data)=>{
        console.log(data)
      return(
        <View style={{backgroundColor:'white'}}>
          <Swipeable rightButtonWidth ={200} style={{marginTop:10}} rightButtons={this.rightButtons(data)}>
            <View style={{padding:10}}>
            <Text>{data.pwd}</Text>
            <Text>{data.title}</Text>
            <Text>{data.comment}</Text>
            </View>
          </Swipeable>
        </View>
      )
    })
      return (
    
      <View>

      {list_pwds}

      </View>
    );}
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
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
  },
  listinthis:{
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%',
  },
})
//removeItem(key: string, [callback]: ?(error: ?Error) => void)



export default ViewPasswords;