import {
  StyleSheet,
} from 'react-native';




 var styles = StyleSheet.create({
      header:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#84d3fe40',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 7,
      },
       main:{
         flex:1,
         flexDirection:'column',
         alignItems:'center',
         backgroundColor:'#d3fff1',
       },

       searchbar:{
         flexDirection: 'row',
         marginTop: 40,
         justifyContent: 'center',
         margin: 7,
       },

       content:{

       },

       inputs:{
         flex:5,
         height:50,
         borderColor: 'white',
         borderWidth: 1,
         borderRadius:10,
         backgroundColor: '#e5fffd20',
         marginRight: 4,
         padding:7,
       },

       submit:{
         flex:1,
         height:50,
         backgroundColor: '#84d3fe30',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 10,

       },
       listinthis:{
         justifyContent: 'center',
         alignItems: 'center',
         width: "100%",
       },
});

module.exports = styles;
