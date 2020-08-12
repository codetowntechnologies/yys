import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from '@react-native-community/async-storage';

import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';


function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
          <Text style={{ color: '#0093c8', alignItems: 'center', justifyContent: 'center', marginLeft: 10, fontSize: RFValue(12, 580) }}>{item.notification}</Text>
          <Text style={{ color: "#767475", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.date}</Text>
        </View>

      </View>
    </View>


  );
}

export default class NotificationActivity extends React.Component {


  constructor(props) {
    super(props);
    this.notificationList = this.notificationList.bind(this);
    this.readNotifications = this.readNotifications.bind(this);
    this.state = {
      baseUrl: 'https://ylaw.app/admin/app_api/get_customer_notification_list',
      readNotificationUrl: 'https://ylaw.app/admin/app_api/customer_read_notification',
      userId: '',
      languageType: '',
      selectedLanguage: '',
      isnoDataVisible: false,
    };
  }


  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#767475",
        }}
      />
    );
  }

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {

    this.showLoading();

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


    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id from async ====" + this.state.userId);

      this.notificationList();
      //this.readNotifications();

      }
    });
  }


  notificationList() {

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
        language: this.state.languageType,
        notification_id :"1"
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          if (responseData.notification_array == '') {
            this.setState({ isnoDataVisible: true })
          } else {
            this.setState({ isnoDataVisible: false })

          }

          this.setState({ data: responseData.notification_array });
          
          this.readNotifications();
        }

        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  readNotifications() {

  //  console.log('langauge type===' + this.state.languageType)
  //  console.log('user id ===' + this.state.userId)

    var url = this.state.readNotificationUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        notificationid :"1"
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
       //   alert(responseData.message);
        } else {

         // AsyncStorage.setItem('@notification_count', "" + 0);

        }

        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
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


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >

            <Image source={require('../images/back_blue.png')}
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.notification}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { }} >


          </TouchableOpacity>
        </View>


        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (

            <TouchableWithoutFeedback>

              <View>
                <Item item={item}
                />
              </View>

            </TouchableWithoutFeedback>

          )}
          keyExtractor={item => item.email}
          ListEmptyComponent={this.ListEmpty}
        />


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
    backgroundColor: "#fbfbfb",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 30,
    width: 30,
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
  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});