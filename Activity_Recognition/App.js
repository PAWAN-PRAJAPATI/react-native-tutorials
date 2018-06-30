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
  View,Button
} from 'react-native';
import List from './List'
import ActivityRecognition from 'react-native-activity-recognition'

import SQLite from 'react-native-sqlite-storage'
import Geocoder from 'react-native-geocoder';


export default class App extends Component<Props> {

  state={
    location:true,
    activity:"None"
  }
  create=()=>{
    console.log("Opening dataBase")
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
    db.transaction((tx) => {

    tx.executeSql('CREATE TABLE IF NOT EXISTS Activity('+
                      'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                      'activity varchar(225),'+
                      'timestamp REAL,'+
                      'confidence REAL)');

    tx.executeSql('CREATE TABLE IF NOT EXISTS Events('+
                      'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                      'activity varchar(225),'+
                      'prev_timestamp REAL,'+
                      'curr_timestamp REAL,'+
                      'confidence REAL)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Stops('+
                      'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                      'timestamp REAL,'+
                      'address varchar(1024),'+
                      'lat REAL,'+
                      'long REAL)');
                    });

    console.log("DB created")
  }

  insert_continue=(tx,event,lat1,long1,speed,bearing,timestamp,event_row)=>{
    tx.executeSql("Insert into Events "+event_query+" values('"+event+"',"+event_row.curr_timestamp+","+timestamp+",'"+event_row.curr_lat+"','"+lat1+"','"+event_row.curr_long+"','"+long1+"',"+event_row.curr_bearing+","+bearing+","+event_row.curr_speed+","+speed+");")

  }
  //insert event in non continious timestamp(next.current_timestamp == next.previous_timestamp)
  insert_new=(activity,timestamp,event_row,tx)=>{
    console.log("Incerting new")
    tx.executeSql("Insert into Events (activity,prev_timestamp,curr_timestamp,confidence) values('"+activity.type+"',"+timestamp+","+timestamp+","+activity.confidence+");")
  }
  componentDidMount(){
    //this.getLocation()

  }
  //extend the event
  update=(activity,timestamp,event_row,tx)=>{
    tx.executeSql("UPDATE Events set "+
                "activity ='"+activity.type+ "',"+
                "curr_timestamp ="+timestamp+ ","+
                "confidence ="+activity.confidence +
                " where id ="+event_row.id);
      console.log("Event Updated")
  }


  componentWillUnmount(){
    ActivityRecognition.stop()
    this.unsubscribe()
  }
  insert_new_stop=(tx)=>{
    console.log("Stops")
  }

  getLocation=()=>{
    var position  = false
    console.log("In getlocation")
     navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      this.get_address(position)
      this.setState({location:false})

    },
    (error) => {console.log(error)
      this.setState({ location: true })},
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 },
    ).then((position)=>console.log("position:",position));

  }
get_address=(position)=>{
  var NY = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  Geocoder.geocodePosition(NY).then(res => {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
    console.log("hello",res[0].formattedAddress)
    var address = res[0].formattedAddress
    db.transaction((tx) => {
        tx.executeSql("Insert into Stops (timestamp,lat,long,address) values("+position.timestamp+","+position.coords.latitude+","+position.coords.longitude+",'"+address+"');")
    });

    })
    .catch(err => console.log(err))
  }
  add=(activity,timestamp)=>{
      var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
      db.transaction((tx) => {
          console.log("Inserting Activity")
          tx.executeSql("Insert into Activity (timestamp,activity,confidence) values("+timestamp+",'"+activity.type+"',"+activity.confidence+");")
          console.log("Iserted Succesfully")

          tx.executeSql('SELECT * FROM Events', [], (tx, results) => {
            var len = results.rows.length;
            if(len<=0){
              tx.executeSql("Insert into Events (activity,prev_timestamp,curr_timestamp,confidence) values('"+activity.type+"',"+timestamp+","+timestamp+","+activity.confidence+");")
              console.log("Returning")
              return
            }

            else{
              tx.executeSql('SELECT * from Events ORDER BY id DESC LIMIT 1', [], (tx, results) => {
                var event_row = results.rows.item(0)
                console.log("Event",event_row)
                console.log("Diff",timestamp - event_row.prev_timestamp)
                if(event_row.activity == activity.type && (timestamp - event_row.curr_timestamp)<=60000){
                  if(activity.type=='STILL' && timestamp - event_row.prev_timestamp >= 40000 && this.state.location){
                    console.log("I  am >=60000")
                    this.getLocation()
                  }

                  this.update(activity,timestamp,event_row,tx)
                }
                else{
                  this.insert_new(activity,timestamp,event_row,tx)
                  this.setState({location:true})

                }
              });
            }
          });
      });
  }

  componentWillMount(){
    this.create()


      const detectionIntervalMillis = 1000
      ActivityRecognition.start(detectionIntervalMillis)

      this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      var timestamp = new Date().getTime()
      const activity = detectedActivities.sorted[0]
      console.log(activity,timestamp)
      this.setState({activity:activity.type})
      if(activity.confidence>=70){
          this.setState({activity:activity.type})
          this.add(activity,timestamp)
      }
    })

  }


  render() {

    return (
      <View style={styles.container}>
        <List/>
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
    fontSize: 20
  },
});
