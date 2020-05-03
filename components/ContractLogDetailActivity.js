import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import { Divider } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class QuestionLogDetailActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }


    static navigationOptions = {
        title: 'Question Log Detail Screen',
    };



    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>



                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }} >

                        <Image source={require('../images/back_blue.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>




                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>CONTRACT LOG</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>


                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.container, { flex: 1, marginBottom: 60 }}>

                        <View style={{ flexDirection: 'column', backgroundColor: '#f1f5fd' }}>

                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb' }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>1</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>you will now start answering a few questions. First give a subject title to your order.</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>ABC company</Text>


                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>2</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>3</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>4</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>5</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>6</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', marginTop: 20 }}>

                                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                                    <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>7</Text>

                                </View>

                                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(12, 580) }}>What is your business type?</Text>
                                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2 }} />

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Legal Service</Text>


                                </View>

                            </View>




                            <View style={{ flexDirection: 'column', backgroundColor: '#FEFEFE', borderRadius: 20, marginTop: 20, margin: 5, alignItems: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                                <View style={{ flexDirection: 'row', padding: 5, marginLeft: 5, marginRight: 5 }}>

                                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Reply</Text>

                                    <Text style={{ color: '#616161', fontSize: RFPercentage(1.7), flex: .5, textAlign: 'right', marginRight: 5 }}>YYS Advisor</Text>
                                </View>

                                <View style={styles.hairline} />


                                <View style={{ flexDirection: 'row', backgroundColor: '#F0F5FE', marginLeft: 20, marginRight: 20, marginBottom: 20, width: '95%', height: 100, borderRadius: 20, marginTop: 10 }}>


                                    <TextInput
                                        placeholder={'To know more contact to KYS Support.'}
                                        placeholderTextColor="#5F6063"
                                        underlineColorAndroid='transparent'
                                        onChangeText={value => this.setState({ value })}
                                        multiline={true}
                                        style={styles.inputmultiline}
                                    />

                                    {/* <Text style={{ color: '#767475', alignItems: 'center', justifyContent: 'center', fontSize: 14, padding: 10 }}>To know more contact to KYS Support.</Text>

                                */}

                                </View>
                            </View>

                        </View>



                        <TouchableOpacity
                            style={styles.blueButtonStyle}
                            activeOpacity={.5}>

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={styles.experttext}> Estimated Cost </Text>

                                <View style={{ flexDirection: 'row', backgroundColor: '#FEFEFE', borderRadius: 5, width: 100, margin: 5, alignItems: 'center', justifyContent: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                                    <Text style={{ color: '#0093c8', fontWeight: 'bold', fontSize: RFPercentage(1.5), flex: .5, marginLeft: 5 }}>500 KD</Text>

                                </View>

                            </View>

                        </TouchableOpacity>



                        <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}>

                            <Text style={styles.experttext}> Are You Interested </Text>

                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20
                        }}>

                            <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {

                                }}>

                                <Image source={require('../images/cancel.png')}
                                    style={styles.actionIconStyle} />

                                <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: RFPercentage(1), fontWeight: 'bold' }}>No</Text>

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {



                                }}>




                                <Image source={require('../images/orange_circle_right.png')}
                                    style={styles.actionIconStyle} />

                                <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Yes</Text>

                            </TouchableOpacity>


                        </View>




                    </View>

                </ScrollView>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home-inactive.png')}
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

                        <Image source={require('../images/contract-active.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VideoCall') }}>

                        <Image source={require('../images/support-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5fd'
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
        // Setting up View inside component align horizontally center.
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
    animationIconStyle: {
        marginTop: 3,
        height: 60,
        width: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default QuestionLogDetailActivity;
