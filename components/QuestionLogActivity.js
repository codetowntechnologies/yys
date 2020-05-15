import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, 
  SafeAreaView,ActivityIndicator } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationDrawerStructure from '../components/HomeNavigationScreen';

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: .10, backgroundColor: item.reply == null || item.reply == "" ? "#999999" : "#dc8517" , borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

      
        <Image 
        style={styles.clockiconstyle} 
        source={
          require('../images/clock.png')
          } />

        <Text style={{ color: 'white', textAlign:'center',fontSize: RFPercentage(1.7), fontWeight: 'bold', marginTop:3 }}>{item.post_date}</Text>

        </View>

        <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
          <Text
          numberOfLines={3} 
          ellipsizeMode='tail'
          style={{ color: '#383435', alignItems: 'center', fontSize: RFValue(12, 580) }}>{item.question}</Text>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end' }}>


            <Image 
            source={require('../images/reply_blue.png')}
            tintColor={item.reply == null || item.reply == "" ? "#999999" : "#0094CD" } />

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

          this.setState({ data : responseData.question_log });
 
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

<NavigationDrawerStructure/>

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          {/*Donute Button Image */}


          <TouchableOpacity
            style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Image
              source={require('../images/menu.png')}
              style={{ width: 25, height: 25, marginLeft: 5 , tintColor: "#2d3436"}}
            />

          </TouchableOpacity>
        
        </TouchableOpacity>


      </View>


        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0094CD" />
          </View>
        )}



        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { }} >

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

  clockiconstyle: {
    height: 10,
    width: 10,
    padding:5,
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
}
});