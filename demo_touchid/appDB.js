import SQLite from 'react-native-sqlite-storage'

export default class AppDB{

constructor(name,location){
   this.name = name;
   this.location= location;
   this.db = SQLite.openDatabase({name:this.name,location: this.location});
   console.log("Initialize",this.name,this.location)
}


create=()=>{
    //Create required table
      var db = this.db
      db.transaction((tx) => {
      tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS Location('+
                        'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
                        'timestamp REAL,'+
                        'pwd varchar(255),'+
                        'title varchar(255),'+
                        'note varchar(255),'
                    )

        console.log("Database Created");
      });
  }

  insert_pwd(timestamp,pwd,title,note){
      this.db.transaction((tx)=>{
          tx.executeSql("INSERT INTO pwd " + query + "values("+ timestamp + ",'" + pwd + "','" + title + "','" + note + "'")
      })
  }


  delete(){
    console.log("Delete")
    this.db.transaction((tx) => {
        tx.executeSql("delete from pwd")
    });
  }


}

const query = '(timestamp,pwd,title,note) '

