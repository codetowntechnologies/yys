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


class OTPActivity extends Component {

  constructor(props) {
    super(props);
    this.customerRegisteration = this.customerRegisteration.bind(this);
    this.sendotp = this.sendotp.bind(this);
    this.state = {
      JSONResult: '',
      one: '',
      two: '',
      three: '',
      four: '',
      status: '',
      wholeResult: '',
      device_type: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_registeration',
      otpUrl:  'http://203.190.153.22/yys/admin/app_api/send_otp'
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.one != '') {
      //Check for the Name TextInput
      if (this.state.two != '') {
        //Check for the Email TextInput
        if (this.state.three != '') {
          //Check for the Email TextInput
          if (this.state.four != '') {
            // alert('Success');
            //  this.showLoading();
            this.customerRegisteration();
          } else {
            alert('Please Enter otp correctly');
          }
        } else {
          alert('Please Enter otp correctly');
        }
      } else {
        alert('Please Enter otp correctly');
      }
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


  customerRegisteration() {
   
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
        opt_number: this.state.one + this.state.two + this.state.three + this.state.four,
        device_type: deviceType,
        device_token: '123'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if(responseData.status=='0')
        {
          alert(responseData.message);
        }else
        {
          this.props.navigation.navigate('Dashboard')
        }

     
     
        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
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
        if(responseData.status=='0')
        {
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
                  keyboardType='number-pad'
                  style={styles.input}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  style={styles.input}
                  maxLength={1}
                  keyboardType='number-pad'
                  secureTextEntry={true}
                  onChangeText={two => this.setState({ two })}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  maxLength={1}
                  keyboardType='number-pad'
                  onChangeText={three => this.setState({ three })}
                  style={styles.input}
                />
                <TextInput
                  flex={.15}
                  placeholderTextColor="#7f8ec5"
                  underlineColorAndroid='transparent'
                  style={styles.input}
                  maxLength={1}
                  keyboardType='number-pad'
                  secureTextEntry={true}
                  onChangeText={four => this.setState({ four })}
                />


              </View>

              {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}

              <View style={{ flexDirection: 'row' }}>

                <Text style={styles.didntrectext}>Did'nt recieve code </Text>
                <Text style={styles.sendagaintext} onPress={this.sendotp}>send again</Text>


              </View>

              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={this.CheckTextInput}>

                <Text style={styles.fbText}> CONTINUE </Text>

              </TouchableOpacity>

              <Text style={styles.changeemailtext}
                onPress={() => this.props.navigation.navigate('Signup')}>
                Change Email</Text>


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
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

export default OTPActivity;
