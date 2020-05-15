import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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
import AsyncStorage from '@react-native-community/async-storage';


var deviceType;



class ProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      password: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_login'
    };
  }


  static navigationOptions = {
    title: 'Login Screen',
  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.email != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        if (Platform.OS === 'ios') {
          deviceType = 'ios'
        } else {
          deviceType = 'android'
        }

        this.showLoading();
        this.logincall();

      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter email');
    }
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  logincall() {
   
    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        email_id: this.state.email,
        password: this.state.password,
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
          this.saveLoginUserData(responseData);
        }
   
  
       // console.log('response object:', responseData);
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
      await AsyncStorage.setItem('@is_login', "1");
      
      this.props.navigation.navigate('HomeNaviagtion') 
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async moveUserNextScreen() {
    try {
      await AsyncStorage.setItem('@is_login', "0");
      this.props.navigation.navigate('HomeNaviagtion') 
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
    return (
    
        <SafeAreaView style={styles.container}>


          <ScrollView>


          </ScrollView>


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
});

export default ProfileActivity;
