import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

class VideoCallActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      name: '',
      lastLogin: '',
    };
  }


  componentDidMount() {

    AsyncStorage.getItem('@fullname').then((name) => {
      if (name) {
        this.setState({ name: name });
        console.log("name ====" + this.state.name);
      }
    });

    AsyncStorage.getItem('@last_login').then((last_login) => {
      if (last_login) {
        this.setState({ lastLogin: "last login: " + last_login });
        console.log("name ====" + this.state.lastLogin);
      }
    });

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });

  };

  openContractLog = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('contractLog')
  };

  openProfile = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('Profile')
  };

  openAboutus = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('Aboutus')
  };

  openDashboard = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('Dashboard')
  };

  openTermsConditions = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('TermsCondition')
  };

  openContactus = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('Contactus')
  };

  openQuestionLog = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('QuestionLog')
  };

  logout = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    AsyncStorage.setItem('@is_login', "");
    this.props.navigation.navigate('Splash')
  };


  render() {
    return (
      // <View style={styles.container}>

      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.toggleModal} >

            <Image source={require('../images/menu.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}></Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image source={require('../images/notification.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback onPress={() => this.setState({ isModalVisible: false })}>

          <Modal isVisible={this.state.isModalVisible}
            style={styles.modal}
            hasBackdrop={true}
            animationIn={"slideInLeft"}
            animationOut={"slideOutLeft"}
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300} >

            <TouchableWithoutFeedback onPress={() => this.setState({ isModalVisible: false })}>

              <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#007BA8' }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { }} >

                    <Image source={require('../images/orange_circle_right.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, flexDirection: 'column' }}
                    onPress={() => { }} >


                    <Text style={styles.usernameStyle}>{this.state.name}</Text>

                    <Text style={styles.logindetailtextstyle}>{this.state.lastLogin}</Text>

                  </TouchableOpacity>

                </View>



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openDashboard} >

                    <Image source={require('../images/home_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80 }}
                    onPress={this.openDashboard} >

                    <Text style={styles.menutitlestyle}>Home</Text>

                  </TouchableOpacity>

                </View>



                <View style={{
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                  padding: 15
                }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openProfile} >

                    <Image source={require('../images/profile_menu.png')}
                      style={styles.MenuProfileIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openProfile} >

                    <Text style={styles.menutitlestyle}>Profile</Text>

                  </TouchableOpacity>

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openContractLog} >


                    <Image source={require('../images/contract_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openContractLog} >

                    <Text style={styles.menutitlestyle}>Contract Log</Text>

                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={
                      this.openQuestionLog
                    } >

                    <Image source={require('../images/questionlog_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openQuestionLog} >

                    <Text style={styles.menutitlestyle}>Question</Text>

                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openContactus} >

                    <Image source={require('../images/contactus_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openContactus} >

                    <Text style={styles.menutitlestyle}>Contact us</Text>

                  </TouchableOpacity>

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openAboutus} >

                    <Image source={require('../images/terms_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openAboutus} >

                    <Text style={styles.menutitlestyle}>About us</Text>

                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openTermsConditions} >

                    <Image source={require('../images/terms_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openTermsConditions} >

                    <Text style={styles.menutitlestyle}>Terms & Conditions</Text>

                  </TouchableOpacity>

                </View>


                <View style={{
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
                  flex: 1, padding: 15
                }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.logout} >


                    <Image source={require('../images/logout_menu.png')}
                      style={styles.MenuProfileIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.logout} >

                    <Text style={styles.menutitlestyle}>Logout</Text>

                  </TouchableOpacity>

                </View>


              </SafeAreaView>

            </TouchableWithoutFeedback>
          </Modal>

        </TouchableWithoutFeedback>


        <Text style={styles.headerdescription}>UNDER DEVELOPMENT</Text>


        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, elevation: 20,
          shadowColor: 'grey', elevation: 20,
          shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
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

            <Image source={require('../images/support-active.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>
        </View>


        {/* </View> */}

      </SafeAreaView>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  headerdescription: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    flex: 1
  },
  screenntitlestyle: {
    color: "#0094CD",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    width: 300,
    justifyContent: undefined,
  },
  MenuIconStyle: {
    height: RFPercentage(3.5),
    width: RFPercentage(3.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuProfileIconStyle: {
    height: RFPercentage(3.9),
    width: RFPercentage(3.2),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logindetailtextstyle: {
    color: "white",
    fontSize: 10
  },
  usernameStyle: {
    color: "white",
    fontSize: 15
  },
  menutitlestyle: {
    color: "white",
    fontSize: RFPercentage(1.8)
  }
});

export default VideoCallActivity;
