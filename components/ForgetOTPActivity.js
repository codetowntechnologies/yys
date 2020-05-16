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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

var  email;


class ForgetOTPActivity extends Component {

  constructor(props) {
    super(props);
    this.verifyotpregisteration = this.verifyotpregisteration.bind(this);
    this.sendotp = this.sendotp.bind(this);
    this.state = {
      JSONResult: '',
      one: '',
      two: '',
      three: '',
      four: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/match_forget_otp',
      otpUrl:  'http://203.190.153.22/yys/admin/app_api/forget_send_otp'
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
              this.showLoading();
            this.verifyotpregisteration();
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
    title: 'Forget otp Screen',
  };


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {
    const { navigation } = this.props;
    email = navigation.getParam('email', 'no-email');
  }


  verifyotpregisteration() {
   
    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        email_id: email,
        otp: this.state.one + this.state.two + this.state.three + this.state.four
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
            this.props.navigation.navigate('ResetPassword', {
                email: this.state.email,
                otp: this.state.one + this.state.two + this.state.three + this.state.four
              })

        //  this.props.navigation.navigate('ResetPassword')
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
        email_id: email
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

          <Image style={styles.headerLogo}
            source={require('../images/yys_shadow_logo-new.png')}>

          </Image>

          <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>



          <ImageBackground style={styles.imgBackground2}>

            <View style={styles.container2}>
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
                <ActivityIndicator size="large" color="#0094CD" />
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
                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                Change Email</Text>


            </View>
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
    alignItems: 'center',
    backgroundColor: '#0093c8'
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  imgBackground2: {
    width: '90%',
    height: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
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

export default ForgetOTPActivity;
