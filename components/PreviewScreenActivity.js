import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator,SafeAreaView } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: .10, backgroundColor: 'white', borderTopRightRadius: 10, 
                borderBottomRightRadius: 10, justifyContent: 'center', borderColor: '#0093C8',
                borderWidth: 2 }}>

                    <Text style={{ color: '#0093c8', fontSize: RFPercentage(1.7), fontWeight: 'bold', padding: 5 }}>{item.que_id}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 5 }}>
    <Text style={{ color: '#767475', alignItems: 'center', fontSize: RFValue(13, 580), marginTop: 10 }}>{item.question}</Text>
                    <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, marginTop: 2 }} />
    <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10 }}>{item.text_option}</Text>
                </View>

            </View>
        </View>


    );
}

var answerArray = []

export default class PreviewScreenActivity extends React.Component {

    constructor(props) {
        super(props);
        this.submitQuestion = this.submitQuestion.bind(this);
        this.state = {
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/submit_contract',
            userId: ''
         
        };
    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }
  
    componentDidMount() {


        const { navigation } = this.props;
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        this.setState({ data: answerArray})

        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
            }
        });
       
    }

    submitQuestion() {

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
                question_array: answerArray
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                   
                  //  this.props.navigation.navigate('contractLog') 
                    alert(responseData.message);

                    answerArray = [];
                }

                console.log('response object:', responseData);

            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    actionOnRow(item) {
        // this.props.navigation.navigate('ContractLogDetail')
        console.log('Selected Item :', item);
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>PREVIEW</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>

              
                {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#0094CD" />
                            </View>
                        )}

                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                   renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                   )}
                    keyExtractor={item => item.question}
                />

               

                <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle}
                    onPress={() => { 
                        this.showLoading();
                       this.submitQuestion();
                     
                        
                        }}>

                    <Image source={require('../images/arrow_circle_blue_right.png')}
                        style={styles.FloatingButtonStyle} />

                </TouchableOpacity>



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

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



            </SafeAreaView>
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
        backgroundColor: "#fbfbfb",
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
    TouchableOpacityStyle: {

        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 100,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        //backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    }
});