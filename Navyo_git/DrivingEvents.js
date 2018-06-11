import React, { Component } from 'react';
import { Text, TouchableOpacity, View,StyleSheet,Image,Button,Alert,FlatList,TouchableHighlight } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SQLite from 'react-native-sqlite-storage'
export default class DrivingEvents extends Component {


  static navigationOptions = ({ navigation }) => {
     const params = navigation.state.params || {};

     return{
      headerTitle: "Drive Events",
      headerTintColor: 'white',
      headerStyle:{backgroundColor:'#00897B'},
     }
    };

  state = {
    isDateTimePickerVisible1: false,
    isDateTimePickerVisible2: false,

    time1:'',
    time2:'',
    displaytime1:'dsfasd',
    displaytime2:'',
    names:[]
  };


info=()=>{
  Alert.alert("Hello")
}
//console.log('Current date: ', current_time);
/*
var d =new Date(datetime)
console.log("TimeStamp:",d.getTime())
console.log('A hour has been picked: ', datetime.getHours());
console.log('A data has been picked: ', datetime);
*/
//console.log('A time has been picked: ',);



componentDidMount(){
  var current_time = new Date()

  var dateString = current_time.toString().split(" ")
  var dateString1 = current_time.toString().split(" ")

  var displaytime1 = dateString.splice(1,2).join(' ')+'  12:00 AM'


  var ampm = " am"
  if(current_time.getHours()>12){
    ampm = " pm"
  }

  var displaytime2 = dateString1.splice(1,2).join(' ')+"  "+current_time.getHours()+':'+current_time.getMinutes()+ampm

  console.log('dataString;',displaytime1)
  console.log('timestamp:',current_time.getTime())

  this.setState({displaytime1:displaytime1,
                time1:current_time.getTime(),
                displaytime2:displaytime2,
                time2:current_time.getTime()
              })

   }

   componentWillMount(){
     this.props.navigation.setParams({ refresh: this.refresh});
   }



   refresh=()=>{
     var current_time = new Date()
     this.pick2(current_time)
     //this.filter()
   }


   filter=()=>{
     //this.create()
       var l = []
       var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
       var time1 = this.state.time1
       var time2 = this.state.time2
       console.log(time1)
       console.log(time2)

       db.transaction((tx) => {
       tx.executeSql('SELECT * FROM Events WHERE last_timestamp >= '+time1+' and curr_timestamp <= '+time2, [], (tx, results) => {
         console.log("SELECT completed");
         var len = results.rows.length;
         console.log(len)
         var t = true
             for (let i = 0; i < len; i++) {
               console.log("In Loop")
               var row = results.rows.item(i);
               var d = new Date(row.curr_timestamp)
               var e = new Date(row.last_timestamp)
               var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() +" "+ d.getHours() +":"+d.getMinutes()+":"+d.getSeconds()
               var date1 =  e.getHours() +":"+e.getMinutes()+":"+e.getSeconds()
               //console.log(row)
                   var obj = {event:row.event,last_timestamp:date,curr_timestamp:date1,last_speed:row.last_speed.toFixed(2),curr_speed:row.curr_speed.toFixed(2)}
                 l.unshift(obj)
             }
             console.log("l",l)
             this.setState({ names:l}, function() {
                   console.log(this.state.names)
           });

       });
     });
   }




  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

  _handleDatePicked2= (datetime) => {
    this.pick2(datetime)
    
  }
  pick2=(datetime)=>{
    var dateString = datetime.toString().split(" ")
    var ampm = " am"
    var hour  = datetime.getHours()

    if(datetime.getHours()==12){
      hour = 12
      ampm = " pm"
    }
    if(datetime.getHours()==0){
      hour = 12
      ampm = " am"
    }
    if(datetime.getHours()>12){
      hour = datetime.getHours()-12
      ampm = " pm"
    }

    var displaytime1 = dateString.splice(1,2).join(' ')+" "+hour+':'+datetime.getMinutes()+ampm
    console.log(displaytime1,"2")
    this.setState({
      displaytime2:displaytime1,
      time2:datetime.getTime()
    })
    this._hideDateTimePicker2();
    this.filter()

  }


  _handleDatePicked1= (datetime) => {

    var dateString = datetime.toString().split(" ")
    var ampm = " am"
    var hour  = datetime.getHours()

    if(datetime.getHours()==12){
      hour = 12
      ampm = " pm"
    }
    if(datetime.getHours()==0){
      hour = 12
      ampm = " am"
    }
    if(datetime.getHours()>12){
      hour = datetime.getHours()-12
      ampm = " pm"
    }

    var displaytime1 = dateString.splice(1,2).join(' ')+" "+hour+':'+datetime.getMinutes()+ampm

    console.log(displaytime1,"1")
    this.setState({
      displaytime1:displaytime1,
      time1:datetime.getTime()
    })

    this._hideDateTimePicker1();
    this.filter()
  };

  render () {
    return (
      <View style={styles.main}>

      <View style={styles.datetime}>

        <TouchableOpacity onPress={this._showDateTimePicker1}>
          <Text style={{fontWeight:'bold'}}>{this.state.displaytime1}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible1}
          onConfirm={this._handleDatePicked1}
          onCancel={this._hideDateTimePicker1}
          mode = 'datetime'
          is24Hour ={false}
        />
      <View style={{height: '100%',width: 0,borderRightColor: '#ECEFF1',borderWidth: 0.5}}></View>

      <TouchableOpacity onPress={this._showDateTimePicker2}>
          <Text style={{fontWeight:'bold'}}>{this.state.displaytime2}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={this._handleDatePicked2}
          onCancel={this._hideDateTimePicker2}
          mode = 'datetime'
          is24Hour ={false}
        />
    </View>
    <View style={styles.drivingEvents}>
      <FlatList
      data={this.state.names}
      renderItem={({item}) =>
      <View style={{flexDirection: 'row',alignItems: 'center',backgroundColor:'white',justifyContent: 'space-between',borderBottomWidth:1,borderBottomColor:'#ECEFF1'}}>
        <View style={styles.elist}>
        <Text style={styles.event} >{item.event}</Text>
        </View>

      <View style={styles.list}>
      <View style={{ flex:2, flexDirection: 'row'}}>
        <Text style={styles.text} >{item.last_timestamp}</Text>
      <Text style={styles.text} >to</Text>
        <Text style={styles.text} >{item.curr_timestamp}</Text>
      </View>
      <View style={{ flex:2, flexDirection: 'row'}}>
         <Text style={styles.text} >{item.last_speed}</Text>
       <Text style={styles.text} >to</Text>
         <Text style={styles.text} >{item.curr_speed}</Text>
       <Text style={styles.text} >m/s</Text>
      </View>
      </View>
  </View>
      }

      keyExtractor={(item, index) => index.toString()}
      />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  navbar:{
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    backgroundColor:'#00897B',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
  },

  main:{
     flexDirection: 'column',alignItems: 'center',flex:1
  },

  navbarText:{
    color:'white',fontWeight: 'bold',fontSize: 20
  },

  datetime:{
    padding: 6,
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC'
  },
  drivingEvents:{

    height: '100%',
    width: '100%',
  },
  text: {
  color: '#616161',
  fontSize:12,
  marginRight: 8
},
list: {
  width: '70%',
  alignItems:'flex-end',
  marginTop: 10,
  paddingRight: 10
},
elist: {
  width: '30%',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingLeft: 10
},
event: {
  color: '#616161',
  fontSize:20,
}


})
