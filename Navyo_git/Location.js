/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import FusedLocation from 'react-native-fused-location';
import SQLite from 'react-native-sqlite-storage'
import MapView from 'react-native-maps';
import { Marker,Polyline } from 'react-native-maps';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Location extends React.Component{
  static navigationOptions = ({ navigation }) => {
     const params = navigation.state.params || {};
     return{
      headerTitle: "Drive Map",
      headerTintColor: 'white',
      headerStyle:{backgroundColor:'#00897B'},
      headerRight: (
        <TouchableOpacity style={{marginRight:10,marginTop: 8}} onPress={params.refresh}>
          <Text style={{height: 30,color:'white',fontSize: 16}}>Refresh</Text>
        </TouchableOpacity>
      ),

     }
    };


  state={
    lat:"adf",
    coords:[],
    region: {
     latitude: 22.280862,
     longitude: 73.190397,
     latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
   },
     data:{curr_lat:22.280862,curr_long:73.190397,curr_speed:0.00,last_speed:0.00},
     coordsv:[],
     marker:'',
     isDateTimePickerVisible1: false,
     isDateTimePickerVisible2: false,
     time1:'',
     time2:'',
     displaytime1:'timet',
     displaytime2:'current',
     names:[]
  }

    _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

    _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

    _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

    _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

    _handleDatePicked2= (datetime) => {

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
      }, function() {
            console.log(this.state.time2)
      });
      this._hideDateTimePicker2();
      this.loc()
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
      }, function() {
            console.log(this.state.time1)
      });
      this._hideDateTimePicker1();
      this.loc()
    };




  loc=()=>{
    //this.create()
    var l = []
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
    var time1 = this.state.time1
    var time2 = this.state.time2
    var init = ""
    console.log(time1)
    console.log(time2)
    var per = 0



    db.transaction((tx) => {

    tx.executeSql('SELECT * FROM Events WHERE last_timestamp >= '+time1+' and curr_timestamp <= '+time2, [], (tx, results) => {
      console.log("SELECT completed");
      var len = results.rows.length;
      if(len==0){return}
      console.log(len)
      var t = true
          for (let i = 0; i < len; i++) {

            console.log("In Loop")
            var row = results.rows.item(i);
            console.log("row",row)
            if(i<len){
              init = row
            }


          if(row.event=="stop"){
              var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#757575",row]
          }
          else if(row.event=="acc"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#7E57C2",row]
          }
          else if(row.event=="turn"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#FFEE58",row]
          }
          else if(row.event=="deacc"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#EC407A",row]
          }
          else if(row.event=="short_break"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#FFA726",row]

          }
          else if(row.event=="running"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#66BB6A",row]

          }
          else if(row.event=="speeding"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"#EF5350",row]
          }
          else if(row.event=="sharp turn"){
            var obj = [[{latitude:JSON.parse(row.last_lat),longitude:JSON.parse(row.last_long)},{latitude:JSON.parse(row.curr_lat),longitude:JSON.parse(row.curr_long)}],"black",row]
          }

            l.push(obj)
          }

          console.log("l",l)
          this.setState({ data:init,coordsv:l,region: {
           latitude: parseFloat(init.curr_lat),
           longitude:parseFloat(init.curr_long),
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }});
    });

    /*
    tx.executeSql('SELECT * FROM Events', [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        console.log("In Loop")
        var row = results.rows.item(i);
        console.log("row events:" ,row)
      }
    });
    */


  });
  console.log("per:",per)


  }
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
                            }, function() {
                      console.log(this.state.displaytime1,this.state.displaytime2)
                });
     }

     componentWillMount(){
       this.props.navigation.setParams({ refresh: this.refresh});
     }
     refresh=()=>{
       var current_time = new Date()
       this.pick2(current_time)
       //this.filter()
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
       this.loc()

     }


shouldComponentUpdate(nextProps, nextState) {
  if(this.state.data.curr_lat !== nextState.data.curr_lat || this.state.coordsv!==nextState.coordsv || this.state.time1!==nextState.time1 ||
     this.state.time2!==nextState.time2 || this.state.displaytime1!==nextState.displaytime1 ||  this.state.displaytime2!==nextState.displaytime2 || this.state.isDateTimePickerVisible1!==nextState.isDateTimePickerVisible1 || this.state.isDateTimePickerVisible2!==nextState.isDateTimePickerVisible2 ){
    return true
  }
  return false
}




  render() {

    var l = this.state.coordsv

    var polylines = l.map((data)=>{
      console.log("data",data)
      return(
        <Polyline
        coordinates={data[0]}
        strokeWidth={5}
        strokeColor={data[1]}
        onPress={()=>{
          console.log("Curr timestad:",this.state.data.curr_timestamp)
          var d = new Date(this.state.data.curr_timestamp)
          var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() +" "+ d.getHours() +":"+d.getMinutes()+":"+d.getSeconds()
          this.setState({data:data[2],polylineTimestamp:date})

        }}/>
      )
    })

    //const { region } = this.props;
    //console.log(region);
    return (
      <View style={{flex: 1,width:'100%'}}>
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
      <View style={styles.container}>
        <View style ={{height:'100%',width:'100%'}}>
          <MapView
            onRegionChangeComplete = {(region)=>{this.setState({region:region})
          console.log(region)}}
            style={styles.map}
            region={this.state.region}>

        {polylines}

        <Marker
          coordinate={{latitude:JSON.parse(this.state.data.curr_lat),longitude:JSON.parse(this.state.data.curr_long)}}/>
          </MapView>
        </View>
        <View style={styles.polylineContent}>

          <View style={styles.latlong}>
          <Text>Timestamp: {this.state.polylineTimestamp}</Text>
        <Text>Event: {this.state.data.event}</Text>
          </View>
          <View style={styles.latlong}>
            <Text>Bearing Start: {this.state.data.last_bearing}</Text>
          <Text>Bearing End:{this.state.data.curr_bearing}</Text>
          </View>
          <View style={styles.latlong}>
            <Text>Speed Start:{this.state.data.last_speed.toFixed(2)} m/s</Text>
          <Text>Speed End:{this.state.data.curr_speed.toFixed(2)} m/s</Text>
          </View>
        </View>
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '93%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
      ...StyleSheet.absoluteFillObject
  },
  polylineContent:{
    ...StyleSheet.absoluteFillObject,
    margin:10,
    height: 70,

    backgroundColor: '#FFFFFF93',
    borderRadius: 10,

  },
  latlong:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:'100%'
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
});
var data = ""
