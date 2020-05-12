import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import SignupActivity from './components/SignupActivity';
import OTPActivity from './components/OTPActivity';
import HomeNaviagtionActivity from './components/HomeNavigationScreen';
import HomeChildNaviagtionActivity from './components/HomeChildNavigationScreen';
import QuestionLogActivity from './components/QuestionLogActivity';
import QuestionLogDetailActivity from './components/QuestionLogDetailActivity';
import DashboardActivity from './components/DashboardActivity';
import BottomNavigator from './components/BottomNavigator';
import ContractLogActivity from './components/ContractLogActivity';
import SplashActivity from './components/SplashActivity';
import NotificationActivity from './components/NotificationActivity';
import ContractLogDetailActivity from './components/ContractLogDetailActivity';
import ServiceContractActivity1 from './components/ServiceContractActivity1';
import VideoCallActivity from './components/VideoCallActivity';
import ForgotPasswordActivity from './components/ForgotPasswordActivity';
import ServiceContractActivity2 from './components/ServiceContractActivity2';
import ServiceContractActivity3 from './components/ServiceContractActivity3';
import ServiceContractActivity4 from './components/ServiceContractActivity4';
import ServiceContractActivity5 from './components/ServiceContractActivity5';
import ServiceContractActivity6 from './components/ServiceContractActivity6';
import PreviewScreenActivity from './components/PreviewScreenActivity';
import ForgetOTPActivity from './components/ForgetOTPActivity';
import ResetPasswordActivity from './components/ResetPasswordActivity';



const NavStack = createStackNavigator(
    {
        Splash: { screen: SplashActivity },
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        Otp: { screen: OTPActivity },
        HomeNaviagtion: { screen: HomeNaviagtionActivity },
        HomeChildNaviagtion: { screen: HomeChildNaviagtionActivity },
        QuestionLog: { screen: QuestionLogActivity },
        QuestionLogDetail: { screen: QuestionLogDetailActivity },
        Dashboard: { screen: DashboardActivity },
        BottomNavigatorScreen : {screen : BottomNavigator},
        contractLog : {screen: ContractLogActivity},
        Notification : {screen: NotificationActivity},
        ContractLogDetail: {screen: ContractLogDetailActivity},
        ServiceContractScreen1 : {screen: ServiceContractActivity1},
        ServiceContractScreen2 : {screen: ServiceContractActivity2},
        ServiceContractScreen3:{screen: ServiceContractActivity3},
        ServiceContractScreen4 : {screen: ServiceContractActivity4},
        ServiceContractScreen5: {screen: ServiceContractActivity5},
        ServiceContractScreen6: {screen: ServiceContractActivity6},
        VideoCall:{screen: VideoCallActivity},
        ForgotPassword:{screen: ForgotPasswordActivity},
        PreviewScreen: {screen: PreviewScreenActivity},
        ForgetOTP: {screen: ForgetOTPActivity},
        ResetPassword:{screen: ResetPasswordActivity}
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none'
    }

);

const Apps = createAppContainer(NavStack);

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}