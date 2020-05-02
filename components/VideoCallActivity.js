import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native';



class VideoCallActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View style={styles.container}>

                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../images/bg.png')}
                >


                    <Text style={styles.headerdescription}>UNDER DEVELOPMENT</Text>


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
    headerdescription: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white'
    }
});

export default VideoCallActivity;
