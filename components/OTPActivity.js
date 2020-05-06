import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';



class OTPActivity extends Component {

  constructor(props) {
    super(props);
    // this.loginCall = this.loginCall.bind(this);
    this.state = {
      JSONResult: '',
      one: '',
      two: '',
      three: '',
      four: '',
      status: '',
      wholeResult: '',
      loading: '',
      baseUrl: 'http://kd.smeezy.com/api',
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        // alert('Success');
        //  this.showLoading();
        //   this.loginCall();
      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter Username');
    }
  };

  static navigationOptions = {
    title: 'Login Screen',
  };




  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../images/bg.png')}>

          {/* <Text style={styles.headerText}>YYS</Text> */}

          <Image style={styles.headerLogo}
              source={require('../images/yys_shadow_logo.png')}>

            </Image>

          <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>


      

 
          <ImageBackground style={styles.imgBackground2}>

            <View style={styles.container}>
              <Text style={styles.normalText}>ENTER OTP</Text>

              <Text style={styles.enterOtpText}>Please type verification code</Text>
              <Text style={styles.enterOtpText}>sent to Email</Text>

              <View style={{ flexDirection: 'row' }}>

                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  onChangeText={one => this.setState({ one })}
                  maxLength={1}
                  keyboardType = 'number-pad'
                  style={styles.input}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  style={styles.input}
                  maxLength={1}
                  keyboardType = 'number-pad'
                  secureTextEntry={true}
                  onChangeText={two => this.setState({ two })}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  maxLength={1}
                  keyboardType = 'number-pad'
                  onChangeText={three => this.setState({ three })}
                  style={styles.input}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  style={styles.input}
                  maxLength={1}
                  keyboardType = 'number-pad'
                  secureTextEntry={true}
                  onChangeText={four => this.setState({ four })}
                />


              </View>

              <Text style={styles.sendagaintext} onPress={() => this.props.navigation.navigate('Signup')}>Did'nt recieve code send again</Text>

              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={() => this.props.navigation.navigate('Login')}>

                <Text style={styles.fbText}> CONTINUE </Text>

              </TouchableOpacity>

              <Text style={styles.changeemailtext} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Change Email</Text>


            </View>
          </ImageBackground>
      

        </ImageBackground>
    
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 30,
    fontSize: 120,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  headerdescription: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  input: {
    color: 'black',
    width: 10,
    height: 50,
    borderWidth: 0,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#ffffff'
  },
  normalText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  sendagaintext: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    marginBottom: 10
  },
  changeemailtext: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  enterOtpText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    marginBottom: 5
  },
  SubmitButtonStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#E88000',
    borderRadius: 20,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'

  },
  fbText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,

  },
  imgBackground2: {
    width: '90%',
    height: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    opacity: 0.9,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#004c68'
  },
  headerLogo: {
    marginTop:40,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center'
  }
});

export default OTPActivity;
