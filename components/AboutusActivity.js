import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  FlatList
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';


function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ alignItems: "center", flexDirection: 'column', width: 100, height: 100 }}>

        <Image source={{ uri: item.image }} style={{
          width: 80, height: 80, borderRadius: 50,
          borderColor: '#0093c8', borderWidth: 2
        }} />

        <View style={{ alignItems: "center", flexDirection: 'column' }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, color: '#0093c8' }}>{item.name}</Text>
        </View>

      </View>
    </View>
  );
}


class AboutusActivity extends Component {
  constructor(props) {
    super(props);
    this.aboutuscall = this.aboutuscall.bind(this);
    this.portfoliocall = this.portfoliocall.bind(this);
    this.state = {
      JSONResult: '',
      about_us_content: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_content',
      portfolioUrl: 'http://203.190.153.22/yys/admin/app_api/get_portfolio',
      portfolioData: '',
      languageType: '',
      selectedLanguage: '',
      question_count: '',
      contract_count: '',
      notification_count: '',
    };
  }


  static navigationOptions = {
    title: 'About us Screen',
  };

  componentDidMount() {

    AsyncStorage.getItem('@language').then((selectedLanguage) => {
      if (selectedLanguage) {
        if (selectedLanguage == "English") {
          stringsoflanguages.setLanguage("en");
        } else {
          stringsoflanguages.setLanguage("ar");
        }

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

    AsyncStorage.getItem('@language').then((languageType) => {
      if (languageType) {
        this.setState({ languageType: languageType });
        console.log("language type ====" + this.state.languageType);
        this.showLoading();
        this.aboutuscall();
      }
    });



  }


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  aboutuscall() {


    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        language: this.state.languageType
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.setState({ about_us_content: responseData.content_array[0].content })
          this.showLoading();
          this.portfoliocall();
        }

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }


  portfoliocall() {

    var url = this.state.portfolioUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        language: this.state.languageType
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.setState({ data: responseData.portfolio_array })

        }

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
          backgroundColor: '#ffffff', height: 60
        }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >


            <Image
              source={require('../images/back_blue.png')}

              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.about_us_menu}</Text>

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
          bounces={false}
          style={{ flexDirection: 'column' }}>

          <View style={{ flexDirection: 'column', flex: 1 }}>

            <View style={{
              flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 20,
              marginBottom: 20, marginTop: 10,
              width: '100%', elevation: 20,

              shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
            }}>



              {this.state.loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#0093c8" />
                </View>
              )}

              <Text style={{ color: '#4d4d4d', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                {this.state.about_us_content}
              </Text>




            </View>


            <View style={{ flexDirection: 'column', marginTop: 20 }}>

              <Text style={{
                color: "#0093c8",
                borderBottomColor: "#0093c8",
                width: 150,
                fontWeight: 'bold',
                fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5
              }}>{stringsoflanguages.portfolio} </Text>

              <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />

              <View style={styles.list_container}>
                <FlatList
                  style={{ flex: 1 }}
                  data={this.state.data}
                  bounces={false}
                  renderItem={({ item }) => <Item item={item} />}
                  keyExtractor={item => item.email}
                  numColumns={3}
                />
              </View>

            </View>
          </View>

        </ScrollView>

        {/* </ScrollView> */}


        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, elevation: 20,
          shadowColor: 'grey', elevation: 20,
          shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home.png')}
              style={styles.StyleHomeTab} />

            <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('QuestionLog')
              }
            }}>

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
                    marginRight:20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.question_count == 0}
              />
              <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>
            </View>



          </TouchableOpacity>

          <View style={{
            position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff',
            width: 70, height: 100, bottom: 5, zIndex: 10
          }}>

            <View style={{ flex: 1 }}>
              <ActionButton
                buttonColor="#0094CD">

                <ActionButton.Item buttonColor='#fffff' title="New Task" >

                </ActionButton.Item>
                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications" >

                  <Image source={require('../images/chat_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications">

                  <Image source={require('../images/question_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications">


                </ActionButton.Item>

              </ActionButton>
            </View>
          </View>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('contractLog')
              }
            }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/contract-inactive.png')}
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
                    marginLeft:20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.contract_count == 0}
              />
              <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>
            </View>



          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => {

              this.props.navigation.navigate('Contactus')

            }}>

            <Image source={require('../images/support-inactive.png')}
              style={styles.StyleContactusTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

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
    backgroundColor: '#F0F5FE'
  },
  screenntitlestyle: {
    color: "#0093c8",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 45,
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
  list_container: {
    flex: 1,
    backgroundColor: '#F0F5FE'
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#F0F5FE",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  // badgeImageIconStyle: {
  //   marginTop: 10,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  ImageIconStyle: {
    marginTop: 3,
    width:30,
    height:30,
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
    marginRight:20,
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
    marginLeft:20,
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
  bottomquestiontextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginRight:20,
    textAlign: 'center',
    fontWeight: 'bold',
},
bottomcontracttextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginLeft:20,
    textAlign: 'center',
    fontWeight: 'bold',
},

});

export default AboutusActivity;
