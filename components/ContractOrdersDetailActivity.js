import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView, ScrollView, TextInput, Alert, Linking, Platform
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

var listData, status;
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';



export default class ContractOrdersDetailActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: '',
            notification_count: '',

        };
    }



    componentDidMount() {

        AsyncStorage.getItem('@notification_count').then((notification_count) => {
            if (notification_count) {
                this.setState({ notification_count: notification_count });
                console.log("notification_count ====" + this.state.notification_count);
            }
        });


        const { navigation } = this.props;
        listData = navigation.getParam('item', 'no-item');

        console.log("listdata==" + JSON.stringify(listData))

        this.setState({ listData: listData });


    }




    render() {
        return (

            <SafeAreaView style={styles.container}>


                {this.state.loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0094CD" />
                    </View>
                )}


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }} >

                        <Image source={require('../images/back_blue.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>{stringsoflanguages.contract_orders}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {

                            if (this.state.islogin == '0') {
                                this.props.navigation.navigate('Login')
                            } else {
                                this.props.navigation.navigate('Notification')
                            }

                        }} >

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <IconBadge
                                MainElement={
                                    <Image source={require('../images/notification.png')}
                                        style={styles.badgeImageIconStyle}
                                    />

                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                        {this.state.notification_count}
                                    </Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 23,
                                        height: 23,
                                        backgroundColor: 'red'
                                    }
                                }
                                Hidden={this.state.notification_count == 0}
                            />
                        </View>

                    </TouchableOpacity>

                </View>

                <ScrollView>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                        height: 60
                    }}>

                        <TouchableOpacity
                            style={styles.contractQuestionButtonStyle}
                            activeOpacity={.5}

                            onPress={() => {
                                this.props.navigation.navigate('ContractLogQuestion', {
                                    item: listData,
                                    screentitle: stringsoflanguages.contract_orders
                                })
                            }}>


                            <Text style={styles.contracttext}> {stringsoflanguages.contract_questions.toUpperCase()} </Text>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate('ContractOrdersPortfolio', {
                                    item: listData,
                                })
                            }}>

                            <Image source={require('../images/right_arrow_grey.png')}
                                style={styles.ImageIconStyle}
                            />

                        </TouchableOpacity>

                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                        height: 60, marginTop: 20
                    }}>

                        <TouchableOpacity
                            style={styles.contractQuestionButtonStyle}
                            activeOpacity={.5}

                            onPress={() => {
                                this.props.navigation.navigate('ContractOrdersPortfolio', {
                                    item: listData,
                                })
                            }}>


                            <Text style={styles.contracttext}> {stringsoflanguages.portfolio.toUpperCase()} </Text>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate('ContractLogQuestion', {
                                    item: listData,
                                })
                            }}>

                            <Image source={require('../images/right_arrow_grey.png')}
                                style={styles.ImageIconStyle}
                            />

                        </TouchableOpacity>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60, marginTop: 20 }}>

                        <TouchableOpacity
                            style={styles.contractQuestionButtonStyle}
                            activeOpacity={.5}

                            onPress={() => {
                                this.props.navigation.navigate('ContractOrdersProposal', {
                                    item: listData,
                                })
                            }}>


                            <Text style={styles.contracttext}> {stringsoflanguages.proposal.toUpperCase()} </Text>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate('ContractOrdersProposal', {
                                    item: listData,
                                })
                            }}>

                            <Image source={require('../images/right_arrow_grey.png')}
                                style={styles.ImageIconStyle}
                            />

                        </TouchableOpacity>

                    </View>


                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: 400, borderTopRightRadius: 30, borderTopLeftRadius: 30, margin: 5, shadowColor: 'grey',
                        elevation: 20, marginTop: 50,
                        shadowOpacity: 1
                    }}>


                        <View style={{
                            flexDirection: 'column', backgroundColor: 'white',
                            height: 200, flex: .5, borderRadius: 30, margin: 20, shadowColor: 'grey',
                            elevation: 20, shadowOpacity: 1, shadowOffset: { width: 2, height: 2 }
                        }}>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0094CD',
                                height: 90, width: 160, borderRadius: 30, shadowColor: 'grey',
                                elevation: 20, marginTop: 0, marginLeft: 1,
                                shadowOpacity: 1, shadowOffset: { width: 2, height: 2 }
                            }}>

                                <Text style={styles.paid_amount_text}> {stringsoflanguages.paid_amount} </Text>


                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center',
                             alignSelf: 'center', marginTop:30 }}>
                                <Text style={styles.paid_amount_value}>{this.state.listData.amount}</Text>
                                <Text style={styles.amount_key_value}>{stringsoflanguages.kd} </Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'column', backgroundColor: 'white',
                            height: 200, flex: .5, borderRadius: 30, margin: 20, shadowColor: 'grey',
                            elevation: 20,
                            shadowOpacity: 1, shadowOffset: { width: 2, height: 2 }
                        }}>


                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0094CD',
                                height: 90, width: 160, borderRadius: 30, shadowColor: 'grey',
                                elevation: 20, marginTop: 0, marginLeft: 1,
                                shadowOpacity: 1, shadowOffset: { width: 2, height: 2 }
                            }}>

                                <Text style={styles.paid_amount_text}> {stringsoflanguages.date_of_payment} </Text>



                            </View>


                        <Text style={styles.date_text}>{this.state.listData.payment_date}</Text>


                        </View>


                    </View>


                </ScrollView>



            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5fd'
    },
    paid_amount_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    amount_key_value: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#0093c8',
        marginTop:3,
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },

    paid_amount_value: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0093c8',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    date_text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 30,
        color: '#0093c8',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    contracttext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0093c8',
        textAlign: 'left'
    },
    screenntitlestyle: {
        color: "#0094CD",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    animationIconStyle: {
        marginTop: 3,
        height: 60,
        width: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },


    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contractQuestionButtonStyle: {
        height: 50,
        flex: .8,
        fontSize: RFPercentage(13),
        fontWeight: 'bold',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: 5,
        alignSelf: 'center'
    },
    badgeImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});