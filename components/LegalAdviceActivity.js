import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon, Divider } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";


export class LegalAdviceActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    static navigationOptions = {
        title: 'Login Screen',
    };


    componentDidMount = () => {

        this.RBSheet.open()
    }

    render() {
        return (
         
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.scrollViewInsideContainer}>

                        <View style={{ shadowColor: '#ecf6fb', elevation: 20 }}>

                            <ImageBackground style={styles.imgBackground}
                                source={require('../images/dashboard.png')}>

                            </ImageBackground>

                        </View>

                    </View>
                </ScrollView>





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
                        style={styles.input}
                    />

                    <Text style={{textAlign: "right", marginRight: 5, color: '#BFBFBF'}}>
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
                                this.props.navigation.navigate('LegalAdvice') }}>

                        


                            <Image source={require('../images/orange_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold'}}>Confirm</Text>

                        </TouchableOpacity>


                    </View>

                    </RBSheet>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

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



            </View>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 60,
        backgroundColor: '#e6eaf1'
    },
    scrollViewContainer: {
        backgroundColor: '#e6eaf1',

    },
    scrollViewInsideContainer: {
        backgroundColor: '#e6eaf1'
    },
    imgBackground: {
        height: '30%',
        height: 200,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
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

});

export default LegalAdviceActivity;
