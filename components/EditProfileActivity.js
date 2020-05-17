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
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';

var deviceType;


class EditProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      phone: '',
      password: '',
      status: '',
      wholeResult: '',
      notificationstatus: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_login'
    };
  }


  static navigationOptions = {
    title: 'Profile Screen',
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
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
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




  render() {
    return (

      <SafeAreaView style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
        backgroundColor: '#0093c8', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >


            <Image
              source={require('../images/back_blue.png')}
              tintColor='#f5f6f6'
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>My Profile</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image
              source={require('../images/notification.png')}
              tintColor='#f5f6f6'
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <ScrollView style={{ flexDirection: 'column' }} >

          <View style={{
            flexDirection: 'column', backgroundColor: '#0093c8', borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20, height: 200, width: 392, alignItems: 'center', elevation: 20,
            shadowColor: '#D0D0D0', justifyContent: 'center'
          }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .20, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center'
              }}
                onPress={() => { }} >

                <Image

                  source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png', }}
                  //borderRadius style will help us make the Round Shape Image
                  style={{ width: 100, height: 100, borderRadius: 100 / 2, marginLeft: 50 }}
                />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .70, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >

                <Text style={styles.usernameStyle}>Rahul Kumar</Text>


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  tintColor={'white'}
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />



              </TouchableOpacity>

            </View>



          </View>

          <View style={{
            flexDirection: 'column', backgroundColor: 'white', borderRadius: 20, marginTop: 10, margin: 5,
            height: 220, width: 380, alignItems: 'center', elevation: 20, shadowColor: '#0000'
          }}>


            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/email_blue.png')}
                  tintColor={'#0093C8'}
                  style={styles.EmailIconStyle} />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <TextInput
                  placeholderTextColor="#4D4D4D"
                  onChangeText={email => this.setState({ email })}
                  placeholder={'Email'}
                  underlineColorAndroid="transparent"
                  style={styles.input}
                />

              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />



              </TouchableOpacity>

            
            </View>

           

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/call.png')}
                  tintColor={'#0093C8'}
                  style={styles.EmailIconStyle} />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <TextInput
                  placeholder={'Phone Number'}
                  placeholderTextColor="#4D4D4D"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={Phoneno => this.setState({ Phoneno })}
                />


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />

              </TouchableOpacity>


            </View>

           


            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/lock.png')}
                  tintColor={'#0093C8'}
                  style={styles.ImagelockIconStyle} />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <TextInput
                  placeholder={'Password'}
                  placeholderTextColor="#4D4D4D"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />



              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />



              </TouchableOpacity>

            </View>





            <View style={{ flexDirection: 'row', marginTop: 13, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/notification.png')}
                  style={styles.ImageIconStyle}
                />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <Text style={{ color: '#4D4D4D', marginLeft: 10 }}>Notification</Text>


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />



              </TouchableOpacity>

            </View>

          </View>


        </ScrollView>


        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <Image source={require('../images/question-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>

          <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

            <View style={{ flex: 1 }}>
              <ActionButton buttonColor="#0094CD">

                <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

                </ActionButton.Item>
                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { console.log("notes tapped!") }}
                >

                  <Image source={require('../images/chat_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { }}>

                  <Image source={require('../images/question_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { }}>


                </ActionButton.Item>

              </ActionButton>
            </View>
          </View>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
            onPress={() => { this.props.navigation.navigate('contractLog') }}>

            <Image source={require('../images/contract-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('VideoCall') }}>

            <Image source={require('../images/support-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>
        </View>

      </SafeAreaView >


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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  screenntitlestyle: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacontainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'black',
    height: 40,
    borderWidth: 0,
    marginLeft: 5,
    width: '80%',
    fontSize: RFPercentage(2),
    textAlignVertical: 'bottom',
    backgroundColor: 'transparent'
  },
  ImagelockIconStyle: {
    height: 25,
    width: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmailIconStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameStyle: {
    color: "white",
    fontSize: 22
  },
  editiconStyle: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfileActivity;
