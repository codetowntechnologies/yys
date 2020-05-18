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
import ActionButton from 'react-native-circular-action-menu';


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
      portfolioData:'',
    };
  }


  static navigationOptions = {
    title: 'About us Screen',
  };

  componentDidMount() {

    this.showLoading();
    this.aboutuscall();

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
        secure_pin: 'digimonk'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.setState({ about_us_content: responseData.content_array[1].content })
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
        secure_pin: 'digimonk'
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
          backgroundColor: '#ffffff', height: 60, elevation: 20
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

     

        <View style={{ flexDirection: 'column', flex: 1 }}>

          <View style={{
            flexDirection: 'row', backgroundColor: '#ffffff', borderBottomRightRadius: 30,
            marginBottom: 20, flex: .4,
            borderBottomLeftRadius: 30, width: '100%', elevation: 20,
            
            shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1 
          }}>

            <ScrollView style={{ flexDirection: 'column' }} >

            {this.state.loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#0093c8" />
                </View>
              )}

              <Text style={{ color: '#4d4d4d', marginLeft: 10, marginRight: 10 }}>
                {this.state.about_us_content}
              </Text>

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
          height: 60, borderRadius: 30, margin: 5, elevation: 20,
          shadowColor: 'grey', elevation: 20,
            shadowOffset: { width: 2, height: 2 },  shadowOpacity: 1
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
