import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'


export class LegalAdviceActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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

                        <View style={{ shadowColor: '#ecf6fb', elevation: 20 }}>

                            <ImageBackground style={styles.imgBackground}
                                source={require('../images/dashboard.png')}>

                            </ImageBackground>

                        </View>


                        <View style={{ flexDirection: 'row', backgroundColor: '#f5f6f6', borderTopLeftRadius: 20, borderT: 20, marginTop: 10, margin: 5, height: 200, alignItems: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>





                        </View>


                    </View>
                </ScrollView>

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
});

export default LegalAdviceActivity;
