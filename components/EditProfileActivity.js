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
  SafeAreaView,
  Switch
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';

var deviceType, notificationValue;

class EditProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.displayProfile = this.displayProfile.bind(this);
    this.updateProfileApi = this.updateProfileApi.bind(this);
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      Phoneno: '',
      name: '',
      userId:'',
      notificationstatus: '',
      password: '',
      status: '',
      wholeResult: '',
      switchValue: false,
      profileUrl: 'http://203.190.153.22/yys/admin/app_api/get_cusomer_info',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_update_profile',
      notification_url: 'http://203.190.153.22/yys/admin/app_api/update_notification_info'
    };
  }


  static navigationOptions = {
    title: 'Profile Screen',
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  toggleSwitch = (value) => {
    if(value==true)
    {
      console.log('Switch  is: if ')
      this.setState({ switchValue: value })
      notificationValue="1"
 
    }
    else
    {
      console.log('Switch  is: else ')
      this.setState({ switchValue: value })
      notificationValue="0"
     // this.setState({ notificationstatus: '0' })
    }
   

    this.showLoading();
    this.updateNotificationStatus();


    console.log('Switch  is: ' + value)
  }



  displayProfile() {

    var url = this.state.profileUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.setState({ email: responseData.email_id })

          this.setState({ Phoneno: responseData.contact_no })

          this.setState({ name: responseData.first_name })

          this.setState({ notificationstatus: responseData.notification })
          if (this.state.notificationstatus == 1) {
            this.setState({ switchValue: true })
          }
          else {
            this.setState({ switchValue: false })
          }

        }


        console.log('response object:', responseData);

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  updateProfile = () => {

    if (Platform.OS === 'ios') {
      deviceType = 'ios'
    } else {
      deviceType = 'android'
    }

    console.log("update profile pressed=======");
    this.showLoading();
    this.updateProfileApi();
    
    };


  componentDidMount() {

    this.showLoading();
    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id ====" + this.state.userId);
        this.displayProfile();
       
      }
    });

  }



  updateProfileApi() {

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        full_name: this.state.name,
        email_id: this.state.email,
        contact_no: this.state.Phoneno,
        device_type: deviceType

      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
         // alert(responseData.message);
           this.props.navigation.navigate('Profile');
        }


        console.log('response object:', responseData);

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  updateNotificationStatus() {

    console.log("notification status==="+ this.state.notificationstatus );
    var url = this.state.notification_url;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        notification_id: notificationValue,

      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          alert(responseData.message);
          // this.props.navigation.navigate.goBack();
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

        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#0093c8', height: 60
        }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
          backgroundColor={'white'}
            onPress={() => { this.props.navigation.goBack() }} >


            <Image
              source={require('../images/back_blue.png')}
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>Edit Profile</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image
              source={require('../images/notification.png')}
              style={styles.notificationIconStyle}
            />

          </TouchableOpacity>
        </View>

        

        <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white' }} >

          <View style={{
            flexDirection: 'column', backgroundColor: '#0093c8', borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20, height: 200,  alignItems: 'center', elevation: 20,
            shadowColor: '#D0D0D0', justifyContent: 'center', shadowColor: 'black',width: '100%',
            shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1 }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .40 }}
                onPress={() => { }} >

                <Image
                  source={require('../images/demo_profile.jpg')}
                  style={{ width: 100, height: 100, borderRadius: 100 / 2, marginLeft: 50, borderWidth: 2, borderColor: 'white' }}
                />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
                onPress={() => { }} >

<           TextInput
                  placeholder={'Full Name'}
                  placeholderTextColor="white"
                  underlineColorAndroid="white"
                  style={styles.inputUserName}
                  numberOfLines={2}
                  multiline={true}
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}

                />


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {this.props.navigation.navigate('EditProfile')}} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />

              </TouchableOpacity>

            </View>

          </View>

          <View style={{
            flexDirection: 'column', backgroundColor: 'white', borderRadius: 20, marginTop: 10,
         alignSelf: 'center',marginBottom:80,
            height: 300, width: '97%', alignItems: 'center', elevation: 20, shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1}}>


            <View style={{
              flexDirection: 'row', marginTop: 10, alignItems: 'center',
              justifyContent: 'center', marginTop: 50
            }}>

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
                  editable={false}
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  value={this.state.email}



                />

              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                {/* <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editinfoiconStyle} /> */}



              </TouchableOpacity>


            </View>

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0093c8" />
              </View>
            )}

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
                  underlineColorAndroid="#0093c8"
                  style={styles.input}
                  onChangeText={Phoneno => this.setState({ Phoneno })}
                  value={this.state.Phoneno}

                />


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editinfoiconStyle} />

              </TouchableOpacity>


            </View>




            <View style={{ flexDirection: 'row', marginTop: 13, alignItems: 'center', justifyContent: 'center'
           }}>

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

                <Text style={{ color: '#4D4D4D', marginLeft: 10, fontSize: RFPercentage(2) }}>Notification</Text>


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Switch
                  onValueChange={this.toggleSwitch}
                  value={this.state.switchValue} />

              </TouchableOpacity>



            </View>

            <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}
                            onPress={this.updateProfile }>

                            <Text style={styles.experttext}> UPDATE PROFILE </Text>

                        </TouchableOpacity>

         


          </View>


        </ScrollView>




        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
          shadowColor: 'grey', elevation: 20,
            shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1
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
            onPress={() => { this.props.navigation.navigate('Contactus') }}>

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
    flex: 1
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
  notificationIconStyle: {
    tintColor : '#f5f6f6',
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
    alignSelf: 'center',
    alignItems: 'center',
    tintColor:'white',
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
  inputUserName: {
    color: 'white',
    height: 40,
    borderWidth: 0,
    alignSelf:'center',
    justifyContent:'center',
    marginLeft: 5,
    alignItems:'center',
    fontSize: RFPercentage(2.7),
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
    tintColor: 'white'
  },
  editinfoiconStyle: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expertButtonStyle: {
    marginTop: 48,
    width: 300,
    height: 50,
    fontWeight: 'bold',
    borderRadius: 8,
    borderColor: '#0093c8',
    borderWidth: 2,
    fontSize: RFPercentage(10),
    backgroundColor: '#0093c8',
    justifyContent: 'center',
    alignSelf: 'center',
    // Setting up View inside component align horizontally center.
    alignItems: 'center',
},
experttext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
},
});

export default EditProfileActivity;
