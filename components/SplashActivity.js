import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from 'react-native';



class SplashActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    static navigationOptions = {
        title: 'Splash'
    };

    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.load)

    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    load = () => {

        // try {
        //     // play the file tone.mp3
        //     SoundPlayer.playSoundFile('carstartgarage', 'mp3')
        //     // or play from url
        //     //    SoundPlayer.playUrl('https://example.com/music.mp3')
        // } catch (e) {
        //     console.log(`cannot play the sound file`, e)
        // }


        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition

            // AsyncStorage.getItem('@is_login').then((isLogin) => {
            //     if (isLogin == undefined || isLogin == "0") {
            this.props.navigation.navigate('Login')
            // } else if (isLogin == "1") {
            //     this.props.navigation.navigate('LandingScreen')
            // }
            //  });

        }, 4000);
    }


    render() {
        return (
            <View style={styles.container}>




                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../images/bg.png')}>


                    <Text style={styles.headerText}>YYS</Text>
                    <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>


                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 120,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    headerdescription: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white'
    },
});

export default SplashActivity;
