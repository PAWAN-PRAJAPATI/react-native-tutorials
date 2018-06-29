import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class Helloworld extends Component {

  constructor(props){
    super(props);
    console.log('constructor');
    console.log(this.props);
  }
  state={
    text:"Write Something",
    text_1:"Write Something"
  }
  

  componentDidMount() {

    console.log(this.props)
    //this.props.myAction2();

    //this.props.getList().then(()=>{
    //this.state = {loading: false}
    //});
  }

  componentWillMount() {
    console.log("WillMount")
    this.props.helloWorld_action("WillMount")
  }



  render() {

    
    console.log("render");
    return (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>

            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Button title="Just tap me" onPress={()=>{this.props.onClick(this.state.text)}}/>

            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text_1) => this.setState({text_1})}
              value={this.state.text_1}
            />
            <Button title="Just tap me" onPress={()=>{this.props.onClick_1(this.state.text_1)}}/>
        </View>
    );
  }
}
export default Helloworld

/*
function mapDispatchToProps(dispatch) {
  console.log('AppContainer-mapDispatchToProps')
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {  console.log('AppContainer-Connect-state'); return {
  myState1: state.myreducer1, 
  mylist: state.mylist
}; },
 mapDispatchToProps)(AppContainer);
*/