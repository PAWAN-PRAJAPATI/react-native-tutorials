import React, { Component } from 'react'
import { View, Text, TouchableOpacity,Platform, TextInput,Alert, StyleSheet,ScrollView,Image,Slider,Button ,TouchableHighlight} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import FusedLocation from 'react-native-fused-location';
import SQLite from 'react-native-sqlite-storage'
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';


export default class Bar extends Component {


  static navigationOptions= ({ navigation }) => {
    const params = navigation.state.params || {};
      return{
      headerTitle: "Home",
      headerTintColor: 'white',
      headerStyle:{backgroundColor:'#00897B'},
      headerRight: (
        <TouchableOpacity style={{marginRight:10,marginTop: 8}} onPress={() => params.navigate("Settings")}>
          <Text style={{height: 30,color:'white',fontSize: 16}}>Settings</Text>
        </TouchableOpacity>
      ),
    }
  };


  state = {
    v:'1',
    val:'Start Tracking',
    stop:0,
    acc:0,
    turn:0,
    deacc:0,
    short_break:0,
    running:0,
    speeding:0,
    sharp_turn:0,

  }
  bar_disp=(event,tx)=>{
    var total = 0
    var run = 0
    var total1 = 0
    var run1 = 0
    var percentage = 0

         tx.executeSql("SELECT SUM(curr_timestamp-last_timestamp) FROM Events WHERE event !='stop'" ,[], (tx,results) => {
           total = results.rows.item(0)
           for (var key in total) {
         total1 = total[key];
      }
         });
         tx.executeSql("SELECT SUM(curr_timestamp-last_timestamp) FROM Events WHERE event ='"+event+"'" ,[], (tx, results) => {
           run = results.rows.item(0)
           for (var key in run) {
           run1 = run[key];
      }
           console.log(event,(run1/total1)*100)
            percentage = (run1/total1)*100
            this.set_bar(event,percentage);

         });
     }

     set_bar=(event,percentage)=>
     {
         if(event=='running')
         {
           this.setState({ running:percentage}, function() {
                 console.log(this.state.running)
         });
         }
         else if(event=='stop')
         {
           this.setState({ stop:percentage}, function() {
                 console.log(this.state.stop)
         });
         }
         else if(event=='acc')
         {
           this.setState({ acc:percentage}, function() {
                 console.log(this.state.acc)
         });
         }
         else if(event=='turn')
         {
           this.setState({ turn:percentage}, function() {
                 console.log(this.state.turn)
         });
         }
       else if(event=='deacc')
         {
           this.setState({deacc:percentage}, function() {
                 console.log(this.state.deacc)
         });
         }
         else if(event=='short_break')
           {
             this.setState({short_break:percentage}, function() {
                   console.log(this.state.short_break)
           });
           }
           else if(event=='speeding')
             {
               this.setState({speeding:percentage}, function() {
                     console.log(this.state.speeding)
             });
             }
             else if(event=='sharp_turn')
               {
                 this.setState({sharp_turn:percentage}, function() {
                       console.log(this.state.sharp_turn)
               });
               }

     }
  create=()=>{
      var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
      db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Location('+
                        'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                        'timestamp REAL,'+
                        'lat varchar(255),'+
                        'long varchar(255),'+
                        'bearing REAL,'+
                        'speed REAL,'+
                        'accuracy REAL)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS Events('+
                        'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                        'event varchar(255),'+

                        'last_timestamp REAL,'+
                        'curr_timestamp REAL,'+

                        'last_lat varchar(255),'+
                        'curr_lat varchar(255),'+

                        'last_long varchar(255),'+
                        'curr_long varchar(255),'+


                        'last_bearing REAL,'+
                        'curr_bearing REAL,'+

                        'last_speed REAL,'+
                        'curr_speed REAL)',
                    );

        console.log("Database Created");
      });
  }


  add=(timestamp,lat,long,bearing,speed,accu,k,bearing_diff,b1,b2)=>{
    //console.log(b1,b2)
    console.log("add Bearing_diff:",bearing_diff)
    //console.log("K,",k)
      var event = "null"
      //console.log("Turn:",k.turn)

      var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
      db.transaction((tx) => {

      var accu1 = accu.toFixed(2)
      var lat1 = JSON.stringify(lat)
      var long1 = JSON.stringify(long)
      //var timestamp = parseInt(timestamp)
      //console.log("timestamp1:",timestamp1)

      tx.executeSql("Insert into Location (timestamp,lat,long,bearing,speed,accuracy) values("+timestamp+",'"+lat1+"','"+long1+"',"+bearing+","+speed+","+accu1+");")
      console.log("Inserted into Location");

      tx.executeSql('SELECT * FROM Events', [], (tx, results) => {
        var len = results.rows.length;
        //console.log("lenght:",len)
        if(len<=0){
          tx.executeSql("Insert into Events "+event_query+" values('stop',"+timestamp+","+timestamp+",'"+lat1+"','"+lat1+"','"+long1+"','"+long1+"',"+bearing+","+bearing+","+speed+","+speed+");")
          //console.log("Inserted into events")
        }

        else{

            tx.executeSql('SELECT * from Events ORDER BY id DESC LIMIT 1', [], (tx, results) => {
              var event_row = results.rows.item(0)
              //console.log("Event ****",event_row)
              //console.log("data:",speed,bearing_diff)

              if(speed <= 0 ){
                  event = "stop"
                  this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
              }


              else if(bearing_diff >= 45){

                console.log("Diff bearing:",bearing_diff)
                if(bearing_diff>180){
                    bearing_diff = Math.abs(360 - bearing_diff)
                }
                event = "turn"
                if(bearing_diff>= 45){
                    if(speed>k.turn){
                        event = "sharp turn"
                        this.turn(tx,b1,b2,event,lat1,long1,speed,bearing,timestamp,event_row)
                    }
                    else{
                        event = "turn"
                        this.turn(tx,b1,b2,event,lat1,long1,speed,bearing,timestamp,event_row)
                    }

                 }

               }


              else if(speed - event_row.curr_speed > k.acceleration){
                  event = "acc"
                  console.log("Event prev",event)
                  this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
              }

             else if(event_row.curr_speed - speed > k.short_break ){
                  event = "short_break"
                  console.log("Event prev",event)
                  this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
              }

              else if(event_row.curr_speed - speed > k.deacceleration ){
                   event = "deacc"
                   console.log("Event prev",event)
                   this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
               }

              else if(speed > k.speeding ){
                   event = "speeding"
                   console.log("Event prev",event)
                   this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
               }


              else if(0<Math.abs(event_row.curr_speed - speed) <= k.running ){
                   event = "running"
                   console.log("Event prev",event)
                   this.event(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
               }
            });
          }
        });

    });
  }

 turn=(tx,b1,b2,event,lat1,long1,speed,bearing,timestamp,event_row)=>{
    //console.log("Event prev turn",event_row.event)
    //console.log(event)

    if(timestamp - event_row.last_timestamp > 55000){
    this.insert_new(tx,event,lat1,long1,speed,bearing)
    }

    else if(event_row.event!=event){
        tx.executeSql('SELECT * from Events' + " where last_timestamp >="+b1.timestamp+" and "+
        "curr_timestamp<=" + b2.timestamp , [], (tx, results) => {

        if(results.rows.length<=0){
            this.insert_continue(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
            console.log("Inserted turn")
        }
        else{
            tx.executeSql("UPDATE Events set "+
            "event='"+event+"'"+
            " where last_timestamp >="+b1.timestamp+" and "+
            "curr_timestamp<=" + b2.timestamp);
            console.log("Update into turn *****")
        }
        });
    }

    else{
    this.update(lat1,long1,speed,bearing,timestamp,event_row)
    }
  }

event=(tx,event,lat1,long1,speed,bearing,timestamp,event_row)=>{

    if(timestamp - event_row.last_timestamp > 55000){
      this.insert_new(tx,event,timestamp,lat1,long1,speed,bearing)
      console.log("1evnet")
     }

    else if(event_row.event!=event || timestamp - event_row.last_timestamp > 15000){
      this.insert_continue(tx,event,lat1,long1,speed,bearing,timestamp,event_row)
      console.log("2evnet")
    }

    else{
     this.update(lat1,long1,speed,bearing,timestamp,event_row)
     console.log("3evnet")
    }
}


insert_continue=(tx,event,lat1,long1,speed,bearing,timestamp,event_row)=>{
  tx.executeSql("Insert into Events "+event_query+" values('"+event+"',"+event_row.curr_timestamp+","+timestamp+",'"+event_row.curr_lat+"','"+lat1+"','"+event_row.curr_long+"','"+long1+"',"+event_row.curr_bearing+","+bearing+","+event_row.curr_speed+","+speed+");")

}
insert_new=(tx,event,timestamp,lat1,long1,speed,bearing)=>{
  tx.executeSql("Insert into Events "+event_query+" values('"+event+"',"+timestamp+","+timestamp+",'"+lat1+"','"+lat1+"','"+long1+"','"+long1+"',"+bearing+","+bearing+","+speed+","+speed+");")
}

update=(tx,lat1,long1,speed,bearing,timestamp,event_row)=>{
  tx.executeSql("UPDATE Events set "+
              "curr_lat ='"+lat1+ "',"+
              "curr_long ='"+long1+ "',"+
              "curr_speed ="+speed+ ","+
              "curr_bearing ="+bearing+ ","+
              "curr_timestamp ="+timestamp +
              " where id ="+event_row.id);
}

  /*
  componentDidMount=()=>{
    this.test()
  }
  */
 componentWillMount(){
   var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
   db.transaction((tx) => {
   this.bar_disp('running',tx)
   this.bar_disp('stop',tx)
   this.bar_disp('turn',tx)
   this.bar_disp('deacc',tx)
   this.bar_disp('short break',tx)
   this.bar_disp('speeding',tx)
   this.bar_disp('sharp turn',tx)
   this.bar_disp('acc',tx)
 });
    this.props.navigation.setParams({ navigate: this.goToSettings });


     var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
     db.transaction((tx) => {

       tx.executeSql('CREATE TABLE IF NOT EXISTS Settings('+
                         'id REAL,'+
                         'running REAL,'+
                         'speeding REAL,'+
                         'deacceleration REAL,'+
                         'short_break REAL,'+
                         'turn REAL,'+
                         'acceleration REAL)');

       tx.executeSql('SELECT * FROM Settings', [], (tx, results) => {
         var len = results.rows.length;
         console.log("Settings",results.rows.item(1))
         if(len<=0){
           tx.executeSql('insert into Settings  values('+
                             '1,'+
                             '1,'+
                             '8,'+
                             '2,'+
                             '4,'+
                             '4,'+
                             '2)');
           }
         });

     tx.executeSql('SELECT * FROM Settings', [], (tx, results) => {
       var len = results.rows.length;
       var row = results.rows.item(0)
       console.log("Settings",results.rows.item(0))
       this.setState({settings:{
         acceleration:row.acceleration,
         deacceleration:row.deacceleration,
         short_break:row.short_break,
         speeding:row.speeding,
         turn:row.turn,
         running:row.running
       }
     })

     });

    });


 }


 goToSettings=()=>{
   const { navigate } = this.props.navigation;
   navigate('Settings')
 }

update=()=>{
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'});

  db.transaction((tx) => {

  tx.executeSql("UPDATE Events set "+
              "curr_lat ='"+lat1+ "',"+
              "curr_long ='"+long1+ "',"+
              "curr_speed ="+speed+ ","+
              "curr_bearing ="+bearing+ ","+
              "curr_timestamp ="+timestamp1 +
              " where id ="+event_row.id);
    });
}

button_m =() =>{
     var v = this.state.v
     if(v=='1')
     {
       this.setState({val:'Stop Tracking'})
       this.setState({v:'0'})
       this.start_tracking()
     }
     else
     {
       this.setState({val:'Start Tracking'})
       this.setState({v:'1'})
       this.stop_tracking()
      v=1
     }

  }


start_tracking_ios(){
    this.create()
    var k = this.state.settings

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 0,
      distanceFilter: 0,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000,
      fastestInterval: 500,
      activitiesInterval: 1000,
      stopOnStillActivity: false,

    });

    var flag = 0
    var flag_inside = 0
    var b1 = ""
    var b2 = ""
    var location_prev = 'none'

    BackgroundGeolocation.on('location', (location) => {
      if(location_prev === 'none'){
        location_prev=location
      }

      console.log(location)

      var bearing_diff = Math.abs(location.bearing - location_prev.bearing)
      console.log("prev:",location_prev,location)
      var timestamp1 = location.time
      var bearing = location.bearing
      var lat = JSON.stringify(location.latitude)
      var long = JSON.stringify(location.longitude)

      console.log("Flag",flag)

      console.log("bearing_diff1:",bearing_diff)
      console.log("b1",b1)

      if(bearing_diff>7 || flag == 1){
      console.log("flag:",flag)
      if(flag==0){
            b1 = {
            timestamp:parseInt(location_prev.time),
            bearing: location_prev.bearing,
            lat: JSON.stringify(location_prev.latitude),
            long:JSON.stringify(location_prev.longitude),
            speed:location_prev.speed

          }
           b2 = {
           timestamp:parseInt(location.time),
           bearing: location.bearing,
           lat: JSON.stringify(location.latitude),
           long:JSON.stringify(location.longitude),
           speed:location.speed

         }

          flag = 1
      }

      else{
        if( b2.timestamp - b1.timestamp >= 10000){
          b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}
          bearing_diff = Math.abs(b2.bearing - b1.bearing)
          flag = 0
          //console.log("This is flag")
        }

        else if( b2.timestamp - b1.timestamp >= 5000){
          b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}
          bearing_diff = Math.abs(b2.bearing - b1.bearing)

          if(bearing_diff > t_60 && bearing_diff<180){
            flag=0
          }
          else if( bearing_diff>180 && Math.abs(360-bearing_diff)>t_60){
            flag = 0
          }
        }

        else{
          b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}

        }
      }

       bearing_diff = Math.abs(b2.bearing - b1.bearing)
      }

      location_prev = location


      this.add(location.time,location.latitude,location.longitude,location.bearing,location.speed,location.accuracy,k,bearing_diff,b1,b2)


    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      console.log("S",stationaryLocation)
      // handle stationary locations here
      //Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });


   BackgroundGeolocation.start();

 }

 start_tracking(){
    var os = Platform.OS
    if(os==='ios'){
      this.start_tracking_ios()
    }
    else{
      this.start_tracking_android()
    }
  }

 start_tracking_android=()=>{
    this.create()
    var k = this.state.settings
    //this.retrive()
    const granted = true
    if (granted) {

       FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
       var location_prev =  FusedLocation.getFusedLocation();

       FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
       FusedLocation.setLocationInterval(2000);
       FusedLocation.setFastestLocationInterval(1000);
       FusedLocation.setSmallestDisplacement(0);

       FusedLocation.startLocationUpdates();
       var flag = 0
       var flag_inside = 0
       var b1 = ""
       var b2 = ""

       this.subscription = FusedLocation.on('fusedLocation', location => {
         // Turn
         console.log(location)

         var bearing_diff = Math.abs(location.bearing - location_prev.bearing)
         //console.log("prev:",location_prev,location)
         var timestamp1 = parseInt(location.timestamp)
         var bearing = location.bearing
         var lat = JSON.stringify(location.latitude)
         var long = JSON.stringify(location.longitude)

         console.log("Flag",flag)

         //console.log("bearing_diff1:",bearing_diff)
         //console.log("b1",b1)

         if(bearing_diff>15 || flag == 1){
         console.log("flag:",flag)
         if(flag==0){
               b1 = {
               timestamp:parseInt(location_prev.timestamp),
               bearing: location_prev.bearing,
               lat: JSON.stringify(location_prev.latitude),
               long:JSON.stringify(location_prev.longitude),
               speed:location_prev.speed

             }
              b2 = {
              timestamp:parseInt(location.timestamp),
              bearing: location.bearing,
              lat: JSON.stringify(location.latitude),
              long:JSON.stringify(location.longitude),
              speed:location.speed

            }

             flag = 1
         }

         else{
           if( b2.timestamp - b1.timestamp >= 15000){
             b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}
             bearing_diff = Math.abs(b2.bearing - b1.bearing)
             flag = 0
             console.log("I am >10000")
             console.log(">10000:",bearing_diff)

             //console.log("This is flag")
           }

           else if( b2.timestamp - b1.timestamp >= 9000){
             console.log("I am >5000")
             b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}
             bearing_diff = Math.abs(b2.bearing - b1.bearing)
             console.log(">5000:",bearing_diff)
             if(bearing_diff > t && bearing_diff<180){
               console.log(">40")
               flag=0
             }
             else if( bearing_diff>180 && Math.abs(360-bearing_diff)>t){
               console.log(">40 180")
               flag = 0
             }
           }

           else{
             console.log("I am b2 update")
             b2 = {timestamp:timestamp1,bearing:bearing,lat: lat,long:long}

           }
         }

          bearing_diff = Math.abs(b2.bearing - b1.bearing)
         }

         location_prev = location
         console.log("B1",b1)
         console.log("B2",b2)
         console.log("Current Bearing_diff",bearing_diff)


         this.add(parseInt(location.timestamp),location.latitude,location.longitude,location.bearing,location.speed,location.accuracy,k,bearing_diff,b1,b2)

       });
       this.errSubscription = FusedLocation.on('fusedLocationError', error => {
            this.setState({v:'e'})
            return
        })
      }
   }

   stop_tracking(){
     if(Platform.OS === 'ios'){
       this.stop_tracking_ios()
     }
     else{
       this.stop_tracking_android()
     }
   }

   stop_tracking_ios(){
     BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));

   }

   stop_tracking_android=()=>{
     FusedLocation.off(this.subscription);
     FusedLocation.stopLocationUpdates();
   }

    render(){
      const { navigate } = this.props.navigation;

        return (
                <View style = {styles.container}>
                  <View style = {styles.center}>
                      <View style={{width:'68%',alignItems:'flex-end'}}>
                          <AnimatedCircularProgress
                            size={120}
                            width={10}
                            tintColor="green"
                            rotation={0}
                            fill = {parseFloat((400-(this.state.short_break+this.state.sharp_turn+this.state.acc+this.state.speeding))/4)}
                            backgroundColor="#ef5350">
                            {
                              (fill) => (
                                <Text style={{color:'black'}}>
                                {fill.toFixed(2)}%
                                </Text>
                              )
                            }
                          </AnimatedCircularProgress>
                      </View>

                      <View style={{width:'42%',alignItems:'flex-start',padding:20}} >
                          <Text>Average</Text>
                          <Text>Overall Score</Text>
                      </View>
                </View>

                <View style = {styles.linear}>
                    <View style={styles.item}>
                        <AnimatedCircularProgress
                          size={80}
                          width={5}
                          tintColor="#ef5350"
                          rotation={0}
                          fill = {parseFloat(this.state.short_break+this.state.deacc)}
                          backgroundColor="green">
                        {
                          (fill) => (
                            <Text style={{color:'black'}}>
                              {fill.toFixed(2)}%
                            </Text>
                          )
                        }
                        </AnimatedCircularProgress>
                        <Text>Breaking</Text>
                    </View>
                    <View style={styles.item}>
                        <AnimatedCircularProgress
                          size={80}
                          width={5}
                          tintColor="#ef5350"
                          rotation={0}
                          fill = {parseFloat(this.state.acc)}
                          backgroundColor="green">
                        {
                          (fill) => (
                            <Text style={{color:'black'}}>
                            {fill.toFixed(2)}%
                            </Text>
                          )
                        }
                        </AnimatedCircularProgress>
                        <Text>Acceleration</Text>
                    </View>
              </View>
              <View style = {styles.linear}>
                <View style={styles.item}>
                <AnimatedCircularProgress
                  size={80}
                  width={5}
                  tintColor="#ef5350"
                  rotation={0}
                  fill = {parseFloat(this.state.speeding)}
                  backgroundColor="green">
                {
                  (fill) => (
                    <Text style={{color:'black'}}>
                    {fill.toFixed(2)}%
                    </Text>
                  )
                }
                </AnimatedCircularProgress>
                        <Text>Speeding</Text>
                        </View>
                        <View style={styles.item}>
                        <AnimatedCircularProgress
                          size={80}
                          width={5}
                          tintColor="#ef5350"
                          rotation={0}
                          fill = {parseFloat(this.state.turn+this.state.sharp_turn)}
                          backgroundColor="green">
                        {
                          (fill) => (
                            <Text style={{color:'black'}}>
                              {fill.toFixed(2)}%
                            </Text>
                          )
                        }
                        </AnimatedCircularProgress>
                        <Text>Cornering</Text>
                        </View>
              </View>

              <View style={this.button}>
                <View style={this.linear}>
                  <TouchableOpacity
                  style = {styles.submitButton} onPress={this.button_m}>
                  <Text style = {styles.submitButtonText}>{this.state.val}</Text>
                  </TouchableOpacity>

                </View>
                <View style ={this.linear}>
                  <TouchableOpacity
                    onPress={() => navigate("DrivingEvents")}
                    style = {styles.submitButton}>
                  <Text style = {styles.submitButtonText}>View Events</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate("Location")}
                    style={styles.submitButton}>
                    <Text style = {styles.submitButtonText}>Driving Map</Text>
                  </TouchableOpacity>
                </View>

             </View>
            </View>
          )
    }
  }
const styles = StyleSheet.create({

    container: {
     paddingTop: 14,
     flex: 1,
     justifyContent: 'space-around'
    },

    center:{
       alignItems:'center',
       flexDirection: 'row'
    },

    linear :
    {
      marginTop:10,
      flexDirection: 'row',
    },

    item :
    {
      width:'50%',
      alignItems:'center'
    },
    submitButton: {

    backgroundColor: '#00897B',
    padding: 10,
    margin:10,
    height: 40,
    alignItems: 'center'
    },

    submitButtonText:{
    color: 'white'
    },

    button:{
      height: '100%',
      width:'100%',
      backgroundColor: 'red'
    }

  })


const event_query = '(event,last_timestamp,curr_timestamp,last_lat,curr_lat,last_long,curr_long,last_bearing,curr_bearing,last_speed,curr_speed) '
const event_update = "(event,curr_timestamp,curr_lat,curr_long,curr_bearing,curr_speed)"
const acc_k = 2
const short_break_k = 4
const running_k = 1
const deacc_k = 2
const speeding_k = 7
const turn_k = 30
const merge_k = 10000
const t_60 = 50
const t = 80





////
////
////
