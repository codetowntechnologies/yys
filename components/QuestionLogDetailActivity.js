import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';


class QuestionLogDetailActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  static navigationOptions = {
    title: 'Question Log Detail Screen',
  };


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { }} >

            {/* <Image source={require('../images/menu.png')}
        style={styles.ImageIconStyle} /> */}

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

        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container, { flex: 1, marginBottom: 60 }}>

            <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb' }}>

              <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb' }}>

                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                  <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>25 Apr 2020</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                  <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>"A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument."</Text>
                </View>

              </View>


              <View style={{ flexDirection: 'row', marginTop: 48 }}>

                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>YYS ADVICE</Text>

                <Text style={{ color: '#616161', fontSize: RFPercentage(1.7), flex: .5, textAlign: 'right', marginRight: 5 }}>25 APR 2020</Text>

              </View>

              <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

              <View style={{ flexDirection: 'row', backgroundColor: '#f1f5fd', margin: 20, borderRadius: 20 }}>

                <Text style={{ color: '#767475', alignItems: 'center', justifyContent: 'center', fontSize: 14, padding: 10 }}>A paragraph is a series of  developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.</Text>

              </View>


              <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                <View style={{ flex: .74, marginLeft: 10 }}>

                  <Text style={{ color: '#0093c8', alignItems: 'center', fontSize: RFPercentage(2) }}>for more information call on XXXXXXXXXXX</Text>

                </View>

                <View style={{ flex: .26, marginLeft: 10, backgroundColor: '#dc8517', borderRadius: 5, marginRight: 10, justifyContent: 'center' }}>
                  <Text style={{ color: '#767475', alignItems: 'center', alignContent: 'center', alignSelf: 'center', fontSize: RFPercentage(1.1), color: 'white', padding: 5 }}>Estd.Cost:200 KD </Text>
                </View>

              </View>

            </View>
          </View>

        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

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

                                        <Image source={require('../images/question-active.png')}
                                            style={styles.animationIconStyle} />
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { }}>

                                        <Image source={require('../images/contract-active.png')}
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



      </View>
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
  screenntitlestyle: {
    color: "#0094CD",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  animationIconStyle: {
    marginTop: 3,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
}
});

export default QuestionLogDetailActivity;
