import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView, ScrollView, TextInput, Alert, Linking, Platform
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

var listData, status;
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ alignItems: "center", flexDirection: 'column', width: 100, height: 100 }}>

                <Image source={{ uri: item.image }} style={{
                    width: 80, height: 80, borderRadius: 50,
                    borderColor: '#0093c8', borderWidth: 2
                }} />

                <View style={{ alignItems: "center", flexDirection: 'column' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 12, color: '#0093c8' }}>{item.name}</Text>
                </View>

            </View>
        </View>
    );
}


export default class ContractOrdersPortfolioActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reply: '',
            estimatedcost: '',
            userId: '',
            listData: '',
            selectedLanguage: '',
            notification_count: '',

        };
    }




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        AsyncStorage.getItem('@notification_count').then((notification_count) => {
            if (notification_count) {
                this.setState({ notification_count: notification_count });
                console.log("notification_count ====" + this.state.notification_count);
            }
        });

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
                if (selectedLanguage == "English") {
                    stringsoflanguages.setLanguage("en");
                } else {
                    stringsoflanguages.setLanguage("ar");
                }

            }
        });

        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);

            }
        });

        const { navigation } = this.props;
        listData = navigation.getParam('item', 'no-item');

        console.log("listdata==" + JSON.stringify(listData))

        this.setState({ listData: listData });



        this.setState({ data: listData.question_array });

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
                        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#f1f5fd'
                    }}>

                        <View style={{
                            flex: .25, borderTopRightRadius: 10, borderBottomRightRadius: 10,
                            marginTop: 20,
                            justifyContent: 'center', alignItems: 'center'
                        }}>



                            <Image source={{ uri: this.state.listData.c_name }}
                                style={{
                                    width: 70, height: 70, borderRadius: 50,
                                    borderColor: '#0093c8', borderWidth: 2
                                }} />


                            <Text style={{ color: "black", fontWeight: 'bold', alignItems: 'center', margin: 5 }}>{this.state.listData.c_logo}</Text>


                        </View>
                    </View>



                    <ScrollView style={{ flexDirection: 'column', backgroundColor: '#f1f5fd' }} >

                        <View style={{
                            borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10,
                            backgroundColor: '#f1f5fd'
                        }} />


                        <Text style={{ color: '#4d4d4d', marginLeft: 20, marginRight: 20 }}>
                            {this.state.listData.about_us}
                        </Text>

                    </ScrollView>


                    <View style={{ backgroundColor: '#f1f5fd' }} >

                        <Text style={{
                            color: "#0093c8",
                            borderBottomColor: "#0093c8",
                            width: 150,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5, marginTop: 10
                        }}> {stringsoflanguages.portfolio}  </Text>

                        <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />

                        <View style={styles.list_container}>

                            <FlatList
                                style={{ flex: 1 }}
                                data={this.state.listData.portfolio_array}
                                renderItem={({ item }) => <Item item={item} />}
                                keyExtractor={item => item.email}
                                numColumns={3}
                            />
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
        //  backgroundColor: '#f1f5fd'
    },
    listItem: {
        margin: 10,
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    YellowIconStyle: {
        height: 50,
        width: 50,
        marginTop: -30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputmultiline: {
        color: 'black',
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    hairline: {
        backgroundColor: '#E8E8E8',
        height: 1,
        width: '93%'
    },
    blueButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 40,
        borderRadius: 10,
        fontSize: RFPercentage(10),
        backgroundColor: '#0094CD',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#0093c8',
        fontSize: RFPercentage(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
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
    experttext: {
        fontSize: 18,
        color: '#0093c8',
        textAlign: 'center'
    },
    contracttext: {
        fontSize: 18,
        color: '#0093c8',
        textAlign: 'left'
    },
    actionIconStyle: {
        marginTop: 3,
        height: 50,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockiconstyle: {
        height: 15,
        width: 15,
        padding: 5,
        tintColor: '#0093c8',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
});