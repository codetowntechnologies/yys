import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Divider } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export class DashboardActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            email: '',
            isVisible: false

        };
    }

    static navigationOptions = {
        title: 'Login Screen',
    };

   

    render() {
        return (

            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>Dashboard</Text>

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
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10 }}
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
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service Contracts {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Service contracts define agreements between {'\n'} customers and providers. </Text>


                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(3), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.props.navigation.navigate('ServiceContractScreen1') }}>Get it done now</Text>

                        </ImageBackground>



                        <View style={{ flexDirection: 'row', backgroundColor: '#f5f6f6', borderRadius: 20, marginTop: 10, margin: 5, height: 200, alignItems: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, borderRadius: 20, justifyContent: 'center', padding: 10, height: 100 }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/company.png')}
                                        style={styles.categoryIconStyle} />
                                </View>



                                <Text style={{ color: '#363435', fontSize: RFPercentage(2), fontWeight: 'bold' }}>25 yrs</Text>
                                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1), marginBottom: 5 }}>Old company</Text>

                            </View>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', height: 100 }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 40, width: 40 }}>
                                    <Image source={require('../images/category-legal-white.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#363435', fontSize: RFPercentage(2), fontWeight: 'bold' }}>2000</Text>
                                <Text style={{ color: '#0093c8', fontSize: RFPercentage(1), marginBottom: 5 }}>Question answered</Text>

                            </View>

                            <View style={{ flex: .34, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', height: 100 }}>
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
                    height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
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
                    animationType={'fade'}
                    height={400}
                    duration={250}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }}
                >

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

                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2, marginBottom: RFPercentage(5) }} />

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    }}>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                            }}>

                            <Image source={require('../images/cancel.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: RFPercentage(1), fontWeight: 'bold' }}>Cancel</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                this.RBSheet.close()
                                this.RBSheetConfirmDetails.open()

                            }}>


                            <Image source={require('../images/orange_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Confirm</Text>

                        </TouchableOpacity>


                    </View>




                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20, marginTop: 5
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

                </RBSheet>


                <RBSheet
                    ref={ref => {
                        this.RBSheetConfirmDetails = ref;
                    }}
                    animationType={'fade'}
                    height={420}
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
                                <Image source={require('../images/contract.png')}
                                    style={styles.categoryIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                onChangeText={name => this.setState({ name })}
                                placeholder={'Enter Name'}
                                style={styles.input} />


                        </View>

                        <Divider style={{ backgroundColor: '#aaaaaa' }} />


                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Image source={require('../images/contract.png')}
                                    style={styles.categoryIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                onChangeText={email => this.setState({ email })}
                                placeholder={'Enter Email'}
                                style={styles.input}
                            />
                        </View>

                        <Divider style={{ backgroundColor: '#aaaaaa' }} />


                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Image source={require('../images/contract.png')}
                                    style={styles.categoryIconStyle} />
                            </View>


                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                underlineColorAndroid='transparent'
                                onChangeText={email => this.setState({ email })}
                                placeholder={'Enter Mobile No.'}
                                style={styles.input}
                            />

                        </View>
                        <Divider style={{ backgroundColor: '#aaaaaa' }} />
                        <Text style={{ color: '#A0A0A0', fontSize: 10, marginLeft: 10, marginRight: 10, textAlign: 'right' }}>optional</Text>



                        <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}
                            onPress={() =>
                                //this.RBSheetConfirmDetails.close(),
                                this.setState({ isVisible: true })
                         
                         }>

                            <Text style={styles.experttext}> GET EXPERT ADVICE </Text>

                        </TouchableOpacity>


                    </View>


                    <Dialog
                        visible={this.state.isVisible}
                        onTouchOutside={() => {
                            this.setState({ isVisible: false });
                        }}
                        width={320}
                        height={220} >



<Text style={styles.experttext}> GET EXPERT ADVICE </Text>


                    </Dialog>


                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20, marginTop: 40
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

                </RBSheet>
            </View>





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
        height: 30,
        width: 30,
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
});

export default DashboardActivity;
