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
var isgoback = false;

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

          <View style={{
            flex: .5, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-start',
          }}>

            {/* {
              item.seen_status == 0 ?

                <Text style={{
                  color: item.seen_status == 0 ? 'white' : 'white', marginTop: 15, textAlign: 'center', fontSize: RFPercentage(2),
                  backgroundColor: '#FFC33B', borderWidth: 2, borderColor: '#FFC33B'
                }}>
                  unread </Text>
                : null
            } */}

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
      baseUrl: 'https://ylaw.app/admin/app_api/get_contract_log',
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
      submiturl: 'https://ylaw.app/admin/app_api/submit_contract',
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

    this.props.navigation.addListener('willFocus', this.load)
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

    // AsyncStorage.getItem('@contract_count').then((contract_count) => {
    //   if (contract_count) {
    //     this.setState({ contract_count: contract_count });
    //     console.log("contract_count ====" + this.state.contract_count);
    //   }
    // });

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

  load = () => {

    const { navigation } = this.props;
    isgoback = navigation.getParam('isgoback', false)
    if (isgoback) {
      isgoback = false;
      this.contractLogList();
    }

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

  openContractOrders = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    if (this.state.islogin == '0') {
      this.props.navigation.navigate('Login')
    } else {
      this.props.navigation.navigate('ContractOrders')
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

          AsyncStorage.setItem('@contract_count', "" + responseData.contract_count);

          AsyncStorage.getItem('@contract_count').then((contract_count) => {
            if (contract_count) {
              this.setState({ contract_count: contract_count });
              console.log("contract_count ====" + this.state.contract_count);
            }
          });

          this.setState({ data: responseData.contract_log });

        }

        // console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }


  actionOnRow(item) {   

   // if (item.payment_done == "0") {

      if(item.online_payment == 1 && item.payment_done == 1 && item.status==3 )
      {
        this.props.navigation.navigate('ContractOrdersDetail', {
          item: item,
          type: "webview"
        })

      } 
      else if(item.online_payment == 1 && item.payment_done == 0 && item.status==3)
      {
        this.props.navigation.navigate('ContractLogDetailPaid', {
          item: item
        })

      }else if(item.status== 0 || item.status == 1 || item.status == 2 || item.status == 4 )
      {
        this.props.navigation.navigate('ContractLogDetail', {
          item: item,
          contract_id: item.contract_id
        })
      }else if(item.online_payment == 0 && item.status == 3)
      {
        this.props.navigation.navigate('ContractLogDetail', {
          item: item,
          contract_id: item.contract_id
        })
      }

      
      
      
    //   else if (item.stat)
    //   {
    //     this.props.navigation.navigate('ContractLogDetail', {
    //       item: item,
    //       contract_id: item.contract_id
    //     })
    //   }
    // }else
    // {
    //   this.props.navigation.navigate('ContractOrdersDetail', {
    //     item: item,
    //     type: "webview"
    //   })
    // }

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

          {/* <ScrollView> */}
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: '#007BA8' }}>


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
                    style={styles.MenuHomeIconStyle} />

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
                    style={styles.MenuContractIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                  onPress={this.openContractLog} >

                  <Text style={styles.menutitlestyle}>{stringsoflanguages.contract_log_menu}</Text>

                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.openContractOrders} >


                  <Image source={require('../images/contract_orders_menu.png')}
                    style={styles.MenuContractOrderIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                  onPress={this.openContractOrders} >

                  <Text style={styles.menutitlestyle}>{stringsoflanguages.contract_orders_menu}</Text>

                </TouchableOpacity>

              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.openQuestionLog} >

                  <Image source={require('../images/questionlog_menu.png')}
                    style={styles.MenuQuestionLogIconStyle} />

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
                    style={styles.MenuContactusIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                  onPress={this.openContactus} >

                  <Text style={styles.menutitlestyle}>{stringsoflanguages.contactus_menu}</Text>

                </TouchableOpacity>

              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.openAboutus} >

                  <Image source={require('../images/about_us.png')}
                    style={styles.MenuAboutusIconStyle} />

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
                    style={styles.MenuTermsIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                  onPress={this.openTermsConditions} >

                  <Text style={styles.menutitlestyle}>{stringsoflanguages.terms_menu}</Text>

                </TouchableOpacity>

              </View>


              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
                flex: 1, padding: 15, marginTop: 30
              }}>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.logout} >


                  <Image source={require('../images/logout_menu.png')}
                    style={styles.logoutIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                  onPress={this.logout} >

                  <Text style={styles.menutitlestyle}>{this.state.logoutlogintext}</Text>

                </TouchableOpacity>

              </View>


            </SafeAreaView>
          {/* </ScrollView> */}

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

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.StyleHomeTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/question-inactive.png')}
                    style={styles.StyleQuestionsTab} />
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
                    marginRight: 20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.question_count == 0}
              />

              <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>

            </View>



          </TouchableOpacity>


          <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

            <View style={{ flex: 1 }}>
            <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        this.props.navigation.navigate('Dashboard')
        
                                    }}>

                {/* <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

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


                </ActionButton.Item> */}

              </ActionButton>
            </View>
          </View>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
            onPress={() => { this.props.navigation.navigate('contractLog') }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/contract-active.png')}
                    style={styles.styleContractTab} />
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
                    marginLeft: 20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.contract_count == 0}
              />

              <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>


            </View>



          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => { this.props.navigation.navigate('Contactus') }}>

            <Image source={require('../images/support-inactive.png')}
              style={styles.StyleContactusTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contact_us}</Text>

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
    backgroundColor: '#0093c8',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    width: 300,
    justifyContent: undefined,
  },
  MenuIconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // MenuProfileIconStyle: {
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
    marginLeft: 5,
    color: "white",
    textAlign: 'left',
    fontSize: RFPercentage(2.0)
  },
  ImageIconStyle: {
    width: 30,
    height: 30,
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyleHomeTab: {
    marginTop: 5,
    width: 35,
    height: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyleQuestionsTab: {
    marginTop: 11,
    marginRight: 20,
    width: 30,
    height: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeImageIconStyle: {
    marginTop: 5,
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleContractTab: {
    marginTop: 9,
    width: 21,
    height: 30,
    marginLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyleContactusTab: {
    marginTop: 14,
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomactivebuttonstyle: {
    color: "#0094CD",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottominactivebuttonstyle: {
    color: "#887F82",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomquestiontextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginRight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomcontracttextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginLeft: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  MenuHomeIconStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuProfileIconStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuContractIconStyle: {
    width: 35,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuContractOrderIconStyle: {
    width: 35,
    height: 43,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuQuestionLogIconStyle: {
    width: 40,
    height: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuContactusIconStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuAboutusIconStyle: {
    width: 50,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuTermsIconStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconStyle: {
    width: 40,
    height: 29,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});