import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // marginLeft:10
  },
  btnIcon: {
    height: 25,
    width: 25,
    resizeMode:"contain"
  },
  btnText: {
    
    fontSize: 17,
    marginLeft: 10,
    marginTop: 2,
    fontFamily:"Raleway-Regular"
  }
});

export default styles;
