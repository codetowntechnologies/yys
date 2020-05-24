import React from 'react';
import {
    Alert, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import stringsoflanguages from './locales/stringsoflanguages';



function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: .10, backgroundColor: 'white', borderTopRightRadius: 10,
                    borderBottomRightRadius: 10, justifyContent: 'center', borderColor: '#0093C8',
                    borderWidth: 2
                }}>

                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.7), fontWeight: 'bold', padding: 5 }}>{item.que_id}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 5 }}>
                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(13, 580), marginTop: 10 }}>{item.question}</Text>
                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginTop: 2 }} />
                    <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10 }}>{item.text_option}</Text>
                </View>

            </View>
        </View>


    );
}

var answerArray = []
const APP_LOGO = require('../images/yys_shadow_logo-new.png');
const PROFILE_IMAGE = require('../images/demo_profile.jpg');
var icon;

export default class PreviewScreenActivity extends React.Component {

    constructor(props) {
        super(props);
        this.submitQuestion = this.submitQuestion.bind(this);
        this.state = {
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/submit_contract',
            userId: '',
            isModalVisible: false,
            isUsernameVisible: false,
            selectedLanguage: ''

        };
    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

    };

    openContractLog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        // if (this.state.islogin == '0') {
        //     this.props.navigation.navigate('Login')
        // } else {
        this.props.navigation.navigate('contractLog')
        //    }
    };

    openProfile = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        // if (this.state.islogin == '0') {

        //     this.props.navigation.navigate('Login')
        // } else {
        this.props.navigation.navigate('Profile')
        //  }
    };

    openAboutus = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Aboutus')
    };

    openDashboard = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Dashboard')
    };

    openTermsConditions = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('TermsCondition')
    };

    openContactus = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Contactus')
    };

    openQuestionLog = () => {
        // if (this.state.islogin == '0') {

        //     this.props.navigation.navigate('Login')
        // } else {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('QuestionLog')
        //  }
    };

    logout = () => {

        // if (this.state.islogin == '0') {

        //     this.props.navigation.navigate('Login')
        // } else {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        AsyncStorage.setItem('@is_login', "");
        this.props.navigation.navigate('Splash')
        //   }
    };


    componentDidMount() {


        const { navigation } = this.props;
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        this.setState({ data: answerArray })


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

        AsyncStorage.getItem('@fullname').then((name) => {
            if (name) {
                this.setState({ name: name });
                console.log("name ====" + this.state.name);
            }
        });

        AsyncStorage.getItem('@is_login').then((is_login) => {
            if (is_login) {
                this.setState({ islogin: is_login });
                console.log("this.state.islogin===" + this.state.islogin)

                if (this.state.islogin == 0) {
                    this.setState({ isUsernameVisible: false })
                    this.setState({ logoutlogintext: stringsoflanguages.login_signup })
                    icon = APP_LOGO;
                }
                else {
                    this.setState({ isUsernameVisible: true })
                    this.setState({ logoutlogintext: stringsoflanguages.logout_menu })
                    icon = PROFILE_IMAGE;
                }
                console.log("name ====" + this.state.is_login);
            }
        });

        AsyncStorage.getItem('@last_login').then((last_login) => {
            if (last_login) {
                this.setState({ lastLogin: "last login: " + last_login });
                console.log("last login detail ====" + this.state.lastLogin);
            }
        });



    }

    submitQuestion() {

        console.log('base url data====' + JSON.stringify(answerArray));

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
                question_array: answerArray
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
                        'YYS',
                        //body
                        responseData.message,
                        [
                            {
                                text: 'ok', onPress: () =>
                                    this.props.navigation.navigate('QuestionLog')
                            }
                        ],
                        { cancelable: false }

                    );

                    answerArray = [];
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
        // this.props.navigation.navigate('ContractLogDetail')
        console.log('Selected Item :', item);
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.toggleModal} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>{stringsoflanguages.preview}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>


                <Modal
                    isVisible={this.state.isModalVisible}
                    style={styles.modal}
                    hasBackdrop={true}
                    animationIn={"slideInLeft"}
                    animationOut={"slideOutLeft"}
                    animationInTiming={300}
                    animationOutTiming={300}
                    backdropTransitionInTiming={300}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    backdropTransitionOutTiming={300}
                >


                    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#007BA8' }}>


                            <TouchableOpacity style={{ flex: .40, alignItems: 'flex-start', justifyContent: 'center' }}
                                onPress={() => { }} >

                                <Image
                                    source={PROFILE_IMAGE}
                                    style={{ width: 80, height: 80, borderRadius: 80 / 2, marginLeft: 10, borderWidth: 2, borderColor: 'white' }}
                                />


                            </TouchableOpacity>
                            {/* {
                              //  this.state.isUsernameVisible ? */}

                            <TouchableOpacity style={{ flex: .60, flexDirection: 'column' }}
                                onPress={() => { }} >

                                <Text style={styles.usernameStyle}>{this.state.name}</Text>

                                <Text style={styles.logindetailtextstyle}>{this.state.lastLogin}</Text>


                            </TouchableOpacity>
                            {/* // : null
                       //     } */}

                        </View>



                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openDashboard} >

                                <Image source={require('../images/home_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80 }}
                                onPress={this.openDashboard} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.home_menu}</Text>

                            </TouchableOpacity>

                        </View>



                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            padding: 15
                        }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openProfile} >

                                <Image source={require('../images/profile_menu.png')}
                                    style={styles.MenuProfileIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openProfile} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.profile_menu}</Text>

                            </TouchableOpacity>

                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openContractLog} >


                                <Image source={require('../images/contract_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openContractLog} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.contract_log_menu}</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openQuestionLog} >

                                <Image source={require('../images/questionlog_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openQuestionLog} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.question_log_menu}</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openContactus} >

                                <Image source={require('../images/contactus_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openContactus} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.contactus_menu}</Text>

                            </TouchableOpacity>

                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openAboutus} >

                                <Image source={require('../images/terms_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openAboutus} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.about_us_menu}</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.openTermsConditions} >

                                <Image source={require('../images/terms_menu.png')}
                                    style={styles.MenuIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.openTermsConditions} >

                                <Text style={styles.menutitlestyle}>{stringsoflanguages.terms_menu}</Text>

                            </TouchableOpacity>

                        </View>


                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
                            flex: 1, padding: 15
                        }}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.logout} >


                                <Image source={require('../images/logout_menu.png')}
                                    style={styles.MenuProfileIconStyle} />

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                onPress={this.logout} >

                                <Text style={styles.menutitlestyle}>{this.state.logoutlogintext}</Text>

                            </TouchableOpacity>

                        </View>


                    </SafeAreaView>


                </Modal>



                {this.state.loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0094CD" />
                    </View>
                )}

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
                //   keyExtractor={item => item.question}
                />



                <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle}
                    onPress={() => {
                        this.showLoading();
                        this.submitQuestion();


                    }}>

                    <Image source={require('../images/arrow_circle_blue_right.png')}
                        style={styles.FloatingButtonStyle} />

                </TouchableOpacity>



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {

                            this.props.navigation.navigate('Dashboard')
                        }}>

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
    TouchableOpacityStyle: {

        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 100,
    },
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
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    modal: {
        backgroundColor: 'white',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        width: 300,
        justifyContent: undefined,
    },
    MenuIconStyle: {
        height: RFPercentage(3.5),
        width: RFPercentage(3.5),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuProfileIconStyle: {
        height: RFPercentage(3.9),
        width: RFPercentage(3.2),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logindetailtextstyle: {
        color: "white",
        fontSize: 10
    },
    usernameStyle: {
        color: "white",
        fontSize: 15
    },
    menutitlestyle: {
        color: "white",
        fontSize: RFPercentage(1.8)
    }
});