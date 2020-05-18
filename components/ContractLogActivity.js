import React from 'react';
import {
  StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
  ActivityIndicator, SafeAreaView
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

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
            style={{ color: '#4d4d4d', alignItems: 'center', fontSize: RFValue(10, 580)
           }}>{item.reply}</Text> 



          <View style={{ flexDirection: 'row', marginTop:2 }}>
            {
              // this.state.visible ?
              <Image
                style={styles.greyclockiconstyle}
                source={require('../images/clock.png')} />
              //  : null
            }
            <Text style={{
              color: '#616161', marginLeft: 3, fontSize: RFPercentage(1.7), textAlign: 'right',
              marginRight: 5
            }}>
              {item.days} days</Text>


          </View>


          <View style={{ flexDirection: 'row', marginTop:2 , alignItems: 'center'}}>
            {
              // this.state.visible ?
              <Image

                style={styles.greyclockiconstyle}
                source={require('../images/dollar.png')} />
              //  : null
            }
             <Text style={{ color: "#616161", marginLeft:3, fontSize: RFPercentage(1.7), marginRight: 5 }}>{item.estimate_cost} KD</Text>
        
        

          </View>


        
        </View>

        <View style={{ flex: .25, marginLeft: 10, padding: 5 }}>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

            <Image
              style={styles.clockiconstyle}
              tintColor={'#0093c8'}
              source={
                require('../images/clock.png')
              } />

            <Text style={{
              numberOfLines: 1,
              ellipsizeMode: 'trail',
              color: '#0093c8', marginLeft: 3, marginRight: 3, textAlign: 'center', alignItems: 'center', fontSize: RFPercentage(1.5), fontWeight: 'bold'
            }}>{item.reply_date}</Text>

          </View>


          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end' }}>


            <Image
              style={styles.clockiconstyle}
              source={require('../images/reply_blue.png')}
              tintColor={"#0094CD"} />

            <Text style={{
              numberOfLines: 1,
              ellipsizeMode: 'trail',
              color: "#0093c8", marginLeft: 3, marginRight: 3, textAlign: 'center', alignItems: 'center', fontSize: RFPercentage(1.5)
            }}>
              {"REPLIED"} </Text>

          </View>


        </View>

      </View>
    </View>


  );
}

export default class ContractLogActivity extends React.Component {

  constructor(props) {
    super(props);
    this.contractLogList = this.contractLogList.bind(this);
    this.state = {
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_contract_log',
      userId: '',
      isModalVisible: false,
      daysVisible: '',
      name: '',
      lastLogin: '',
      //isReplyDateVisisble: false
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
    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id ====" + this.state.userId);
        this.contractLogList();
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


  contractLogList() {

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
       //  customer_id: 16
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

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

    //  this.props.navigation.navigate('ContractLogDetail1')
    // console.log('Selected Item :', item);
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>No Data Found</Text>
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
                    onPress={this.openQuestionLog} >

                    <Image source={require('../images/questionlog_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openQuestionLog} >

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

            </TouchableWithoutFeedback>
          </Modal>

        </TouchableWithoutFeedback>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.toggleModal} >

            <Image source={require('../images/menu.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>CONTRACT LOG</Text>

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

            <Image source={require('../images/contract-active.png')}
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
    tintColor: '#616161',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menutitlestyle: {
    color: "white",
    fontSize: RFPercentage(1.8)
  }
});