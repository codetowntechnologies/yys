import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import { ceil } from 'react-native-reanimated';

var questionid;

class QuestionLogDetailActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_question_info',
      userId: '',
      postdate: '',
      reply: '',
      question: '',
      replydate: '',
      visible: false

    };
  }

  static navigationOptions = {
    title: 'Question Log Detail Screen',
  };

  componentDidMount() {

    this.showLoading();

    const { navigation } = this.props;
    questionid = navigation.getParam('question_id', 'no-questionid');
    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        this.fetchData();
        console.log("user id ====" + this.state.userId);
      }
    });

  }


  fetchData() {

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
        question_id: questionid
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          if (responseData.question_log != null) {
            this.setState({ post_date: responseData.question_log[0].post_date })
            this.setState({ reply: responseData.question_log[0].reply })
            this.setState({ question: responseData.question_log[0].question })
            this.setState({ replydate: responseData.question_log[0].reply_date })
            this.setState({ visible: responseData.question_log[0].reply == null || responseData.question_log[0].reply == "" ? false : true })
            
            console.log("visible value===" + this.state.visible)
          }
        }

        console.log('response object:', responseData.question_log[0].post_date);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >

            <Image source={require('../images/back_blue.png')}
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }} >

            <Text style={styles.screenntitlestyle}>QUESTION LOG</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image source={require('../images/notification.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container, { flex: 1, marginBottom: 60 }}>

            <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb' }}>

              <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb' }}>

                <View style={{
                  flex: .10, backgroundColor: this.state.reply == null || this.state.reply == "" ? "white" : "white",
                  borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5, borderColor: '#0093C8',
                  borderWidth: 2
                }}>

                  <Image
                    style={styles.clockiconstyle}
                    source={
                      require('../images/clock.png')
                    } />


                  <Text style={{ color: '#0093c8', marginTop: 5, textAlign: 'center', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.post_date}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                  <Text style={{ color: '#383435', alignItems: 'center', fontSize: RFValue(12, 580) }}>{this.state.question}</Text>
                </View>

              </View>


              <View style={{ flexDirection: 'row', marginTop: 48 }}>

                <Text style={{
                  color: this.state.reply == null || this.state.reply == "" ? "#999999" : "#0093c8",
                  borderBottomColor: this.state.reply == null || this.state.reply == "" ? "#999999" : "#0093c8",
                  fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5, borderBottomWidth: 2
                }}>
                  {this.state.reply == null || this.state.reply == "" ? "UNDER REVIEW" : "YYS ADVICED"}

                </Text>


                <View style={{ flexDirection: 'row', flex: .5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                  {
                    this.state.visible ?
                      <Image 
                   
                        style={styles.greyclockiconstyle}
                        source={require('../images/clock.png')} /> : null
                  }
                  <Text style={{
                    color: '#616161', marginLeft: 10, fontSize: RFPercentage(1.7), textAlign: 'right',
                    marginRight: 5
                  }}>
                    {this.state.replydate}</Text>


                </View>


              </View>



              <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />


              <View style={{ flexDirection: 'row', backgroundColor: '#f1f5fd', margin: 20, borderRadius: 20 }}>
                {
                  this.state.visible ?
                    <Text style={{
                      color: '#767475', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, padding: 10
                    }}>{this.state.reply}</Text> : null
                }

              </View>


              {this.state.loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#0094CD" />
                </View>
              )}

            </View>
          </View>

        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
         backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, 
         elevation: 20, shadowColor: 'grey', elevation: 20,
         shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1 }}>

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
    width: 50,
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
  clockiconstyle: {
    tintColor:'#0093c8',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greyclockiconstyle: {
    tintColor:'#616161',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});

export default QuestionLogDetailActivity;
