import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView, ScrollView, TextInput
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import IconBadge from 'react-native-icon-badge';

import stringsoflanguages from './locales/stringsoflanguages';


var listData, screentitle;

function Item({ item }) {
    return (
        <View style={styles.listItem}>

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: .10, backgroundColor: "white",
                    borderTopRightRadius: 10, borderBottomRightRadius: 10,
                    justifyContent: 'center', padding: 5, borderColor: '#0093C8',
                    borderWidth: 2
                }}>
                    {/* <Image
            style={styles.clockiconstyle}
            source={
              require('../images/clock.png')
            } /> */}

                    <Text style={{ color: '#0093c8', textAlign: 'center', fontSize: RFPercentage(1.7), fontWeight: 'bold', marginTop: 3 }}>{item.count}</Text>

                </View>



                <View style={{ flex: .90, marginLeft: 10, padding: 5 }}>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode='tail'
                        style={{ color: '#3D3D3D', alignItems: 'center', fontSize: RFValue(13, 580), marginTop: 10, textAlign: 'left' }}>{item.question}</Text>

                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginTop: 2 }} />

                    <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10, textAlign: 'left' }}>{item.answer}</Text>
                </View>

            </View>
        </View>


    );
}

export default class ContractLogQuestionActivity extends React.Component {

    constructor(props) {
        super(props);
        //  this.applyinterestapi = this.applyinterestapi.bind(this);
        this.state = {
            reply: '',
            //   estimatedcost: '',
            //   baseUrl: 'http://203.190.153.22/yys/admin/app_api/interest_contract',
            userId: '',
            selectedLanguage: '',
            notification_count: '',
            // status: ''
        };
    }




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    componentDidMount() {

        AsyncStorage.getItem('@notification_count').then((notification_count) => {
            if (notification_count) {
                this.setState({ notification_count: notification_count });
                console.log("notification_count ====" + this.state.notification_count);
            }
        });

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
                if (selectedLanguage == "English") {
                    stringsoflanguages.setLanguage("en");
                } else {
                    stringsoflanguages.setLanguage("ar");
                }

            }
        });


        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);

            }
        });

        const { navigation } = this.props;
        listData = navigation.getParam('item', 'no-item');
        screentitle = navigation.getParam('screentitle', 'no-screen-title');
        

        this.setState({ data: listData.question_array });

    }

    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>{stringsoflanguages.no_data_found}</Text>
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


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }} >

                        <Image source={require('../images/back_blue.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>{screentitle}</Text>

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

                <ScrollView>

                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}

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

                </ScrollView>



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
    inputmultiline: {
        color: 'black',
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    hairline: {
        backgroundColor: '#E8E8E8',
        height: 1,
        width: '93%'
    },
    blueButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 40,
        borderRadius: 10,
        fontSize: RFPercentage(10),
        backgroundColor: '#0094CD',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 40,
        borderRadius: 20,
        fontSize: RFPercentage(10),
        backgroundColor: '#dc8517',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    experttext: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    actionIconStyle: {
        marginTop: 3,
        height: 50,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockiconstyle: {
        height: 10,
        width: 10,
        padding: 5,
        tintColor: '#0093c8',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});