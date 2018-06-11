

  import React, { Component } from 'react'
  import { View, Text, TouchableOpacity, TextInput, StyleSheet,ScrollView,Image,Slider,Button } from 'react-native'
  import { AnimatedCircularProgress } from 'react-native-circular-progress'
  import FusedLocation from 'react-native-fused-location';
  import SQLite from 'react-native-sqlite-storage'


  export default class Bar extends Component {
    static navigationOptions = {
        headerTitle: "Settings",
        headerTintColor: 'white',
        headerStyle:{backgroundColor:'#00897B'},
      };

      state={
        running:0,
        short_break:0,
        acceleration:0,
        deacceleration:0,
        speeding:0,
        turn:0
      }

componentDidMount(){
      var db = SQLite.openDatabase({name: 'my.db', location: 'default'});
      db.transaction((tx) => {

       tx.executeSql('SELECT * FROM Settings', [], (tx, results) => {
         var len = results.rows.length;
         var row = results.rows.item(0)
         console.log("Settings",results.rows.item(0))
         this.setState({
           acceleration:row.acceleration,
           deacceleration:row.deacceleration,
           short_break:row.short_break,
           speeding:row.speeding,
           turn:row.turn,
           running:row.running
         })
       });
     });
}


      save=()=>{
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
          else{
            tx.executeSql("UPDATE Settings set "+
                        "running ="+this.state.running+ ","+
                        "short_break ="+this.state.short_break+ ","+
                        "acceleration ="+this.state.acceleration+ ","+
                        "deacceleration ="+this.state.deacceleration+ ","+
                        "turn ="+this.state.turn + ","+
                        "speeding ="+this.state.speeding + " " +
                        " where id = 1");
              }
            });
            //navigate("Home")
        });

    }


      render(){
        const { navigate } = this.props.navigation;
          return (
            <View>

                <View style={styles.main}>

                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Running</Text>
                  <Text>{this.state.running} m/s</Text>
                  </View>
                    <Slider value={parseFloat(this.state.running)} maximumValue={10} onValueChange={(value)=>{
                        this.setState({running:value.toFixed(2)})}} onSlidingComplete={this.save}/>
                  </View>

                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Short Break</Text>
                  <Text>{this.state.short_break}  m/s</Text>
                  </View>
                    <Slider maximumValue={10} onValueChange={(value)=>{this.setState({short_break:value.toFixed(2)})}} value={parseFloat(this.state.short_break)} onSlidingComplete={this.save}/>
                  </View>

                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Acceleration</Text>
                    <Text>{this.state.acceleration}  m/s</Text>
                  </View>
                    <Slider value={parseFloat(this.state.acceleration)} maximumValue={10} onValueChange={(value)=>{this.setState({acceleration:value.toFixed(2)})}} onSlidingComplete={this.save}/>
                  </View>

                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Deacceleration</Text>
                    <Text>{this.state.deacceleration}  m/s</Text>
                  </View>
                    <Slider value={parseFloat(this.state.deacceleration)} maximumValue={10} onValueChange={(value)=>{this.setState({deacceleration:value.toFixed(2)})}} onSlidingComplete={this.save}/>
                  </View>

                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Sharp Turn</Text>
                    <Text>{this.state.turn} m/s</Text>
                  </View>
                    <Slider value={parseFloat(this.state.turn)} maximumValue={10} onValueChange={(value)=>{this.setState({turn:value.toFixed(2)})}} onSlidingComplete={this.save}/>
                  </View>


                  <View style={styles.slider}>
                    <View style={styles.text}>
                    <Text>Speeding</Text>
                    <Text>{this.state.speeding}  m/s</Text>
                  </View>
                    <Slider value={parseFloat(this.state.speeding)} maximumValue={25} onValueChange={(value)=>{this.setState({speeding:value.toFixed(2)})}} onSlidingComplete={this.save}/>
                  </View>


                </View>


            </View>


        )
      }
    }
  const styles = StyleSheet.create({
      main:{
        marginTop: 20,
        width: '100%',
        height: '55%',
        flexDirection: 'column',


      },

      slider:{
        width: '100%',
        margin:7
      },
      text:{
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      navbarText:{
        color:'white',fontWeight: 'bold',fontSize: 20
      },
  })
