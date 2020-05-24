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

var password, fullname, email, deviceType;
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import stringsoflanguages from './locales/stringsoflanguages';


class OTPActivity extends Component {

  constructor(props) {
    super(props);
    this.sendotp = this.sendotp.bind(this);
    this.state = {
      JSONResult: '',
      one: '',
      two: '',
      three: '',
      four: '',
      status: '',
      otpcode: '',
      wholeResult: '',
      device_type: '',
      selectedLanguage:'',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_registeration',
      otpUrl: 'http://203.190.153.22/yys/admin/app_api/send_otp'
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.otpcode != '') {

            this.showLoading();
            this.customerRegisteration();
    
    } else {
      alert('Please Enter otp correctly');
    }
  };

  static navigationOptions = {
    title: 'OTP Screen',
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {
    const { navigation } = this.props;
    password = navigation.getParam('password', 'no-password');
    email = navigation.getParam('email', 'no-email');
    fullname = navigation.getParam('fullname', 'no-fullname');

    if (Platform.OS === 'ios') {
      deviceType = 'ios'
    } else {
      deviceType = 'android'
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@language').then((selectedLanguage) => {
      if (selectedLanguage) {
        if(selectedLanguage=="English")
        {
          stringsoflanguages.setLanguage("en");
        }else{
          stringsoflanguages.setLanguage("ar");
        }

      }
    });
  }


  customerRegisteration() {

    console.log("device type===" + deviceType)  

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        full_name: fullname,
        email_id: email,
        password: password,
        opt_number: this.state.otpcode,
        device_type: deviceType,
        device_token: '123'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          //    this.props.navigation.navigate('Dashboard')
          this.saveLoginUserData(responseData);
        }



        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }


  async saveLoginUserData(responseData) {
    try {
      await AsyncStorage.setItem('@user_id', responseData.id.toString());
      await AsyncStorage.setItem('@email', responseData.email_id.toString());
      await AsyncStorage.setItem('@fullname', responseData.full_name.toString());
      await AsyncStorage.setItem('@last_login', responseData.lastlogin.toString());


      await AsyncStorage.setItem('@is_login', "1");

      this.props.navigation.navigate('Dashboard')
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }


  sendotp() {

    this.showLoading();
    var url = this.state.otpUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        full_name: fullname,
        email_id: email
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        }


        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }




  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../images/bg.png')}> */}

        {/* <Text style={styles.headerText}>YYS</Text> */}

        <Image style={styles.headerLogo}
          source={require('../images/yys_shadow_logo-new.png')}>

        </Image>

        <Text style={styles.headerdescription}>{stringsoflanguages.sponsored_by_yys_legal_from_office}</Text>



        <ImageBackground style={styles.imgBackground2}>

          <View style={styles.container2}>
            <Text style={styles.normalText}>{stringsoflanguages.enter_otp}</Text>

        <Text style={styles.enterOtpText}>{stringsoflanguages.please_type_verification_code}</Text>
        <Text style={styles.enterOtpText}>{stringsoflanguages.sent_to_email}</Text>

            <View style={{ flexDirection: 'row' }}>

              <OTPInputView
                style={{ width: '80%', height: 100 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                  this.setState({ otpcode: code })
                //  console.log(`Code is ${code}, you are good to go!`)
                })}
              />

            </View>

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}

            <View style={{ flexDirection: 'row' }}>

              <Text style={styles.didntrectext}>{stringsoflanguages.didnt_received_code}</Text>
            <Text style={styles.sendagaintext} onPress={this.sendotp}>{stringsoflanguages.send_again}</Text>


            </View>

            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5}
              onPress={this.CheckTextInput}>

              <Text style={styles.fbText}>{stringsoflanguages.continue_button_text}</Text>

            </TouchableOpacity>

            <Text style={styles.changeemailtext}
              onPress={() => this.props.navigation.navigate('Signup')}>
              {stringsoflanguages.change_email}</Text>


          </View>
        </ImageBackground>


        {/* </ImageBackground> */}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0093c8'
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // headerText: {
  //   marginTop: 30,
  //   fontSize: 120,
  //   width: '100%',
  //   textAlign: 'center',
  //   color: 'white',
  //   fontWeight: 'bold'
  // },
  headerdescription: {
    marginTop: 20,
    fontSize: RFValue(10, 580),
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
  didntrectext: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    marginBottom: 10
  },
  sendagaintext: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline'
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
    backgroundColor: '#FFC100',
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

  // imgBackground: {
  //   width: '100%',
  //   height: '100%',
  //   flex: 1,

  // },
  imgBackground2: {
    width: '90%',
    height: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#004E6B'
  },
  headerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

export default OTPActivity;
