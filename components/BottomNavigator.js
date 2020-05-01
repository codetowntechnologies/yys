import React from 'react';
import { View,TouchableOpacity, Image ,StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'



class BottomNavigator extends React.Component {
  
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Login Screen',
    };


    render() {
        return (
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

        );
    }
}
const styles = StyleSheet.create({

    ImageIconStyle: {
        marginTop: 3,
        height: 30,
        width: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BottomNavigator;