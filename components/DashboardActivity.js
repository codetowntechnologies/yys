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

console.disableYellowBox = true;
//var islogin;


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
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/submit_question',
            isModalVisible: false,
        };
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    
      };
    
      openContractLog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('contractLog')
      };
    
      openProfile = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Profile')
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
                console.log("name ====" + this.state.is_login);
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

                        <Text style={styles.screenntitlestyle}>DASHBOARD</Text>

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

                <TouchableWithoutFeedback onPress={() => this.setState({ isModalVisible: false })}>
          <Modal isVisible={this.state.isModalVisible}
            style={styles.modal}
            hasBackdrop={true}
            animationIn={"slideInLeft"}
            animationOut={"slideOutLeft"}
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300} >

            <TouchableWithoutFeedback onPress={() => this.setState({ isModalVisible: false })}>

              <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#0097CF' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: '#007BA8' }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { }} >

                    <Image source={require('../images/orange_circle_right.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, flexDirection: 'column' }}
                    onPress={() => { }} >

                    <Text style={styles.usernameStyle}>Rahul Kumar</Text>

                    <Text style={styles.logindetailtextstyle}>last login: 09 may 2020, 6:00 PM</Text>

                  </TouchableOpacity>

                </View>



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.openDashboard} >

                    <Image source={require('../images/home_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80 }}
                    onPress={this.openDashboard} >

                    <Text style={styles.menutitlestyle}>Home</Text>

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

                    <Text style={styles.menutitlestyle}>Profile</Text>

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

                    <Text style={styles.menutitlestyle}>Contract Log</Text>

                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                  <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={
                      this.openQuestionLog
                    } >

                    <Image source={require('../images/questionlog_menu.png')}
                      style={styles.MenuIconStyle} />

                  </TouchableOpacity>


                  <TouchableOpacity style={{ flex: .80, justifyContent: 'center' }}
                    onPress={this.openQuestionLog} >

                    <Text style={styles.menutitlestyle}>Question Log</Text>

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

                    <Text style={styles.menutitlestyle}>Contact us</Text>

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

                    <Text style={styles.menutitlestyle}>About us</Text>

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

                    <Text style={styles.menutitlestyle}>Terms & Conditions</Text>

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

                    <Text style={styles.menutitlestyle}>Logout</Text>

                  </TouchableOpacity>

                </View>


              </SafeAreaView>

            </TouchableWithoutFeedback>
          </Modal>

        </TouchableWithoutFeedback>


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


                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={this.openlegalsheet}>Get your answer </Text>

                        </ImageBackground>


                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10, shadowColor: '#D0D0D0', elevation: 20 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service Contracts {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service contracts define agreements between {'\n'} customers and providers. </Text>


                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Get it done now</Text>

                        </ImageBackground>

                    </View>
                </ScrollView>




                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                    height: 60, borderRadius: 30, margin: 5, shadowColor: '#E8F6FA', elevation: 20



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

                    <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

                        <View style={{ flex: 1 }}>
                            <ActionButton buttonColor="#0094CD">

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

                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('VideoCall')
                            }


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
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
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


                            <Image source={require('../images/orange_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Confirm</Text>

                        </TouchableOpacity>


                    </View>



                </RBSheet>

                {this.state.loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}

                <RBSheet
                    ref={ref => {
                        this.RBSheetConfirmDetails = ref;
                    }}
                    // onClose={() => {
                    //     this.checklegaldata
                    // }}
                    animationType={'fade'}
                    height={440}
                    duration={250}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >

                    <Text style={{ color: '#0093c8', fontSize: 20, marginLeft: 10, marginRight: 10, textAlign: 'center', padding: 10, fontWeight: 'bold' }}>Confirm Details</Text>



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Image source={require('../images/profile.png')}
                                    style={styles.ImageIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                placeholder={'Enter Name'}
                                value={this.state.name}
                                editable={false}
                                style={styles.input} />


                        </View>

                        <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />



                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 43, width: 43,
                                justifyContent: 'center', alignItems: 'center', alignContent: 'center'
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

                        <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />



                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Image source={require('../images/phone.png')}
                                    style={styles.ImageIconStyle} />
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
                        <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />

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
    categoryIconStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    emailIconStyle: {
        height: 20,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionIconStyle: {
        marginTop: 3,
        height: 50,
        width: 50,
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
        fontSize: RFPercentage(10),
        backgroundColor: '#dc8517',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    experttext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
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
