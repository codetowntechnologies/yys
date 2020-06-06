import React from 'react';
import {
  StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
  ActivityIndicator, SafeAreaView, RefreshControl, ScrollView
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import IconBadge from 'react-native-icon-badge';

const APP_LOGO = require('../images/yys_shadow_logo-new.png');
const PROFILE_IMAGE = require('../images/yys_shadow_logo-new.png');
var icon;


import stringsoflanguages from './locales/stringsoflanguages';

var answerArray = [];
var completeArray = [];


function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{
          flex: .25, borderTopRightRadius: 10, borderBottomRightRadius: 10,
          justifyContent: 'center', alignItems: 'center'
        }}>

          <Image source={{ uri: item.c_name }} style={{
            width: 70, height: 70, borderRadius: 50,
            borderColor: '#0093c8', borderWidth: 2
          }} />


        </View>

        <View style={{ flex: .50, marginLeft: 10, padding: 5 }}>


          <Text style={{ color: "black", fontWeight: 'bold', alignItems: 'center' }}>{item.c_logo}</Text>


          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={{
              color: '#4d4d4d', alignItems: 'center', fontSize: RFValue(10, 580)
            }}>
            {((item.status == 0 || item.status == 1 || item.status == 2) && item.question_array != '') ? item.question_array[0].answer : item.reply}
          </Text>


          <View
            display={item.status == 0 || item.status == 1 || item.status == 2 ? 'none' : 'flex'}
            style={{ flexDirection: 'row', marginTop: 2 }}>

            <Image
              style={styles.greyclockiconstyle}
              source={require('../images/clock.png')}
            />


            <Text
              style={{
                color: '#FFC33B', marginLeft: 3, fontSize: RFPercentage(1.7), textAlign: 'right',
                marginRight: 5
              }}
            >
              {item.days} {' ' + stringsoflanguages.days}


            </Text>

          </View>


          <View
            display={item.status == 0 || item.status == 1 || item.status == 2 ? 'none' : 'flex'}
            style={{ flexDirection: 'row', marginTop: 2, alignItems: 'center' }}>
            {
              // this.state.visible ?
              <Image

                style={styles.greyclockiconstyle}
                source={require('../images/dollar.png')} />
              //  : null
            }
            <Text style={{ color: "#FFC33B", marginLeft: 3, fontSize: RFPercentage(1.7), marginRight: 5 }}>{item.estimate_cost} {' ' + stringsoflanguages.kd}</Text>



          </View>



        </View>

        <View style={{ flex: .25, marginLeft: 10, padding: 5 }}>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

            <Image
              style={styles.blueclockiconstyle}

              source={
                require('../images/clock.png')
              } />

            <Text style={{
              numberOfLines: 1,
              ellipsizeMode: 'trail',
              color: '#0093c8', marginLeft: 3, marginRight: 3, textAlign: 'center', alignItems: 'center', fontSize: RFPercentage(1.5), fontWeight: 'bold'
            }}>{item.post_date}</Text>

          </View>


          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end' }}>


            <Image
              style={item.status == 0 || item.status == 1 || item.status == 2 ? styles.replyiconbluestyle : styles.replyiconyellowstyle}
              source={require('../images/reply_blue.png')} />

            <Text style={{
              numberOfLines: 1,
              ellipsizeMode: 'trail',
              color: item.status == 0 || item.status == 1 || item.status == 2 ? "#FFC33B" : '#0093c8', marginLeft: 3, marginRight: 3, textAlign: 'center', alignItems: 'center', fontSize: RFPercentage(1.5)
            }}>
              {item.status == 0 || item.status == 1 || item.status == 2 ? stringsoflanguages.in_process : stringsoflanguages.replied}</Text>

          </View>


        </View>

      </View>
    </View>


  );
}

export default class ContractLogActivity extends React.Component {

  constructor(props) {
    super(props);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.contractLogList = this.contractLogList.bind(this);
    this.state = {
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_contract_log',
      userId: '',
      isModalVisible: false,
      daysVisible: '',
      name: '',
      question_count: '',
      contract_count: '',
      notification_count: '',
      lastLogin: '',
      isUsernameVisible: false,
      logoutlogintext: '',
      languageType: '',
      selectedLanguage: '',
      submiturl: 'http://203.190.153.22/yys/admin/app_api/submit_contract',
      isnoDataVisible: false,
      refresh: false,
    };
  }




  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {

    this.showLoading();

    const { navigation } = this.props;
    answerArray = navigation.getParam('answerArray', 'no-business-array');
    completeArray = navigation.getParam('completeArray', 'no-complete-array');


    AsyncStorage.getItem('@language').then((selectedLanguage) => {
      if (selectedLanguage) {
        if (selectedLanguage == "English") {
          stringsoflanguages.setLanguage("en");
        } else {
          stringsoflanguages.setLanguage("ar");
        }

      }
    });

    AsyncStorage.getItem('@language').then((languageType) => {
      if (languageType) {
        this.setState({ languageType: languageType });
        console.log("language type ====" + this.state.languageType);
      }
    });

    AsyncStorage.getItem('@fullname').then((name) => {
      if (name) {
        this.setState({ name: name });
        console.log("name ====" + this.state.name);
      }
    });

    AsyncStorage.getItem('@is_login').then((is_login) => {
      if (is_login) {
        this.setState({ islogin: is_login });
        console.log("this.state.islogin===" + this.state.islogin)

        if (this.state.islogin == 0) {
          this.setState({ isUsernameVisible: false })
          this.setState({ logoutlogintext: stringsoflanguages.login_signup })
          icon = APP_LOGO;
        }
        else {
          this.setState({ isUsernameVisible: true })
          this.setState({ logoutlogintext: stringsoflanguages.logout_menu })
          icon = PROFILE_IMAGE;
        }
        console.log("name ====" + this.state.is_login);
      }
    });

    AsyncStorage.getItem('@last_login').then((last_login) => {
      if (last_login) {
        this.setState({ lastLogin: "last login: " + last_login });
        console.log("last login detail ====" + this.state.lastLogin);
      }
    });

    AsyncStorage.getItem('@question_count').then((question_count) => {
      if (question_count) {
        this.setState({ question_count: question_count });
        console.log("question_count ====" + this.state.question_count);
      }
    });

    AsyncStorage.getItem('@contract_count').then((contract_count) => {
      if (contract_count) {
        this.setState({ contract_count: contract_count });
        console.log("contract_count ====" + this.state.contract_count);
      }
    });

    AsyncStorage.getItem('@notification_count').then((notification_count) => {
      if (notification_count) {
        this.setState({ notification_count: notification_count });
        console.log("notification_count ====" + this.state.notification_count);
      }
    });


    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id from async ====" + this.state.userId);

        if (answerArray == "no-business-array") {
          this.contractLogList();
        } else {
          this.submitQuestion();
        }

      }
    });
  }



  onRefresh() {
    this.setState({ refresh: true });
    this.contractLogList();
    setTimeout(() => {
      this.setState({ refresh: false });
    }, 2000);
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });

  };

  openContractLog = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    if (this.state.islogin == '0') {
      this.props.navigation.navigate('Login')
    } else {
      this.props.navigation.navigate('contractLog')
    }
  };

  openProfile = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    if (this.state.islogin == '0') {

      this.props.navigation.navigate('Login')
    } else {
      this.props.navigation.navigate('Profile')
    }
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
    if (this.state.islogin == '0') {

      this.props.navigation.navigate('Login')
    } else {
      this.setState({ isModalVisible: !this.state.isModalVisible });
      this.props.navigation.navigate('QuestionLog')
    }
  };

  logout = () => {

    if (this.state.islogin == '0') {

      this.props.navigation.navigate('Login')
    } else {
      this.setState({ isModalVisible: !this.state.isModalVisible });
      AsyncStorage.setItem('@is_login', "");
      this.props.navigation.navigate('Splash')
    }
  };

  submitQuestion() {

    console.log('answer array data====' + JSON.stringify(answerArray));
    console.log('language ====' + this.state.languageType);
    console.log('customer_id ====' + this.state.userId);

    var url = this.state.submiturl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        question_array: answerArray,
        language: this.state.languageType
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          // this.props.navigation.navigate('ContractLog')
          this.contractLogList();
          answerArray = [],
            completeArray = [];
        }

        console.log('response object:', responseData);

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }


  contractLogList() {

    console.log('langauge type===' + this.state.languageType)
    console.log('user id ===' + this.state.userId)

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
        language: this.state.languageType
        //   customer_id: 16
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          if (responseData.contract_log == '') {
            this.setState({ isnoDataVisible: true })
          } else {
            this.setState({ isnoDataVisible: false })

          }


          this.setState({ data: responseData.contract_log });

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

    this.props.navigation.navigate('ContractLogDetail', {
      item: item,
    })

  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.container}>
        {
          this.state.isnoDataVisible ?
            <Text style={{ textAlign: 'center' }}>{stringsoflanguages.no_data_found}</Text>
            : null
        }
      </View>
    );
  };


  render() {
    return (

      <SafeAreaView style={styles.container}>


        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0094CD" />
          </View>
        )}

        <Modal
          isVisible={this.state.isModalVisible}
          style={styles.modal}
          hasBackdrop={true}
          animationIn={"slideInLeft"}
          animationOut={"slideOutLeft"}
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          backdropTransitionOutTiming={300}
        >


          <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#007BA8' }}>


              <TouchableOpacity style={{ flex: .40, alignItems: 'flex-start', justifyContent: 'center' }}
                onPress={() => { }} >

                <Image
                  source={icon}
                  style={{ width: 80, height: 80, borderRadius: 80 / 2, marginLeft: 10, borderWidth: 2, borderColor: 'white' }}
                />


              </TouchableOpacity>
              {
                this.state.isUsernameVisible ?

                  <TouchableOpacity style={{ flex: .60, flexDirection: 'column' }}
                    onPress={() => { }} >

                    <Text style={styles.usernameStyle}>{this.state.name}</Text>

                    <Text style={styles.logindetailtextstyle}>{this.state.lastLogin}</Text>


                  </TouchableOpacity>
                  : null
              }

            </View>



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

              <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                onPress={this.openDashboard} >

                <Image source={require('../images/home_menu.png')}
                  style={styles.MenuIconStyle} />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .80 }}
                onPress={this.openDashboard} >

                <Text style={styles.menutitlestyle}>{stringsoflanguages.home_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{stringsoflanguages.profile_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{stringsoflanguages.contract_log_menu}</Text>

              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

              <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                onPress={this.openQuestionLog} >

                <Image source={require('../images/questionlog_menu.png')}
                  style={styles.MenuIconStyle} />

              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                onPress={this.openQuestionLog} >

                <Text style={styles.menutitlestyle}>{stringsoflanguages.question_log_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{stringsoflanguages.contactus_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{stringsoflanguages.about_us_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{stringsoflanguages.terms_menu}</Text>

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

                <Text style={styles.menutitlestyle}>{this.state.logoutlogintext}</Text>

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

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.contract_log}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('Notification')
              }

            }} >

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/notification.png')}
                    style={styles.badgeImageIconStyle}
                  />

                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.notification_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.notification_count == 0}
              />
            </View>

          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.onRefresh()}
              tintColor='#FFC33B'
            />
          }>

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

        </ScrollView>

        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5,
          elevation: 20, shadowColor: 'grey', elevation: 20,
          shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/question-inactive.png')}
                    style={styles.badgeImageIconStyle} />
                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.question_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.question_count == 0}
              />
            </View>



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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/contract-active.png')}
                    style={styles.badgeImageIconStyle} />
                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.contract_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.contract_count == 0}
              />
            </View>



          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Contactus') }}>

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
  badgeImageIconStyle: {
    marginTop: 10,
    marginLeft: 10,
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
  clockiconstyle: {
    height: 10,
    width: 10,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  blueclockiconstyle: {
    tintColor: '#0093c8',
    height: 10,
    width: 10,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  replyiconbluestyle: {
    tintColor: '#FFC33B',
    height: 10,
    width: 10,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  replyiconyellowstyle: {
    tintColor: '#0093c8',
    height: 10,
    width: 10,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
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
  greyclockiconstyle: {
    tintColor: '#FFC33B',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menutitlestyle: {
    color: "white",
    textAlign: 'left',
    fontSize: RFPercentage(1.8)
  }
});