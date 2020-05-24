import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import BottomNavigator from "../components/BottomNavigator";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from '@react-native-community/async-storage';

import stringsoflanguages from './locales/stringsoflanguages';



function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
                    <Text style={{ color: '#0093c8', alignItems: 'center', justifyContent: 'center', marginLeft:10, fontSize: RFValue(12, 580) }}>{item.name}</Text>
                    <Text style={{ color: "#767475", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.time}</Text>
                </View>

            </View>
        </View>


    );
}

export default class NotificationActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "name": "YYS advisor replied your question",
                    "time": "1 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "2 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "3 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "4 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "6 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "7 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "8 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "9 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "11 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "12 minutes ago"
                },
            ]
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

    actionOnRow(item) {
        this.props.navigation.navigate('QuestionLogDetail')
        console.log('Selected Item :', item);
    }

    componentDidMount() {

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
              if(selectedLanguage=="English")
              {
                stringsoflanguages.setLanguage("en");
              }else{
                stringsoflanguages.setLanguage("ar");
              }
      
            }
          });

    }


    render() {
        return (
            // <View style={styles.container}>


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

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.email}
                />
              
            {/* </View> */}

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