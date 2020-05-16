import React from 'react';
import {
  StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
  SafeAreaView, ActivityIndicator
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: .10, backgroundColor: item.reply == null || item.reply == "" ? "#999999" : "#dc8517", borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>
          <Image
            style={styles.clockiconstyle}
            source={
              require('../images/clock.png')
            } />

          <Text style={{ color: 'white', textAlign: 'center', fontSize: RFPercentage(1.7), fontWeight: 'bold', marginTop: 3 }}>{item.post_date}</Text>

        </View>

        <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
          <Text
            numberOfLines={3}
            ellipsizeMode='tail'
            style={{ color: '#383435', alignItems: 'center', fontSize: RFValue(12, 580) }}>{item.question}</Text>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end' }}>


            <Image
              source={require('../images/reply_blue.png')}
              tintColor={item.reply == null || item.reply == "" ? "#999999" : "#0094CD"} />

            <Text style={{ color: item.reply == null || item.reply == "" ? "#999999" : "#0093c8", alignSelf: 'flex-end', marginTop: 10, marginLeft: 5, fontSize: RFPercentage(2) }}>
              {item.reply == null || item.reply == "" ? "UNDER REVIEW" : "YYS ADVICED"} </Text>

          </View>
        </View>

      </View>
    </View>


  );
}

export default class QuestionLogActivity extends React.Component {

  constructor(props) {
    super(props);
    this.questionLogList = this.questionLogList.bind(this);
    this.state = {
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_question_log',
      userId: '',
      isModalVisible: false,

    };
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

  logout = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    AsyncStorage.setItem('@is_login', "");
    this.props.navigation.navigate('Splash')
  };


  static navigationOptions = {
    title: 'Question Log',
    gesturesEnabled: true,
  };


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {

    this.showLoading();
    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id ====" + this.state.userId);
        this.questionLogList();
      }
    });

  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>No Data Found</Text>
      </View>
    );
  };


  questionLogList() {

    var url = this.state.baseUrl;
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

          this.setState({ data: responseData.question_log });

        }

        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  actionOnRow(item) {

    this.props.navigation.navigate('QuestionLogDetail', {
      question_id: item.question_id
    })

    console.log('Selected Item :', item);

  }


  render() {
    return (
      <SafeAreaView style={styles.container}>

        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0094CD" />
          </View>
        )}

        <Modal isVisible={this.state.isModalVisible}
          style={styles.modal}
          hasBackdrop={true}
          animationIn={"slideInLeft"}
          animationOut={"slideOutLeft"}
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}


        >
          <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#007BA8' }}>

              <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >

                <Image source={require('../images/orange_circle_right.png')}
                  style={styles.MenuIconStyle} />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .80, flexDirection: 'column' }}
                onPress={() => { }} >

                <Text style={styles.usernameStyle}>Rahul Kumar</Text>

                <Text style={styles.logindetailtextstyle}>last login: 09 may 2020, 6:00 PM</Text>

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
                  this.toggleModal
                } >

                <Image source={require('../images/questionlog_menu.png')}
                  style={styles.MenuIconStyle} />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                onPress={this.toggleModal} >

                <Text style={styles.menutitlestyle}>Question Log</Text>

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


        </Modal>




        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.toggleModal} >

            <Image source={require('../images/menu.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>QUESTION LOG</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image source={require('../images/notification.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>


        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}

          renderItem={({ item }) => (

            <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

              <View>
                <Item item={item}
                />
              </View>

            </TouchableWithoutFeedback>

          )}
          keyExtractor={item => item.email}
          ListEmptyComponent={this.ListEmpty}
        />



        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <Image source={require('../images/question-active.png')}
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





      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5fd'
  },
  listItem: {
    margin: 10,
    backgroundColor: "#fbfbfb",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenntitlestyle: {
    color: "#0094CD",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
    fontSize: 18
  },
  MenuIconStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuProfileIconStyle: {
    height: 25,
    width: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockiconstyle: {
    height: 10,
    width: 10,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  modal: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    width: 300,
    justifyContent: undefined,
  }
});