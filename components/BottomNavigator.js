import React from 'react';
import { View,TouchableOpacity, Image ,StyleSheet } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';



class BottomNavigator extends React.Component {
  
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Login Screen',
    };


    render() {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#E8F6FA', elevation: 20
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

                    <Image source={require('../images/contract-inactive.png')}
                        style={styles.ImageIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { this.props.navigation.navigate('VideoCall') }}>

                    <Image source={require('../images/support-inactive.png')}
                        style={styles.ImageIconStyle} />

                </TouchableOpacity>

            </View>


        );
    }
}
const styles = StyleSheet.create({

    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
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

export default BottomNavigator;