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
import CheckBox from 'react-native-check-box'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';


class SignupActivity extends Component {
  constructor(props) {
    super(props);
    this.signupCall = this.signupCall.bind(this);
    this.state = {
      JSONResult: '',
      fullname: '',
      email: '',
      password: '',
      confirmpassword: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/send_otp',
    };
  }


  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.fullname != '') {
      //Check for the Name TextInput
      if (this.state.email != '') {
        //Check for the Name TextInput
        if (this.state.password != '') {
          //Check for the Email TextInput
          if (this.state.password == this.state.confirmpassword) {

            if (this.state.isChecked) {

              this.showLoading();
              this.signupCall();

            } else {
              alert('please accept terms and conditions to continue');
            }

          } else {
            alert('password and confirm password are not matched, please check again');
          }
        } else {
          alert('Please Enter Password');
        }
      } else {
        alert('Please Enter email');
      }
    } else {
      alert('Please Enter Fullname');
    }
  };

  static navigationOptions = {
    title: 'Signup Screen',
  };


  signupCall() {
    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        full_name: this.state.fullname,
        email_id: this.state.email
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.props.navigation.navigate('Otp', {
            password: this.state.password,
            fullname: this.state.fullname,
            email: this.state.email,
          })

        }

        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }

  async moveUserNextScreen() {
    try {
      await AsyncStorage.setItem('@is_login', "0");
      this.props.navigation.navigate('Dashboard')
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>

        <ScrollView>

          <View style={styles.container}>

            <Image style={styles.headerLogo}
              source={require('../images/yys_shadow_logo-new.png')}>

            </Image>

            <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>

            <View style={styles.SectionStyle}>

              <Image source={require('../images/user.png')}
                style={styles.ImagelockIconStyle} />

              <TextInput
                placeholderTextColor="#C7E8F2"
                underlineColorAndroid='transparent'
                onChangeText={fullname => this.setState({ fullname })}
                placeholder={'Full Name'}
                style={styles.input}
              />
            </View>

            <View style={styles.SectionStyle}>

              <Image source={require('../images/email.png')}
                style={styles.ImageIconStyle} />


              <TextInput
                placeholderTextColor="#C7E8F2"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                placeholder={'Email'}
                style={styles.input}
              />

            </View>

            <View style={styles.SectionStyle}>

              <Image source={require('../images/lock.png')}
                style={styles.ImagelockIconStyle} />


              <TextInput
                placeholder={'Password'}
                placeholderTextColor="#C7E8F2"
                underlineColorAndroid='transparent'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />

            </View>


            <View style={styles.SectionStyle}>

              <Image source={require('../images/lock.png')}
                style={styles.ImagelockIconStyle} />


              <TextInput
                placeholder={'Confirm Password'}
                placeholderTextColor="#C7E8F2"
                underlineColorAndroid='transparent'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={confirmpassword => this.setState({ confirmpassword })}
              />

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', textAlign: 'center', alignSelf: 'center' }}>

              <CheckBox
                uncheckedCheckBoxColor={'white'}
                checkedCheckBoxColor={'white'}
                value={this.state.isChecked}
                onValueChange={() => this.setState({ isChecked: !this.state.isChecked })}
                onClick={() => {
                  this.setState({ isChecked: !this.state.isChecked })
                  if (!this.state.isChecked) {

                  }

                }}
                isChecked={this.state.isChecked}
              />

              <Text
                style={{
                  marginTop: 5, color: 'white', marginHorizontal: 5, textAlign: 'center',
                  borderBottomWidth: 1, borderColor: '#C7E8F2'
                }}
                onPress={() => this.props.navigation.navigate('TermsCondition')}


              >Accept Terms and Conditions </Text>


            </View>

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}

            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5}
              onPress={this.CheckTextInput}>
              {/* onPress={() => this.props.navigation.navigate('Otp')}>  */}

              <Text style={styles.fbText}> SIGN UP </Text>
            </TouchableOpacity>



            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Login')}>Already have an account?  Login now</Text>


            <Text style={styles.skipbrowseText} onPress={() =>

              this.moveUserNextScreen()}

            >Skip & Browse</Text>

          </View>

        </ScrollView>
      </SafeAreaView>
      // </ImageBackground>
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
    backgroundColor: '#0093c8'
  },
  headerLogo: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  ImageIconStyle: {
    height: 20,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagelockIconStyle: {
    height: 30,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: RFValue(10, 580),
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 50
  },
  input: {
    color: '#ffffff',
    width: 300,
    height: 44,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  normalText: {
    fontSize: RFValue(12, 580),
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  skipbrowseText: {
    fontSize: 20,
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 43,
    marginTop: 30,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  SubmitButtonStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#FFC100',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    // Setting up View inside component align horizontally center.
    alignItems: 'center',
    fontWeight: 'bold',
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#C7E8F2',
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 1,
    margin: 10,
    flexDirection: 'row'
  },
});

export default SignupActivity;

