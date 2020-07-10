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
import IconBadge from 'react-native-icon-badge';
import { ScrollView } from 'react-native-gesture-handler';
var isgoback = false;
var screenname;
function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: .10, backgroundColor: 'white', borderTopRightRadius: 10,
                    borderBottomRightRadius: 10, justifyContent: 'center', borderColor: '#0093C8',
                    borderWidth: 2
                }}>

                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.7), fontWeight: 'bold', padding: 5 }}>{item.que_no}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 5 }}>
                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(13, 580), marginTop: 10, textAlign: 'left' }}>{item.question}</Text>
                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginTop: 2 }} />
                    <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10, textAlign: 'left' }}>{item.text_option}</Text>
                </View>

            </View>
        </View>


    );
}

var answerArray = [];
var completeArray = [];
const APP_LOGO = require('../images/yys_shadow_logo-new.png');
const APP_POPUP_LOGO = require('../images/yys_shadow_logo-new_old.png');
const PROFILE_IMAGE = require('../images/yys_shadow_logo-new.png');
var icon;

export default class PreviewScreenActivity extends React.Component {

    constructor(props) {
        super(props);
        //   this.submitQuestion = this.submitQuestion.bind(this);
        this.state = {
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/submit_contract',
            userId: '',
            isModalVisible: false,
            isUsernameVisible: false,
            selectedLanguage: '',
            isModalPopupVisible: false,
            question_count: '',
            contract_count: '',
            notification_count: '',

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

    togglePopup = () => {
        this.setState({ isModalPopupVisible: !this.state.isModalPopupVisible });
    };

    closecontractlogPopup = () => {
        this.setState({ isModalPopupVisible: false });
        this.props.navigation.navigate('contractLog', {
            answerArray: answerArray,
            completeArray: completeArray
        })
    };

    openContractLog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('contractLog')
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

        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('QuestionLog')

    };

    logout = () => {

        this.setState({ isModalVisible: !this.state.isModalVisible });
        AsyncStorage.setItem('@is_login', "");
        this.props.navigation.navigate('Splash')

    };


    componentDidMount() {


        AsyncStorage.getItem('@question_count').then((question_count) => {
            if (question_count) {
                this.setState({ question_count: question_count });
                console.log("question_count ====" + this.state.question_count);
            }
        });

        AsyncStorage.getItem('@contract_count').then((contract_count) => {
            if (contract_count) {
                this.setState({ contract_count: contract_count });
                console.log("contract_count ====" + this.state.contract_count);
            }
        });

        AsyncStorage.getItem('@notification_count').then((notification_count) => {
            if (notification_count) {
                this.setState({ notification_count: notification_count });
                console.log("notification_count ====" + this.state.notification_count);
            }
        });

        const { navigation } = this.props;
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        completeArray = navigation.getParam('completeArray', 'no-complete-array');
        screenname = navigation.getParam('screenname', 'no-screen-name');

        this.setState({ data: answerArray })

        console.log("Answer array===" + answerArray)

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

    // submitQuestion() {

    //     console.log('base url data====' + JSON.stringify(answerArray));

    //     var url = this.state.baseUrl;
    //     console.log('url:' + url);
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             secure_pin: 'digimonk',
    //             customer_id: this.state.userId,
    //             question_array: answerArray
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(responseData => {
    //             this.hideLoading();
    //             if (responseData.status == '0') {
    //                 alert(responseData.message);
    //             } else {
    //                // this.props.navigation.navigate('ContractLog')
    //                 answerArray = [];
    //             }

    //             console.log('response object:', responseData);

    //         })
    //         .catch(error => {
    //             this.hideLoading();
    //             console.error(error);
    //         })

    //         .done();
    // }

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

                </View>

                <Modal
                    isVisible={this.state.isModalPopupVisible}
                    style={styles.ispopupmodalvisible}
                    hasBackdrop={true}
                    cancelable={false}
                    animationInTiming={300}
                    animationOutTiming={300}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={300}
                >


                    <SafeAreaView style={{
                        flexDirection: 'column', backgroundColor: 'white', borderTopLeftRadius: 10,
                        borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                        , marginLeft: 20, marginBottom: 150, marginRight: 20, marginTop: 150

                    }}>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 50 }}>


                            <TouchableOpacity style={{ flex: .40, alignItems: 'flex-start', justifyContent: 'center' }}
                                onPress={() => { }} >

                                <Image
                                    source={APP_POPUP_LOGO}
                                    style={{ width: 100, height: 100, borderRadius: 100 / 2, marginLeft: 10, borderWidth: 2, borderColor: 'white' }}
                                />

                            </TouchableOpacity>

                        </View>

                        <Text style={styles.appnamestyle}>Y LAW</Text>

                        <Text style={styles.popupmsgstyle}>{stringsoflanguages.contract_request_posted_successfully}</Text>

                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={this.closecontractlogPopup}>

                            <Text style={styles.fbText}
                            >{stringsoflanguages.ok}</Text>

                        </TouchableOpacity>


                    </SafeAreaView>


                </Modal>


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

                    {/* <ScrollView> */}

                        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: '#007BA8' }}>


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
                                        style={styles.MenuHomeIconStyle} />

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
                                        style={styles.MenuContractIconStyle} />

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
                                        style={styles.MenuQuestionLogIconStyle} />

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
                                        style={styles.MenuContactusIconStyle} />

                                </TouchableOpacity>


                                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                    onPress={this.openContactus} >

                                    <Text style={styles.menutitlestyle}>{stringsoflanguages.contactus_menu}</Text>

                                </TouchableOpacity>

                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={this.openAboutus} >

                                    <Image source={require('../images/about_us.png')}
                                        style={styles.MenuAboutusIconStyle} />

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
                                        style={styles.MenuTermsIconStyle} />

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
                                        style={styles.logoutIconStyle} />

                                </TouchableOpacity>


                                <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                                    onPress={this.logout} >

                                    <Text style={styles.menutitlestyle}>{this.state.logoutlogintext}</Text>

                                </TouchableOpacity>

                            </View>


                        </SafeAreaView>

                    {/* </ScrollView> */}
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
                    keyExtractor={item => item.que_id}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}

                        onPress={() => {
                            if (screenname == "screen6") {
                                this.props.navigation.navigate('ServiceContractScreen6', {
                                    isgoback: true,
                                    answerArray: answerArray,
                                    completeArray: completeArray
                                })
                            }
                            else if (screenname == "screen7") {
                                this.props.navigation.navigate('ServiceContractScreen7', {
                                    isgoback: true,
                                    answerArray: answerArray,
                                    completeArray: completeArray
                                })
                            }
                            else if (screenname == "screen8") {
                                this.props.navigation.navigate('ServiceContractScreen8', {
                                    isgoback: true,
                                    answerArray: answerArray,
                                    completeArray: completeArray
                                })
                            }

                            isgoback = false;



                            // screenname
                            // this.props.navigation.goBack()
                        }

                        } >

                        <Image source={require('../images/back_button_grey.png')}
                            style={styles.FloatingButtonStyle} />


                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >


                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                        onPress={this.togglePopup}>

                        <Image source={require('../images/arrow_circle_blue_right.png')}
                            style={styles.FloatingButtonStyle} />


                    </TouchableOpacity>

                </View>




                {/* <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                    onPress={this.togglePopup}>

                    <Image source={require('../images/arrow_circle_blue_right.png')}
                        style={styles.FloatingButtonStyle} />

                </TouchableOpacity> */}



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>



                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                        onPress={() => {
                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('QuestionLog')
                            }
                        }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <IconBadge
                                MainElement={
                                    <Image source={require('../images/question-inactive.png')}
                                        style={styles.StyleQuestionsTab} />
                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                        {this.state.question_count}
                                    </Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 23,
                                        height: 23,
                                        marginRight: 20,
                                        backgroundColor: 'red'
                                    }
                                }
                                Hidden={this.state.question_count == 0}
                            />
                            <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>
                        </View>



                    </TouchableOpacity>

                    <View style={{
                        position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff',
                        width: 70, height: 100, bottom: 5, zIndex: 10
                    }}>

                        <View style={{ flex: 1 }}>
                            <ActionButton
                                buttonColor="#0094CD"
                            // onPress={() => {

                            //     this.props.navigation.navigate('ServiceContractScreen1')

                            // }}

                            >

                                {/* <ActionButton.Item buttonColor='#fffff' title="New Task" >

                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#fffff'
                                    title="Notifications" >

                                    <Image source={require('../images/chat_anim_menu.png')}
                                        style={styles.animationIconStyle} />
                                </ActionButton.Item>

                                <ActionButton.Item buttonColor='#fffff'
                                    title="Notifications">

                                    <Image source={require('../images/question_anim_menu.png')}
                                        style={styles.animationIconStyle} />
                                </ActionButton.Item>

                                <ActionButton.Item buttonColor='#fffff'
                                    title="Notifications">


                                </ActionButton.Item> */}

                            </ActionButton>
                        </View>
                    </View>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                        onPress={() => {
                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('contractLog')
                            }
                        }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <IconBadge
                                MainElement={
                                    <Image source={require('../images/contract-inactive.png')}
                                        style={styles.styleContractTab} />
                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                        {this.state.contract_count}
                                    </Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 23,
                                        height: 23,
                                        marginLeft: 20,
                                        backgroundColor: 'red'
                                    }
                                }
                                Hidden={this.state.contract_count == 0}
                            />
                            <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>
                        </View>



                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                        onPress={() => {

                            this.props.navigation.navigate('Contactus')

                        }}>

                        <Image source={require('../images/support-inactive.png')}
                            style={styles.StyleContactusTab} />

                        <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

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
        width: 30,
        height: 30,
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
    // MenuProfileIconStyle: {
    //     height: RFPercentage(3.9),
    //     width: RFPercentage(3.2),
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    MenuHomeIconStyle: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuProfileIconStyle: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuContractIconStyle: {
        width: 35,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuContractOrderIconStyle: {
        width: 35,
        height: 43,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuQuestionLogIconStyle: {
        width: 40,
        height: 32,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuContactusIconStyle: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuAboutusIconStyle: {
        width: 50,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuTermsIconStyle: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutIconStyle: {
        width: 40,
        height: 29,
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
        textAlign: 'left',
        marginLeft: 5,
        fontSize: RFPercentage(2.0)
    },
    ispopupmodalvisible: {
        alignItems: undefined,
        justifyContent: undefined, // This is the important style you need to set
    },
    appnamestyle: {
        marginTop: 50,
        color: "#626262",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFPercentage(4)
    },
    popupmsgstyle: {
        marginTop: 50,
        color: "#626262",
        textAlign: 'center',
        fontSize: RFPercentage(2)
    },
    SubmitButtonStyle: {
        marginTop: 50,
        width: 300,
        height: 40,
        padding: 10,
        marginBottom: 50,
        backgroundColor: '#0093C8',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    fbText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'
    },
    // badgeImageIconStyle: {
    //     marginTop: 10,
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    bottomactivebuttonstyle: {
        color: "#0094CD",
        fontSize: 7,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottominactivebuttonstyle: {
        color: "#887F82",
        fontSize: 7,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    StyleHomeTab: {
        marginTop: 5,
        width: 35,
        height: 32,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleQuestionsTab: {
        marginTop: 11,
        marginRight: 20,
        width: 30,
        height: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleContractTab: {
        marginTop: 9,
        width: 21,
        height: 30,
        marginLeft: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleContactusTab: {
        marginTop: 14,
        width: 28,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomquestiontextstyle: {
        color: "#887F82",
        fontSize: 7,
        marginRight: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottomcontracttextstyle: {
        color: "#887F82",
        fontSize: 7,
        marginLeft: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

});