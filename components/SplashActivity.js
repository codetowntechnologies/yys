import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

import stringsoflanguages from './locales/stringsoflanguages';


class SplashActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage:''
        };
    }


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }



    static navigationOptions = {
        title: 'Splash'
    };

    componentDidMount() {

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
           
            if (selectedLanguage) 
            {
              
              if(selectedLanguage=="English")
              {
                stringsoflanguages.setLanguage("en");
                AsyncStorage.setItem('@language', "English");
              }else{
                AsyncStorage.setItem('@language', "Arabic");
                stringsoflanguages.setLanguage("ar");
              }
      
            }else if(selectedLanguage==null)
            {
                AsyncStorage.setItem('@language', "Arabic");
                stringsoflanguages.setLanguage("ar");
            }
            console.log('language======' + selectedLanguage)
            this.props.navigation.addListener('willFocus', this.load)

          });
       
    }

    componentWillUnmount() {

        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    load = () => {
        this.showLoading();
    
        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition

            AsyncStorage.getItem('@is_login').then((isLogin) => {
                if (isLogin == undefined || isLogin == "0") {
                    this.props.navigation.navigate('Login')
                } else if (isLogin == "1") {
                    this.props.navigation.navigate('Dashboard')
                }
            });

        
        }, 4000);
    }


    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../images/yys_shadow_logo-new.png')} />

        <Text style={styles.headerdescription}>{stringsoflanguages.sponsored_by_yys_legal_from_office}</Text>

                {this.state.loading && (
                                <View style={styles.loading}>
                                    <ActivityIndicator size="large" color="#FFC33B"  />

                <Text style={styles.loading_text}>{stringsoflanguages.loading}</Text>

                                </View>
                            )} 

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0093c8'

    },
    headerText: {
        fontSize: 120,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    headerdescription: {
        marginTop: 20,
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: 'white'
    },
    categoryIconStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {

        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading_text: {
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFC33B',
        fontWeight: 'bold'
    },
});

export default SplashActivity;
