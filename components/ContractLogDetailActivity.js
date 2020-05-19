import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView, ScrollView, TextInput
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

var listData, status;


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

export default class ContractLogActivity extends React.Component {

    constructor(props) {
        super(props);
        this.applyinterestapi = this.applyinterestapi.bind(this);
        this.state = {
            reply: '',
            estimatedcost: '',
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/interest_contract',
            userId: '',
            listData: ''
        };
    }




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    componentDidMount() {

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


        if (listData.reply === '' || listData.reply === null) {
            this.setState({ reply: "N/A" });

        } else {
            this.setState({ reply: listData.reply });
        }


        console.log("estimated cost state==" + this.state.estimatedcost)
        console.log("estimated cost list data==" + listData.estimate_cost)

        if (listData.estimate_cost == '' || listData.estimate_cost == null) {
            this.setState({ estimatedcost: "0 KD" });

        } else {
            this.setState({ estimatedcost: listData.estimate_cost + " KD" });
        }

        this.setState({ data: listData.question_array });

    }

    applyinterestapi() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                customer_id: this.state.userId,
                //  customer_id: 16,
                contract_id: listData.contract_id,
                status: status
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    alert(responseData.message);
                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
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

                        <Text style={styles.screenntitlestyle}>CONTRACT LOG</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>

                <ScrollView>

                    <TouchableOpacity
                        style={styles.contractQuestionButtonStyle}
                        activeOpacity={.5}

                        onPress={() => {
                            this.props.navigation.navigate('ContractLogQuestion', {
                                item: listData,
                            })
                        }}>


                        <Text style={styles.contracttext}> Contract Questions </Text>

                    </TouchableOpacity>

                    {/* <View style={{ flex: 1, flexDirection: 'row' }}> */}

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


                        <Text style={{ color: "black", fontWeight: 'bold', alignItems: 'center' }}>{this.state.listData.c_logo}</Text>


                    </View>

                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10 }} />

                    <ScrollView style={{ flexDirection: 'column' }} >


                        <Text style={{ color: '#4d4d4d', marginLeft: 20, marginRight: 20 }}>
                            {this.state.listData.consultant_name}
                        </Text>

                    </ScrollView>



                    <Text style={{
                        color: "#0093c8",
                        borderBottomColor: "#0093c8",
                        width: 150,
                        fontWeight: 'bold',
                        fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5
                    }}>  PORTFOLIO </Text>

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

                    <Text style={{
                        color: "#0093c8",
                        borderBottomColor: "#0093c8",
                        width: 150,
                        fontWeight: 'bold',
                        fontSize: RFPercentage(2), paddingLeft: 10, borderBottomWidth: 2, padding: 5
                    }}>  PROPOSAL </Text>

                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />


                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        {
                            // this.state.visible ?
                            <Image
                                style={styles.greyclockiconstyle}
                                source={require('../images/clock.png')} />
                            //  : null
                        }
                        <Text style={{
                            color: '#616161', marginLeft: 3, fontSize: RFPercentage(1.7), textAlign: 'right',
                            marginRight: 5
                        }}>
                            {this.state.listData.days} days</Text>


                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'center' }}>
                        {
                            // this.state.visible ?
                            <Image

                                style={styles.greyclockiconstyle}
                                source={require('../images/dollar.png')} />
                            //  : null
                        }
                        <Text style={{ color: "#616161", marginLeft: 3, fontSize: RFPercentage(1.7), marginRight: 5 }}>{this.state.listData.estimate_cost} KD</Text>



                    </View>

                    {/* <FlatList
                        style={{ flex: 1 }}
                        data={this.state.listData.faq_question}

                        renderItem={({ item }) => (

                            <TouchableWithoutFeedback>

                                <View>
                                    <Item item={item}
                                    />
                                </View>

                            </TouchableWithoutFeedback>

                        )}
                        keyExtractor={item => item.email}
                    /> */}


                    <View style={{ flexDirection: 'column', backgroundColor: '#FEFEFE', borderRadius: 20, marginTop: 20, margin: 5, alignItems: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                        <View style={{ flexDirection: 'row', padding: 5, marginLeft: 5, marginRight: 5 }}>

                            <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5 }}>Additional Information</Text>

                            <Text style={{ color: '#616161', fontSize: RFPercentage(1.7), flex: .5, textAlign: 'right', marginRight: 5 }}>YYS Advisor</Text>
                        </View>

                        <View style={styles.hairline} />


                        <View style={{ flexDirection: 'row', backgroundColor: 'white', marginLeft: 20, marginRight: 20, marginBottom: 20, width: '95%', height: 100, marginTop: 10 }}>


                            <TextInput
                                placeholder={'To know more contact to KYS Support.'}
                                placeholderTextColor="#5F6063"
                                underlineColorAndroid='transparent'
                                onChangeText={value => this.setState({ value })}
                                multiline={true}
                                editable={false}
                                value={this.state.reply}
                                style={styles.inputmultiline}
                            />


                        </View>
                    </View>





                    {/* <TouchableOpacity
                        style={styles.blueButtonStyle}
                        activeOpacity={.5}>

                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.experttext}> Estimated Cost </Text>

                            <View style={{ flexDirection: 'row', backgroundColor: '#FEFEFE', borderRadius: 5, width: 100, margin: 5, alignItems: 'center', justifyContent: 'center', shadowColor: '#ecf6fb', elevation: 20 }}>

                                <Text style={{ color: '#0093c8', fontWeight: 'bold', fontSize: RFPercentage(1.5), flex: .5, marginLeft: 5 }}>{this.state.estimatedcost}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

 */}

                    <TouchableOpacity
                        style={styles.expertButtonStyle}
                        activeOpacity={.5}>

                        <Text style={styles.experttext}> Are You Interested ?</Text>

                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20,

                    }}>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={

                                //  this.setState({ status: 0 }),
                                status = '0',
                                this.applyinterestapi

                            }>

                            <Image source={require('../images/cancel.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: RFPercentage(1), fontWeight: 'bold' }}>No</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={

                                // this.setState({ status: 1 }),
                                status = '1',
                                this.applyinterestapi
                            }>




                            <Image source={require('../images/blue_circle_right.png')}
                                style={styles.actionIconStyle} />

                            <Text style={{ color: '#0093c8', fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>Yes</Text>

                        </TouchableOpacity>


                    </View>


                </ScrollView>


                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5,
                    elevation: 20, shadowColor: 'grey', elevation: 20,
                    shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
                }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home-inactive.png')}
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

                        <Image source={require('../images/contract-active.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VideoCall') }}>

                        <Image source={require('../images/support-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>


            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5fd'
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
        width: '100%',
        height: 50,
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
        color: '#0093c8'
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
        height: 10,
        width: 10,
        padding: 5,
        tintColor: '#0093c8',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
});