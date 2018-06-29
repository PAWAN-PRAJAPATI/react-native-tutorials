import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class Screen2 extends Component {

  constructor(props){
    super(props);
    console.log('constructor-Screen2');
    console.log(this.props);
  }

  componentDidMount() {
    console.log('componentDidMount-Screen2');
    //this.props.getList();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount-Screen2');

  }

  btnClicked() {
    console.log('Screen2-btnClicked');
    console.log(this.props);

  }

  render() {
   return (
      <View style={styles.mainWrapper}>
        <Text>
          This is text {this.props.myitem.text}
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
  console.log('Screen2-mapDispatchToProps')
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {  console.log('Screen2-Connect-state'); return {
  myitem: state.myitem
}; },
 mapDispatchToProps)(Screen2);
