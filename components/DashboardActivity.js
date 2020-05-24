import React from 'react';
import {
    StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput,
    SafeAreaView, ActivityIndicator, TouchableWithoutFeedback
} from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';


import stringsoflanguages from './locales/stringsoflanguages';


console.disableYellowBox = true;
const APP_LOGO = require('../images/yys_shadow_logo-new.png');
const PROFILE_IMAGE = require('../images/demo_profile.jpg');
var icon;

export class DashboardActivity extends React.Component {

    constructor(props) {
        super(props);
        this.updateLegalValue = this.updateLegalValue.bind(this);
        this.state = {
            value: '',
            name: '',
            isVisible: false,
            isOpen: false,
            isCancelSheet: false,
            userId: '',
            email: '',
            mobileno: '',
            questiontext: '',
            islogin: '',
            lastLogin: '',
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/submit_question',
            isModalVisible: false,
            isUsernameVisible: false,
            logoutlogintext: '',
            selectedLanguage:''

        };
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

    };

    openContractLog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        if (this.state.islogin == '0') {
            this.props.navigation.navigate('Login')
        } else {
            this.props.navigation.navigate('contractLog')
        }
    };

    openProfile = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        if (this.state.islogin == '0') {

            this.props.navigation.navigate('Login')
        } else {
            this.props.navigation.navigate('Profile')
        }
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
        if (this.state.islogin == '0') {

            this.props.navigation.navigate('Login')
        } else {
            this.setState({ isModalVisible: !this.state.isModalVisible });
            this.props.navigation.navigate('QuestionLog')
        }
    };

    logout = () => {

        if (this.state.islogin == '0') {

            this.props.navigation.navigate('Login')
        } else {
            this.setState({ isModalVisible: !this.state.isModalVisible });
            AsyncStorage.setItem('@is_login', "");
            this.props.navigation.navigate('Splash')
        }
    };


    static navigationOptions = {
        title: 'Dashboard Screen',
    };


    // this code used for default navigation
    // static navigationOptions = function (props) {

    //     return {

    //         title: 'Dashboard Screen',

    //         headerRight: <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    //             onPress={() => { props.navigation.navigate('Notification') }}>
    //             <Image source={require('../images/notification.png')} />
    //         </TouchableOpacity>

    //     }

    // };




    componentDidMount() {


        this.showLoading();

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

        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
            }
        });

        AsyncStorage.getItem('@email').then((email) => {
            if (email) {
                this.setState({ email: email });
                console.log("email ====" + this.state.email);
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
                    this.setState({ logoutlogintext: 'Login/Signup' })
                    icon = APP_LOGO;
                }
                else {
                    this.setState({ isUsernameVisible: true })
                    this.setState({ logoutlogintext: stringsoflanguages.logout_menu})
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
    openlegalsheet = () => {
        if (this.state.islogin == '0') {
            this.props.navigation.navigate('Login')
        } else {
            this.RBSheet.open()
        }
    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    checklegaldata = () => {

        this.showLoading();
        this.updateLegalValue();

    };




    updateLegalValue() {

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
                question: this.state.value,
                contact_no: this.state.mobileno
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    alert(responseData.message);
                    this.RBSheetConfirmDetails.close()
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

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.toggleModal} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

        <Text style={styles.screenntitlestyle}>{stringsoflanguages.dashboard}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('Notification')
                            }

                        }} >

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
                                    source={icon}
                                    style={{ width: 80, height: 80, borderRadius: 80 / 2, marginLeft: 10, borderWidth: 2, borderColor: 'white' }}
                                />


                            </TouchableOpacity>
                            {
                                this.state.isUsernameVisible ?

                                    <TouchableOpacity style={{ flex: .60, flexDirection: 'column' }}
                                        onPress={() => { }} >

                                        <Text style={styles.usernameStyle}>{this.state.name}</Text>

                                        <Text style={styles.logindetailtextstyle}>{this.state.lastLogin}</Text>


                                    </TouchableOpacity>
                                    : null
                            }

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



                <ScrollView style={styles.scrollViewContainer}>


                    <View style={styles.scrollViewInsideContainer}>



                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10, shadowColor: '#D0D0D0', elevation: 20 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(28, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={this.openlegalsheet}>Legal Advice {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={this.openlegalsheet}>Real lawyers. Real Answers. Right Now. </Text>



                            {/* {this.state.loading && (
                                <View style={styles.loading}>
                                    <ActivityIndicator size="large" color="#fffff" />
                                </View>
                            )} */}

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 10 }}
                                    onPress={this.openlegalsheet}>Get your answer </Text>

                                <Image
                                    style={{ marginTop: 27 }}
                                    source={require('../images/white_right_arrow.png')} />

                            </View>
                        </ImageBackground>




                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10, shadowColor: '#D0D0D0', elevation: 20 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service Contracts {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service contracts define agreements between {'\n'} customers and providers. </Text>

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 10 }}
                                    onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Get it done now</Text>

                                <Image
                                    style={{ marginTop: 27 }}
                                    source={require('../images/white_right_arrow.png')} />



                            </View>
                        </ImageBackground>

                    </View>
                </ScrollView>




                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                    height: 60, borderRadius: 30, margin: 5, shadowColor: 'grey', elevation: 20,
                    shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
                }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        onPress={() => {

                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('QuestionLog')
                            }

                        }}>

                        <Image source={require('../images/question-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                    <View style={{
                        position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff',
                        width: 70, height: 100, bottom: 5, zIndex: 10
                    }}>

                        <View style={{ flex: 1 }}>
                            <ActionButton
                                buttonColor="#0094CD">

                                <ActionButton.Item buttonColor='#fffff' title="New Task" >

                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#fffff'
                                    title="Notifications"
                                >

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


                                </ActionButton.Item>

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

                        <Image source={require('../images/contract-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {

                            // if (this.state.islogin == '0') {
                            //     this.props.navigation.navigate('Login')
                            // } else {
                            this.props.navigation.navigate('Contactus')



                        }}>

                        <Image source={require('../images/support-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                </View>


                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}

                    onClose={() => {
                        if (this.state.isOpen && this.state.value != '') {
                            this.RBSheetConfirmDetails.open()
                        } else if (this.state.isCancelSheet) {
                            // do nothing
                        } else if (this.state.isOpen && this.state.value == '') {
                            alert("please enter situtaton/problem first to continue")
                        }
                    }}
                    animationType={'fade'}
                    height={440}
                    duration={250}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }}>

                    <Text style={{ color: '#C2C2C2', fontSize: RFPercentage(2), marginLeft: 10, marginRight: 10, textAlign: 'center', padding: 10 }}>Enter your detailed situation/problem here</Text>


                    <TextInput
                        placeholderTextColor="#7f8ec5"
                        underlineColorAndroid='transparent'
                        onChangeText={value => this.setState({ value })}
                        multiline={true}
                        maxLength={1000}
                        style={styles.inputmultiline}
                    />

                    <Text style={{ textAlign: "right", marginRight: 5, color: '#BFBFBF' }}>
                        Characters remaining: {this.state.value.length}/1000
                    </Text>

                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginTop: 2, marginBottom: RFPercentage(5) }} />


                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1
                    }}>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                                this.setState({ isCancelSheet: true })
                                this.RBSheetConfirmDetails.close()
                            }}>

                            <Image source={require('../images/cancel.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: RFPercentage(1), fontWeight: 'bold' }}>Cancel</Text>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                                this.setState({ isCancelSheet: false })
                                this.setState({ isOpen: true })

                            }}>

                            <Image source={require('../images/blue_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Confirm</Text>

                        </TouchableOpacity>



                    </View>


                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                                //  this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                this.RBSheet.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

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
                            onPress={() => {
                                this.RBSheet.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                                // this.RBSheet2.close()
                                this.props.navigation.navigate('Contactus')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>

                    </View>

                </RBSheet>



                <RBSheet
                    ref={ref => {
                        this.RBSheetConfirmDetails = ref;
                    }}
                    animationType={'fade'}
                    height={440}
                    duration={250}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >

                    <Text style={{ color: '#0093c8', fontSize: 20, marginLeft: 10, marginRight: 10, padding: 10, fontWeight: 'bold' }}>Confirm Details</Text>



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center',
                                alignContent: 'center', borderWidth: 2, borderBottomWidth: 0,
                                borderColor: '#0093c8'
                            }}>
                                <Image source={require('../images/profile.png')}
                                    style={styles.NameIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                placeholder={'Enter Name'}
                                value={this.state.name}
                                editable={false}
                                style={styles.input} />


                        </View>

                        <View style={{ borderBottomColor: '#0093c8', borderBottomWidth: 1 }} />




                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 43, width: 43,
                                justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                borderWidth: 2, borderBottomWidth: 0,
                                borderColor: '#0093c8',
                            }}>
                                <Image source={require('../images/email.png')}
                                    style={styles.emailIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                placeholder={'Enter Email'}
                                value={this.state.email}
                                editable={false}
                                style={styles.input}
                            />
                        </View>

                        <View style={{ borderBottomColor: '#0093c8', borderBottomWidth: 1 }} />



                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                borderBottomWidth: 0, alignSelf: 'flex-end', height: 40, borderWidth: 2,
                                borderColor: '#0093c8', width: 40, justifyContent: 'center',
                                alignItems: 'center', alignContent: 'center'
                            }}>
                                <Image
                                    source={require('../images/phone.png')}
                                    style={styles.PhoneIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                onChangeText={mobileno => this.setState({ mobileno })}
                                placeholder={'Enter Mobile No.'}
                                keyboardType='number-pad'
                                style={styles.input}
                            />

                        </View>

                        <View style={{ borderBottomColor: '#0093c8', borderBottomWidth: 1 }} />

                        <Text style={{ color: '#A0A0A0', fontSize: 10, marginLeft: 10, marginRight: 10, textAlign: 'right' }}>optional</Text>

                        <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}
                            onPress={
                                this.checklegaldata
                            }>

                            <Text style={styles.experttext}> GET EXPERT ADVICE </Text>

                        </TouchableOpacity>


                    </View>


                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //    this.RBSheet1.close()
                                this.RBSheetConfirmDetails.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                //  this.RBSheet1.close()
                                this.RBSheetConfirmDetails.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

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
                            onPress={() => {
                                // this.RBSheet1.close()
                                this.RBSheetConfirmDetails.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //   this.RBSheet1.close()
                                this.RBSheetConfirmDetails.close()
                                this.props.navigation.navigate('Contactus')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>

                    </View>

                </RBSheet>

            </SafeAreaView>






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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F0F5FE',

    },
    scrollViewContainer: {
        backgroundColor: '#F0F5FE'

    },
    scrollViewInsideContainer: {
        backgroundColor: '#F0F5FE'
    },
    imgBackground: {
        height: 200,
        marginTop: 10
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PhoneIconStyle: {
        tintColor:'#0093c8',
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    NameIconStyle: {
        tintColor: '#0093c8',
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },



    categoryIconStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    emailIconStyle: {
        tintColor: '#0093c8',
        height: 20,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionIconStyle: {
        marginTop: 3,
        height: 70,
        width: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationIconStyle: {
        marginTop: 3,
        height: 60,
        width: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputmultiline: {
        color: 'black',
        height: 140,
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        backgroundColor: '#ffffff'
    },
    input: {
        color: 'black',
        height: 50,
        borderWidth: 0,
        marginLeft: 5,
        fontSize: RFPercentage(2),
        textAlignVertical: 'bottom',
        backgroundColor: '#ffffff'
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 50,
        fontWeight: 'bold',
        borderRadius: 8,
        borderColor: '#0093C8',
        borderWidth: 2,
        fontSize: RFPercentage(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    experttext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0093C8',
        textAlign: 'center'
    },
    screenntitlestyle: {
        color: "#0094CD",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    ImagelockIconStyle: {
        height: 10,
        width: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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

export default DashboardActivity;
