import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import SignupActivity from './components/SignupActivity';
import OTPActivity from './components/OTPActivity';
import HomeNaviagtionActivity from './components/HomeNavigationScreen';
import HomeChildNaviagtionActivity from './components/HomeChildNavigationScreen';
import HomeActivity from './components/HomeActivity';
import QuestionLogActivity from './components/QuestionLogActivity';
import QuestionLogDetailActivity from './components/QuestionLogDetailActivity';
import DashboardActivity from './components/DashboardActivity';
import BottomNavigator from './components/BottomNavigator';
import LegalAdviceActivity from './components/LegalAdviceActivity';



const NavStack = createStackNavigator(
    {
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        Otp: { screen: OTPActivity },
        HomeNaviagtion: { screen: HomeNaviagtionActivity },
        HomeChildNaviagtion: { screen: HomeChildNaviagtionActivity },
        Home: { screen: HomeActivity },
        QuestionLog: { screen: QuestionLogActivity },
        QuestionLogDetail: { screen: QuestionLogDetailActivity },
        Dashboard: { screen: DashboardActivity },
        BottomNavigatorScreen : {screen : BottomNavigator},
        LegalAdvice: { screen: LegalAdviceActivity }


    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }

);

const Apps = createAppContainer(NavStack);

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}