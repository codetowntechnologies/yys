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
  ImageBackground
} from 'react-native';
import CheckBox from 'react-native-check-box'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



class SignupActivity extends Component {
  constructor(props) {
    super(props);
    // this.loginCall = this.loginCall.bind(this);
    this.state = {
      JSONResult: '',
      fullname: '',
      password: '',
      confirmpassword: '',
      status: '',
      wholeResult: '',
      loading: '',
      baseUrl: 'http://kd.smeezy.com/api',
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.fullname != '') {
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
      alert('Please Enter Fullname');
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
      <View style={styles.container}>


        <ImageBackground style={styles.imgBackground}
          resizeMode='stretch'
          source={require('../images/bg.png')}>
          <ScrollView >

            <View style={styles.container}>

              <Text style={styles.headerText}>YYS</Text>
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
                  onChangeText={username => this.setState({ username })}
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
                  value={this.state.isChecked}
                  onValueChange={() => this.setState({ isChecked: !this.state.isChecked })}

                  onClick={() => {
                    this.setState({ isChecked: !this.state.isChecked })
                    if (!this.state.isChecked) {

                    }

                  }}
                  isChecked={this.state.isChecked}
                />
                <Text style={{ marginTop: 5, color: 'white', marginHorizontal: 5, textAlign: 'center' }}>Accept Terms and Conditions </Text>
              </View>


              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={() => this.props.navigation.navigate('Otp')}>

                <Text style={styles.fbText}> SIGN UP </Text>
              </TouchableOpacity>



              <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Login')}>Already have an account?  Login now</Text>


              <Text style={styles.skipbrowseText} onPress={() => this.props.navigation.navigate('Dashboard')}>Skip & Browse</Text>

            </View>

          </ScrollView>
        </ImageBackground>
      </View>
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
    flex: 1
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
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    marginBottom: 50
  },
  input: {
    color: '#ffffff',
    width: 300,
    height: 44,
    marginBottom: 10,
    marginLeft:10,
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
    backgroundColor: '#E88000',
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
