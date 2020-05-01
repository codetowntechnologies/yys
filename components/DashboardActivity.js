import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon, Divider } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";



export class DashboardActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            email: ''

        };
    }

    static navigationOptions = {
        title: 'Login Screen',
    };



    render() {
        return (

            <View style={styles.container}>
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.scrollViewInsideContainer}>


                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard.png')}>

                            <Text style={{ color: '#ffffff', fontSize: 13, textAlign: 'center', marginBottom: 5 }}
                                onPress={() => { this.RBSheet.open() }}>click here</Text>


                        </ImageBackground>


                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}
                        />



                        <View style={{ flexDirection: 'row', backgroundColor: '#f5f6f6', borderRadius: 20, marginTop: 10, margin: 5, height: 200, alignItems: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, borderRadius: 20, justifyContent: 'center', padding: 10, height: 100 }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 50, width: 50 }}>

                                </View>

                                <Text style={{ color: '#363435', fontSize: 15, fontWeight: 'bold' }}>25 yrs</Text>
                                <Text style={{ color: '#0093c8', fontSize: 10, marginBottom: 5 }}>Old company</Text>

                            </View>

                            <View style={{ flex: .33, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', height: 100 }}>

                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 50, width: 50 }}>

                                </View>

                                <Text style={{ color: '#363435', fontSize: 15, fontWeight: 'bold' }}>2000</Text>
                                <Text style={{ color: '#0093c8', fontSize: 10, marginBottom: 5 }}>Question answered</Text>

                            </View>

                            <View style={{ flex: .34, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 20, justifyContent: 'center', height: 100 }}>
                                <View style={{ backgroundColor: '#dc8517', margin: 5, borderRadius: 10, alignSelf: 'flex-end', padding: 10, height: 50, width: 50 }}>

                                </View>

                                <Text style={{ color: '#363435', fontSize: 15, fontWeight: 'bold' }}>2000</Text>
                                <Text style={{ color: '#0093c8', fontSize: 10, marginBottom: 5 }}>Completed Contract</Text>

                            </View>


                        </View>

                    </View>
                </ScrollView>



                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                    height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
                }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

                        <Image source={require('../images/question-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                    <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#f8f4f4', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 10 }}>

                        <Icon
                            name='add'
                            type='material'
                            color='#0093c8'
                            containerStyle={{ alignSelf: 'center' }}
                            reverse
                            size={28}
                            onPress={() => { }}
                        />
                    </View>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { console.log("click========") }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { console.log("click========") }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                </View>


                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
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

                    <Text style={{ color: '#C2C2C2', fontSize: 15, marginLeft: 10, marginRight: 10, textAlign: 'center', padding: 10 }}>Enter your detailed situation/problem here</Text>


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

                    <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 2, marginBottom: 20 }} />

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    }}>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet.close()
                            }}>

                            <Image source={require('../images/cancel.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Cancel</Text>

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
                        height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
                    }}>

                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                            <Image source={require('../images/home-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                this.RBSheet.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

                            <Image source={require('../images/question-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>

                        <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#f8f4f4', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 10 }}>

                            <Icon
                                name='add'
                                type='material'
                                color='#0093c8'
                                containerStyle={{ alignSelf: 'center' }}
                                reverse
                                size={28}
                                onPress={() => { }}
                            />
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { console.log("click========") }}>

                            <Image source={require('../images/home-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { console.log("click========") }}>

                            <Image source={require('../images/home-inactive.png')}
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

                    }}
                >

                    <Text style={{ color: '#0093c8', fontSize: 20, marginLeft: 10, marginRight: 10, textAlign: 'center', padding: 10, fontWeight: 'bold' }}>Confirm Details</Text>



                    <View style={{ flexDirection: 'column' }}>

                        <TextInput
                            placeholderTextColor="#A0A0A0"
                            underlineColorAndroid='transparent'
                            onChangeText={name => this.setState({ name })}
                            placeholder={'Enter Name'}
                            style={styles.input}
                        />

                        <Divider style={{ backgroundColor: '#aaaaaa' }} />


                        <TextInput
                            placeholderTextColor="#A0A0A0"
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            placeholder={'Enter Email'}
                            style={styles.input}
                        />

                        <Divider style={{ backgroundColor: '#aaaaaa' }} />



                        <TextInput
                            placeholderTextColor="#A0A0A0"
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            placeholder={'Enter Mobile No.'}
                            style={styles.input}
                        />

                        <Divider style={{ backgroundColor: '#aaaaaa' }} />



                        <TouchableOpacity
                            style={styles.expertButtonStyle}
                            activeOpacity={.5}
                            onPress={() =>
                                this.RBSheetConfirmDetails.close()}>

                            <Text style={styles.experttext}> GET EXPERT ADVICE </Text>

                        </TouchableOpacity>


                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20, marginTop: 50
                    }}>

                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                            <Image source={require('../images/home-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                this.RBSheetConfirmDetails.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

                            <Image source={require('../images/question-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>

                        <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#f8f4f4', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 10 }}>

                            <Icon
                                name='add'
                                type='material'
                                color='#0093c8'
                                containerStyle={{ alignSelf: 'center' }}
                                reverse
                                size={28}
                                onPress={() => { }}
                            />
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { console.log("click========") }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { console.log("click========") }}>

                            <Image source={require('../images/home-inactive.png')}
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
        marginTop: 60,
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
        height: 30,
        width: 30,
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

    inputmultiline: {
        color: 'black',
        height: 200,
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        backgroundColor: '#ffffff'
    },
    input: {
        color: 'black',
        height: 50,
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        fontSize: 20,
        textAlignVertical: 'top',
        backgroundColor: '#ffffff'
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 50,
        fontWeight: 'bold',
        borderRadius: 5,
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

});

export default DashboardActivity;
