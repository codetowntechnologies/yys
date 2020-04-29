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
//import AsyncStorage from '@react-native-community/async-storage';



class LoginActivity extends Component {
  constructor(props) {
    super(props);
    // this.loginCall = this.loginCall.bind(this);
    this.state = {
      JSONResult: '',
      username: '',
      password: '',
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
      <View style={styles.container}>

        <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
        // source={require('../images/bg.png')}
        >

          <Text style={styles.headerText}>YYS</Text>
          <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>



          <View style={styles.container}>

            <TextInput
              placeholderTextColor="#7f8ec5"
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({ username })}
              placeholder={'Email'}
              style={styles.input}
            />
            <TextInput
              placeholder={'Password'}
              placeholderTextColor="#7f8ec5"
              underlineColorAndroid='transparent'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />

            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forget Password?</Text>
            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Signup')}>Don't have an account?  Create now</Text>


            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5} 
              onPress={() => this.props.navigation.navigate('Home')}>

              <Text style={styles.fbText}> LOGIN </Text>
              
            </TouchableOpacity>

            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Otp')}>Skip & Browse</Text>


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
    color: 'white'
  },
  input: {
    color: '#ffffff',
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 0,
    marginBottom: 10,
    backgroundColor: '#ffffff'
  },
  normalText: {
    fontSize: 15,
    textAlign: 'right',
    color: '#ffffff',
    marginRight: 43,
    alignSelf: 'flex-end'
  },
  SubmitButtonStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#dc8517',
    borderRadius: 20,
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
    backgroundColor: '#0093c8'
  }
});

export default LoginActivity;
