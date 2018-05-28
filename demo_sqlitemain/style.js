import {StyleSheet} from 'react-native'

 styles = StyleSheet.create({
   listinthis:{
     justifyContent: 'center',
     alignItems: 'center',
     width: "100%",
     height: '100%',
    

   },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox:{
    marginTop: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  searchnadd:{
    flexDirection: 'row',
    backgroundColor: '#d9e1df50',
    width: '100%',
    height: 70,
    marginTop:50
  },
  inputs:{
    width:'90%',
    height:40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
    padding:3,
    margin:13,
    marginTop: 10,
    backgroundColor: '#fff0ed50',
  },
  searchbar:{
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    margin: 7,
  },
  submit:{
    width: '20%',
    height:40,
    backgroundColor: '#ef5350',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop:7
  },
  list:{
    flexDirection:'column',
    backgroundColor:'white',
    borderRadius:4,
    margin:7,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '94%',
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'gray',
    shadowOpacity: 1.0,shadowRadius:4

  },
  listtext:{
    color:'#ef5350',
    textAlign: 'center',
    flex:1,
    margin:7,
    fontSize: 17
  },

});
module.exports = styles;
