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
  ImageBackground,
  SafeAreaView,
  FlatList
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';

var deviceType;

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ alignItems: "center", flexDirection: 'column', width: 100, height: 100 }}>

        <Image source={{ uri: item.photo }} style={{ width: 80, height: 80, borderRadius: 50 , 
          borderColor: '#0093c8', borderWidth:2}} />

        <View style={{ alignItems: "center", flexDirection: 'column' }}>
          <Text style={{ fontWeight: "bold", fontSize:12 }}>{item.name}</Text>
        </View>

      </View>
    </View>
  );
}


class AboutusActivity extends Component {
  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      password: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_login',
      data: [
        {
          "name": "Miyah Myles",
          "email": "miyah.myles@gmail.com",
          "position": "Data Entry Clerk",
          "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
        },
        {
          "name": "June Cha",
          "email": "june.cha@gmail.com",
          "position": "Sales Manager",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
        },
        {
          "name": "Iida Niskanen",
          "email": "iida.niskanen@gmail.com",
          "position": "Sales Manager",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
        },
        {
          "name": "Renee Sims",
          "email": "renee.sims@gmail.com",
          "position": "Medical Assistant",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
        },
        {
          "name": "Jonathan Nu\u00f1ez",
          "email": "jonathan.nu\u00f1ez@gmail.com",
          "position": "Clerical",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
        },
        {
          "name": "Sasha Ho",
          "email": "sasha.ho@gmail.com",
          "position": "Administrative Assistant",
          "photo": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
        },
        {
          "name": "Abdullah Hadley",
          "email": "abdullah.hadley@gmail.com",
          "position": "Marketing",
          "photo": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
        },
        {
          "name": "Thomas Stock",
          "email": "thomas.stock@gmail.com",
          "position": "Product Designer",
          "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
        },
        {
          "name": "Veeti Seppanen",
          "email": "veeti.seppanen@gmail.com",
          "position": "Product Designer",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
        },
        {
          "name": "Bonnie Riley",
          "email": "bonnie.riley@gmail.com",
          "position": "Marketing",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
        }
      ]
    };
  }


  static navigationOptions = {
    title: 'About us Screen',
  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.email != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        if (Platform.OS === 'ios') {
          deviceType = 'ios'
        } else {
          deviceType = 'android'
        }

        this.showLoading();
        this.logincall();

      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter email');
    }
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  logincall() {

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        email_id: this.state.email,
        password: this.state.password,
        device_type: deviceType,
        device_token: '123'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          this.saveLoginUserData(responseData);
        }


        // console.log('response object:', responseData);
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

            <Text style={styles.screenntitlestyle}>About us</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }} >

            <Image
              source={require('../images/notification.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'column', marginTop: 20, flex: 1 }}>



          <View style={{
            flexDirection: 'row', backgroundColor: '#ffffff', borderBottomRightRadius: 20,
            marginBottom: 20, flex: .4,
            borderBottomLeftRadius: 20, width: 392, elevation: 20,
            shadowColor: '#ecf6fb'
          }}>

            <ScrollView style={{ flexDirection: 'column', nestedScrollEnabled: true }} >

              <Text style={{ color: '#4d4d4d', marginLeft: 10, marginRight: 10 }}>Rahul Kumaksdhskjhdkjshdkjshkdhkshdkjshdkjshkjshdksh
              dkjhsdshdkjshdkjshdkshjkdhsdsjhdkjshdkjshkjshdkshkjshdshdhsdhjkshdkjshdkjshkjdhskdhskjhd
              kjshdkjshkdhskjdjshdksjhdjkshdjkhskdhskjdhksjhdkshdkjshkjdhskjhdkjshkjshjshdjkshdkjshdksj\
              dsjdhskjhdshdkshkshkdhskdhshdskjhkjshkshdkshdksjhdkshkdhskdhskjhdkjshdkshdkshdskjhdksdhskr
              Rahul Kumaksdhskjhdskjdjshdksjhdjkshdjkhskdhskjdhksjhdkshdkjshkjdhskjhdkjshkjshjshdjkshdkjshdksj\
              dsjdhskjhdshdkshkshkdhskdhshdskjhkjshkshdkshdksjhdkshkdhskdhskjhdkjshdkshdkshdskjhdksdhskr
              Rahul Kumaksdhskjhdkjshdkjshkdhkshdkjshdkjshkjshdkshkjshdkjshkdhkshdkjshdkjshkjshdksh
              dkjhsdshdkjshdkjshdkshjkdhsdsjhdkjshdkjshkjshdkshkjshdshdhsdhjkshdkjshdkjshkjdhskdhskjhd
              kjshdkjshkdhskjdjshdksjhdjkshdjkhskdhskjdhksjhdkshdkjshkjdhskjhdkjshkjshjshdjkshdkjshdksj\
            dsjdhskjhdshdkshkshkdhskdhshdskjhkjshkshdkshdksjhdkshkdhskdhskjhdkjshdkshdkshdskjhdksdhskr</Text>

            </ScrollView>


          </View>


          <View style={{ flexDirection: 'column', marginTop: 20, flex: .6 }}>

            <Text style={{
              color: "#0093c8",
              borderBottomColor: "#0093c8",
              width: 150,
              fontWeight: 'bold',
              fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5
            }}>  PORTFOLIO </Text>

            <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />

            <View style={styles.list_container}>
              <FlatList
                style={{ flex: 1 }}
                data={this.state.data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.email}
                numColumns={3}
              />
            </View>

          </View>
        </View>

        {/* </ScrollView> */}


        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
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
            onPress={() => { this.props.navigation.navigate('VideoCall') }}>

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
    width: 40,
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
  }

});

export default AboutusActivity;
