import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';
import NotifService from '../components/notification/NotifService';


var deviceType;
var token;

class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.state = {
      JSONResult: '',
      registerToken:'',
      email: '',
      password: '',
      status: '',
      wholeResult: '',
      selectedLanguage:'',
      deviceToken: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_login'
    };

    // this.notif = new NotifService(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  //  onRegister(token) {
  //   this.setState({registerToken: token.token, fcmRegistered: true});
  // }

  // onNotif(notif) {
  //   Alert.alert(notif.title, notif.message);
  // }

  // handlePerm(perms) {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // }

  static navigationOptions = {
    title: 'Login Screen',
  };

  componentDidMount() {
    AsyncStorage.getItem('@token').then((token) => {
      if (token) {  
        if(token!=null || token =="")
        {
          this.setState({deviceToken:token})
        }
         console.log("selected token login ===" + token)
      }
    });
  }

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
        console.log("registed token===" + this.state.deviceToken)
        this.logincall();

      } else {
        alert(stringsoflanguages.please_enter_password);
      }
    } else {
      alert(stringsoflanguages.please_enter_email);
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
        device_token: this.state.deviceToken
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
      await AsyncStorage.setItem('@last_login', responseData.last_login.toString());
      await AsyncStorage.setItem('@language', responseData.language.toString());

      console.log("language after login====" + responseData.language.toString());

      if(responseData.language.toString()=="English")
      {
        stringsoflanguages.setLanguage("en");
      }else{
        stringsoflanguages.setLanguage("ar");
      }

      if(responseData.contact_no==null|| responseData.contact_no=="")
      {
        // do nothing
      }else
      {
        await AsyncStorage.setItem('@contact_no', responseData.contact_no.toString());
      }
  

    
      await AsyncStorage.setItem('@is_login', "1");
      
      this.props.navigation.navigate('Dashboard') 
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async moveUserNextScreen() {
    try {
      await AsyncStorage.setItem('@is_login', "0");
      this.props.navigation.navigate('Dashboard') 
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }



  render() {
    return (


        <SafeAreaView style={styles.container}>


          <ScrollView>

            <Image style={styles.headerLogo}
              source={require('../images/yys_shadow_logo-new.png')}>

            </Image>


            <Text style={styles.headerdescription}>{stringsoflanguages.sponsored_by_yys_legal_from_office}</Text>


            <View style={styles.datacontainer}>

              <View style={styles.SectionStyle}>

                <Image source={require('../images/email.png')}
                  style={styles.ImageIconStyle} />

                <TextInput
                   placeholder={stringsoflanguages.email_placeholder}
                  placeholderTextColor="#C7E8F2"
                  onChangeText={email => this.setState({ email })}
                  placeholder={stringsoflanguages.email_placeholder}
                  underlineColorAndroid="transparent"
                  style={styles.input}
                />

              </View>

              <View style={styles.SectionStyle}>

                <Image source={require('../images/lock.png')}
                  style={styles.ImagelockIconStyle} />


                <TextInput
                  placeholder={stringsoflanguages.password_placeholder}
                  placeholderTextColor="#C7E8F2"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </View>

              
            

    <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>{stringsoflanguages.forgot_passowrd_text}</Text>
    <Text style={styles.createnewaccounttext} onPress={() => this.props.navigation.navigate('Signup')}>{stringsoflanguages.dont_have_an_account_text}</Text>

              {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}

              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={this.CheckTextInput}>


                <Text style={styles.fbText}>{stringsoflanguages.login_button_text}</Text>

              </TouchableOpacity>

              <Text style={styles.skipbrowseText} onPress={() => 
                
                this.moveUserNextScreen()
            
                }>{stringsoflanguages.skip_n_browse_text}</Text>


            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0093c8'
  },
  datacontainer: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerdescription: {
    marginTop: 20,
    fontSize: RFValue(10, 580),
    textAlign: 'center',
    color: '#FFFFFF'
  },
  input: {
    color: '#ffffff',
    width: 300,
    height: 44,
    padding: 10,
    textAlign:'left',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  normalText: {
    fontSize: RFPercentage(2),
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 10,  
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  createnewaccounttext: {
    fontSize: RFPercentage(2),
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 10,  
    marginTop:5,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  SubmitButtonStyle: {
    marginTop: 50,
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
  skipbrowseText: {
    fontSize: 20,
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 10,
    marginTop: 30,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  fbText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    alignContent: 'center',
    fontWeight: 'bold'
  },

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },

  headerLogo: {
    marginTop: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  ImageIconStyle: {
    height: 25,
    width: 25,
    marginLeft:10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagelockIconStyle: {
    height: 30,
    width: 25,
    marginLeft:10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#C7E8F2',
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 1,
    margin: 10,
  },
});

export default LoginActivity;
