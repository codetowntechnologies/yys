import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;


export class DashboardActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            isVisible: false,
            isOpen:false,
            userId: '',
            email:'',
            mobileno: '',
            questiontext:'' 
        };
    }




    static navigationOptions = {
        title: 'Dashboard Screen',
    };


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

    }



    render() {
        return (

            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>DASHBOARD</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>




                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.scrollViewInsideContainer}>


                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10, shadowColor: '#D0D0D0', elevation: 20 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(28, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.RBSheet.open() }}>Legal Advice {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.RBSheet.open() }}>Real lawyers. Real Answers. Right Now. </Text>


                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.RBSheet.open() }}>Get your answer </Text>

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



                        <View style={{
                            flexDirection: 'row', backgroundColor: '#F1F2F2', borderRadius: 20, marginTop: 10, margin: 5, height: 200, alignItems: 'center',
                            shadowColor: '#ecf6fb', elevation: 20,   shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 1,
                              width: 1
                            }
                        }}>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, borderRadius: 20, justifyContent: 'center', padding: 10, 
                            height: 100, shadowColor: '#D0D0D0', elevation: 20,    shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 1,
                              width: 1
                            } }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 40, width: 40,
                             }}>

                                    <Image source={require('../images/company.png')}
                                        style={styles.categoryIconStyle} />
                                </View>



                                <Text style={{ color: '#363435', fontSize: RFPercentage(2), fontWeight: 'bold' }}>25 yrs</Text>
                                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1), marginBottom: 5 }}>Old company</Text>

                            </View>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', height: 100, 
                            shadowColor: '#D0D0D0', elevation: 20,   shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 1,
                              width: 1
                            } }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 40, width: 40 }}>
                                    <Image source={require('../images/category-legal-white.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#363435', fontSize: RFPercentage(2), fontWeight: 'bold' }}>2000</Text>
                                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1), marginBottom: 5 }}>Question answered</Text>

                            </View>

                            <View style={{ flex: .34, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', 
                            height: 100, shadowColor: '#D0D0D0', elevation: 20,    shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 1,
                              width: 1
                            } }}>
                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 40, width: 40 }}>
                                    <Image source={require('../images/contract.png')}
                                        style={styles.categoryIconStyle} />
                                </View>



                                <Text style={{ color: '#363435', fontSize: RFPercentage(2), fontWeight: 'bold' }}>2000</Text>
                                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1), marginBottom: 5 }}>Completed Contract</Text>

                            </View>


                        </View>

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
                        onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

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


                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    onClose={()=>{
                        if(this.state.isOpen){
                            this.RBSheetConfirmDetails.open()
                        
                        }
                    } }
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

                    <View style={{ borderBottomColor: '#aaaaaa',  borderBottomWidth: 1, marginTop: 2, marginBottom: RFPercentage(5)}} />

                   
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    }}>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                                this.RBSheetConfirmDetails.close()
                            }}>

                            <Image source={require('../images/cancel.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: RFPercentage(1), fontWeight: 'bold' }}>Cancel</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                this.RBSheet.close()

                                this.setState({ isOpen:true })
                             
                            

                            }}>


                            <Image source={require('../images/orange_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Confirm</Text>

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

                    }}
                >

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

                        <View style={{ borderBottomColor: '#aaaaaa',  borderBottomWidth: 1 }} />

               
                     
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

                        <View style={{ borderBottomColor: '#aaaaaa',  borderBottomWidth: 1}} />



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
                                style={styles.input}
                            />

                        </View>
                        <View style={{ borderBottomColor: '#aaaaaa',  borderBottomWidth: 1}} />

                        <Text style={{ color: '#A0A0A0', fontSize: 10, marginLeft: 10, marginRight: 10, textAlign: 'right' }}>optional</Text>



                        <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}
                            onPress={() =>
                                this.RBSheetConfirmDetails.close()

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
        marginLeft:5,
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
    //   shadow: {
    //     shadowOffset: { width: 10, height: 10 },
    //     shadowColor: 'black',
    //     shadowOpacity: 1,
    //     elevation: 3,
    //     // background color must be set
    //     backgroundColor : "#0000" // invisible color
    //   }
});

export default DashboardActivity;
