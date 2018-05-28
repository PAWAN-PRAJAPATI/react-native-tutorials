import {
  StyleSheet,
} from 'react-native';




 var styles = StyleSheet.create({
        listinthis:{
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
        },

       heading:{
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'burlywood',
         borderRadius:10,
         margin:17
       },
       main:{
         flex:1,
         flexDirection:'column',
         alignItems:'center',
         marginTop:30,
         backgroundColor:'antiquewhite',
       },
       list:{
         flexDirection:'row',
         backgroundColor:'burlywood',
         borderRadius:10,
         margin:3,
         alignItems: 'center',
         justifyContent: 'center',
         height: 50,

       },
       listtext:{
         textAlign: 'center',
         flex:1,
         margin:7,
       },
       inputs:{
         width:'90%',
         height:50,
         borderColor: 'gray',
         borderWidth: 1,
         borderRadius:10,
         padding:3,
         margin:13,
         backgroundColor: '#fff0ed',
       },
});

module.exports = styles;
