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
    SafeAreaView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';




class ForgotPasswordActivity extends Component {
    constructor(props) {
        super(props);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.state = {
            JSONResult: '',
            email: '',
            status: '',
            wholeResult: '',
            selectedLanguage:'',
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/forget_send_otp'
        };
    }

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.email != '') {
            //Check for the Name TextInput
            this.showLoading();
           this.forgotPassword();

        } else {
            alert('Please Enter Email');
        }
    };

    static navigationOptions = {
        title: 'Forgot Password Screen',
    };


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


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }



    forgotPassword() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                email_id: this.state.email
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();

                this.props.navigation.navigate('ForgetOTP', {
                    email: this.state.email,
                })


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

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0093c8', 
                height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }} >

                        <Image
                      
                            source={require('../images/back_blue.png')}

                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}></Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

                    </TouchableOpacity>

                </View>


                <ScrollView>

                    
                    <Image style={styles.headerLogo}
                        source={require('../images/yys_shadow_logo-new.png')}>

                    </Image>
        <Text style={styles.headerdescription}>{stringsoflanguages.sponsored_by_yys_legal_from_office}</Text>


                    <Text style={styles.forgotpasswordtext}>{stringsoflanguages.enter_your_registered_email_address} </Text>

                    {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}


                    <View style={styles.datacontainer}>

                        <View style={styles.SectionStyle}>

                            <Image source={require('../images/email.png')}
                                style={styles.ImageIconStyle} />

                            <TextInput
                                placeholderTextColor="#C7E8F2"
                                onChangeText={email => this.setState({ email })}
                                placeholder={stringsoflanguages.email_placeholder}
                                underlineColorAndroid="transparent"
                                style={styles.input}
                            />

                        </View>



                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>



                            <Text style={styles.fbText}> {stringsoflanguages.forgot_password_button_text} </Text>

                        </TouchableOpacity>



                    </View>
                </ScrollView>
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
        //backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0093c8'
    },
    datacontainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerdescription: {
        marginTop: 20,
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFFFFF'
    },
    forgotpasswordtext: {
        marginTop: 40,
        fontSize: RFValue(12, 580),
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        color: '#FFFFFF'
    },
    input: {
        color: '#ffffff',
        width: 300,
        height: 44,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    SubmitButtonStyle: {
        marginTop: 50,
        width: 300,
        height: 40,
        padding: 10,
        backgroundColor: '#FFC100',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    skipbrowseText: {
        fontSize: 20,
        textAlign: 'right',
        color: '#F0F5FE',
        marginRight: 43,
        marginTop: 50,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    fbText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'
    },

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    ImageIconStyle: {
        height: 20,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImagelockIconStyle: {
        height: 28,
        width: 27,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    headerLogo: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
        width: 45,
        tintColor:'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ForgotPasswordActivity;
