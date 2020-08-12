import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView, ScrollView, TextInput, Alert, Linking, Platform
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

var listData, status;
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';


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

function Item1({ item }) {

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'column' }}>

                <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10, marginLeft: 30, textAlign: 'left' }}>{stringsoflanguages.Q}{item.faq}</Text>
                <Text style={{ color: "#4D4D4D", alignItems: 'center', marginBottom: 10, marginLeft: 30, textAlign: 'left' }}>{stringsoflanguages.ans}{item.answer}</Text>
            </View>

        </View>


    );


}

export default class ContractLogDetailActivity extends React.Component {

    constructor(props) {
        super(props);
        this.applyinterestapi = this.applyinterestapi.bind(this);
        this.state = {
            reply: '',
            estimatedcost: '',
            baseUrl: 'https://ylaw.app/admin/app_api/interest_contract',
            userId: '',
            listData: '',
            isproposalVisible: false,
            isinterestedvisible: false,
            selectedLanguage: '',
            notification_count: '',

        };
    }




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    dialCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:$' + this.state.listData.phone_no;
        }
        else {
            phoneNumber = 'telprompt:' + this.state.listData.phone_no;
        }

        Linking.openURL(phoneNumber);
    };

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

        console.log("listdata==" + JSON.stringify(listData))

        this.setState({ listData: listData });


        if (listData.status == 0 || listData.status == 1 || listData.status == 2) {
            this.setState({ isproposalVisible: false })
        }
        else if (listData.status == 4) {
            this.setState({ isinterestedvisible: false })
            this.setState({ isproposalVisible: true })
        }
        else if (listData.status == 3) {
            this.setState({ isinterestedvisible: true })
            this.setState({ isproposalVisible: true })
        }
        // else {

        // }


        if (listData.status == 0 || listData.status == 1 || listData.status == 2) {
            this.setState({ reply: stringsoflanguages.reply_in_process });

        } else if (listData.status == 4) {
            this.setState({ reply: stringsoflanguages.rejected });

        }
        else {
            this.setState({ reply: listData.reply });
        }


        console.log("estimated cost state==" + this.state.estimatedcost)
        console.log("estimated cost list data==" + listData.estimate_cost)

        if (listData.estimate_cost == '' || listData.estimate_cost == null) {
            this.setState({ estimatedcost: "0" + " " + stringsoflanguages.kd });

        } else {
            this.setState({ estimatedcost: listData.estimate_cost + " " + stringsoflanguages.kd });
        }

        this.setState({ data: listData.question_array });

    }

    applyinterestapi() {

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
                //  customer_id: 16,
                contract_id: listData.contract_id,
                status: status
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    Alert.alert(
                        //title
                        'Y LAW',
                        //body
                        responseData.message,
                        [
                            {
                                text: 'ok', onPress: () =>
                                    this.props.navigation.navigate('contractLog')
                            }
                        ],
                        { cancelable: false }

                    );

                    //  alert(responseData.message);
                }

                console.log('response object:', responseData);
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

                        <Text style={styles.screenntitlestyle}>{stringsoflanguages.contract_orders}</Text>

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


                    <View style={{ backgroundColor: '#f1f5fd' }} >

                     

                        {

                            this.state.isproposalVisible && this.state.isinterestedvisible ?

                                <Text style={{
                                    color: "#0093c8",
                                    borderBottomColor: "#0093c8",
                                    width: 150,
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5, marginTop: 10
                                }}>  {stringsoflanguages.proposal}
                                </Text>
                                : null
                        }

                        {

                            this.state.isproposalVisible && this.state.isinterestedvisible ?

                                <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />
                                : null
                        }

                    </View>


                    {
                        this.state.isproposalVisible && this.state.isinterestedvisible ?

                            <View style={{ flexDirection: 'row', marginTop: 2, padding: 10 }}>
                                {
                                    // this.state.visible ?
                                    <Image
                                        style={styles.clockiconstyle}
                                        source={require('../images/clock.png')} />
                                    //  : null
                                }
                                <Text style={{
                                    color: '#616161', marginLeft: 5, fontSize: RFPercentage(1.7), textAlign: 'right',
                                    marginRight: 5
                                }}>
                                    {this.state.listData.days}{' ' + stringsoflanguages.days}</Text>


                            </View>
                            : null
                    }

                    {
                        this.state.isproposalVisible && this.state.isinterestedvisible ?


                            <View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'center', padding: 10 }}>
                                {
                                    // this.state.visible ?
                                    <Image

                                        style={styles.clockiconstyle}
                                        source={require('../images/dollar.png')} />
                                    //  : null
                                }
                                <Text style={{ color: "#616161", marginLeft: 5, fontSize: RFPercentage(1.7), marginRight: 5 }}>{this.state.listData.estimate_cost} {" " + stringsoflanguages.kd}</Text>



                            </View>

                            : null
                    }

                    {
                        this.state.isproposalVisible && this.state.isinterestedvisible ?


                            <FlatList
                                style={{ flex: 1 }}
                                data={this.state.listData.faq_question}

                                renderItem={({ item }) => (

                                    <TouchableWithoutFeedback>

                                        <View>
                                            <Item1 item={item}
                                            />
                                        </View>

                                    </TouchableWithoutFeedback>

                                )}
                                keyExtractor={item => item.email}
                            />

                            : null
                    }


                    {
                        this.state.isproposalVisible && this.state.isinterestedvisible ?


                            <View style={{ flexDirection: 'row', backgroundColor: '#f1f5fd' }} >

                                <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                                    onPress={() => { }} >


                                </TouchableOpacity>

                                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => this.dialCall()}>

                                    <Image source={require('../images/call_yellow.png')}
                                        style={styles.YellowIconStyle}
                                    />

                                </TouchableOpacity>


                                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => this.props.navigation.navigate('Contactus')}>

                                    <Image source={require('../images/location_yellow.png')}
                                        style={styles.YellowIconStyle}
                                    />

                                </TouchableOpacity>




                            </View>


                            : null
                    }

                    {
                        this.state.isproposalVisible ?


                            <View style={{ flexDirection: 'column', backgroundColor: '#f1f5fd' }} >


                                <View style={{
                                    flexDirection: 'column', backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20,
                                    marginTop: 50, margin: 5, alignItems: 'center',
                                }}>

                                    <View style={{ flexDirection: 'row', padding: 5, marginLeft: 5, marginRight: 5 }}>

                                        <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5, textAlign: 'left' }}>{stringsoflanguages.additional_information} </Text>

                                        <Text style={{ color: '#616161', fontSize: RFPercentage(1.7), flex: .5, textAlign: 'right', marginRight: 5 }}>{stringsoflanguages.yys_advisor} </Text>
                                    </View>

                                    <View style={styles.hairline} />


                                    <View style={{
                                        flexDirection: 'row', backgroundColor: 'white', marginLeft: 20, marginRight: 20, marginBottom: 20, width: '95%',
                                        height: 100
                                    }}>


                                        <TextInput
                                            placeholder={stringsoflanguages.to_know_more_contact_to_kys_support}
                                            placeholderTextColor="#5F6063"
                                            underlineColorAndroid='transparent'
                                            onChangeText={reply => this.setState({ reply })}
                                            multiline={true}
                                            editable={false}
                                            value={this.state.reply}
                                            style={styles.inputmultiline}
                                        />


                                    </View>

                                </View>

                            </View>
                            : null
                    }


                 

                </ScrollView>



            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        //  backgroundColor: '#f1f5fd'
    },
    listItem: {
        margin: 10,
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
    YellowIconStyle: {
        height: 50,
        width: 50,
        marginTop: -30,
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
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#0093c8',
        fontSize: RFPercentage(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    contractQuestionButtonStyle: {
        height: 50,
        flex: .8,
        fontSize: RFPercentage(13),
        fontWeight: 'bold',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: 5,
        alignSelf: 'center'
    },
    experttext: {
        fontSize: 18,
        color: '#0093c8',
        textAlign: 'center'
    },
    contracttext: {
        fontSize: 18,
        color: '#0093c8',
        textAlign: 'left'
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
        height: 15,
        width: 15,
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