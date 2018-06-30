import SQLite from 'react-native-sqlite-storage'

export default class AppDB{

constructor(name,location){
   this.name = name;
   this.location= location;
   this.db = SQLite.openDatabase({name:this.name,location: this.location});
   console.log("Initialize",this.name,this.location)
}


  selectEvent(time1,time2,callback){
    this.db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Events WHERE curr_timestamp >= '+time1+' and prev_timestamp <='+time2, [], (tx, results) => {
        console.log("SELECT completed");
        callback(results);
      });
    });
  }


}


