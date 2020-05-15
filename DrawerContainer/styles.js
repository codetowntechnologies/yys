import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // padding:20,
    // justifyContent: 'center'
    backgroundColor:"#fff"
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop:20
  },
  drawerHeader:{
    width:"100%",
    height:60,
    backgroundColor:"#e22034",
    // justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    paddingLeft:20
    
  },

  DrawerContainer:{
    flex: 1,
    backgroundColor:"#fff"
  },
  MenuItem:{
     width:"100%",
    //  height:50,
     borderBottomColor:"#aaa",
     borderBottomWidth:1,
     padding:10,
     justifyContent:"space-between",
     flexDirection:"row",
     alignItems:"center"
    
  }
});

export default styles;
