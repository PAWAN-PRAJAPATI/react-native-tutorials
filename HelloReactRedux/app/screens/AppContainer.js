import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { ListItem } from 'react-native-elements'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';

class AppContainer extends Component {

  constructor(props){
    super(props);
    console.log('constructor');
    console.log(this.props);
    this.state = {loading: true};
  }

  componentDidMount() {

    //this.props.myAction2();

    this.props.getList().then(()=>{
      this.state = {loading: false}
    });
  }

  componentWillUnmount() {

  }

  btnClicked() {
    console.log('AppContainer-btnClicked');
    console.log(this.props);
    //this.props.myAction1();
    this.props.getList();

  }

  // render() {
  //  return (
  //     <View style={styles.mainWrapper}>
  //       <Text>
  //         This is text {this.props.myState1.text}
  //       </Text>
  //       <TouchableHighlight onPress={this.btnClicked.bind(this)} >
  //         <Text>Click Me </Text>
  //       </TouchableHighlight>
  //     </View>
  //   );
  // }


  itemClicked(item){

    console.log(item.text);

    this.props.selectItem(item);

    this.props.navigator.push({
      screen: 'home.screen2',
      title: item.text,
    });
  }

  render() {

    
    console.log(this.props.mylist);

    console.log('render mylist');
    return Array.isArray(this.props.mylist) ? (
      <FlatList
        data={this.props.mylist}
        //renderItem={({item}) => <Text>{item.key}</Text>}
        renderItem={({item}) => <ListItem title={item.text} onPress={() => {this.itemClicked(item)}}/>}
      />
    ) : (
      <View style={styles.mainWrapper}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 100
  }
});

function mapDispatchToProps(dispatch) {
  console.log('AppContainer-mapDispatchToProps')
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {  console.log('AppContainer-Connect-state'); return {
  myState1: state.myreducer1, 
  mylist: state.mylist
}; },
 mapDispatchToProps)(AppContainer);
