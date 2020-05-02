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
  ImageBackground
} from 'react-native';
import CheckBox from 'react-native-check-box'
//import AsyncStorage from '@react-native-community/async-storage';



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
          resizeMode='cover'
          source={require('../images/bg.png')}>

          <View style={styles.container}>

            <Text style={styles.headerText}>YYS</Text>
            <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>

            <TextInput
              placeholderTextColor="#C7E8F2"
              underlineColorAndroid='#C7E8F2'
              onChangeText={fullname => this.setState({ fullname })}
              placeholder={'Full Name'}
              style={styles.input}
            />

            <TextInput
              placeholderTextColor="#C7E8F2"
              underlineColorAndroid='#C7E8F2'
              onChangeText={username => this.setState({ username })}
              placeholder={'Email'}
              style={styles.input}
            />

            <TextInput
              placeholder={'Password'}
              placeholderTextColor="#C7E8F2"
              underlineColorAndroid='#C7E8F2'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
            <TextInput
              placeholder={'Confirm Password'}
              placeholderTextColor="#C7E8F2"
              underlineColorAndroid='#C7E8F2'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={confirmpassword => this.setState({ confirmpassword })}
            />

            <CheckBox

              onClick={() => {
                this.setState({ isChecked: !this.state.isChecked })
                if (!this.state.isChecked) {

                }

              }}
              isChecked={this.state.isChecked}
            />


            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5} 
              onPress={this.props.navigation.navigate('Otp')}>

              <Text style={styles.fbText}> SIGN UP </Text>
            </TouchableOpacity>

            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Login')}>Already have an account?  Login now</Text>


            <Text style={styles.skipbrowseText} onPress={() => this.props.navigation.navigate('Dashboard')}>Skip & Browse</Text>


          </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 50,
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
    padding: 10,
    borderWidth: 0,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  normalText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#F0F5FE',
    alignSelf: 'center'
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
    fontWeight: 'bold',
    alignItems: 'center'
  },
  fbText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  }
});

export default SignupActivity;
