import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import IconBadge from 'react-native-icon-badge';

var responseData;
var answerArray = [];
var completeArray = [];
import stringsoflanguages from './locales/stringsoflanguages';
var isgoback = false;
var screenname;


export class ServiceContractActivity3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOpen: false,
            question5: '',
            question5ans: '',
            question5_id: '',
            question6_id: '',
            question6: '',
            question6ans: '',
            responseData: '',
            questionindex: '',
            selectedLanguage: '',
            languageType: '',
            question_count: '',
            contract_count: '',
        };
    }

    static navigationOptions = {
        title: 'Service Screen 3',
    };

    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.load)


        AsyncStorage.getItem('@question_count').then((question_count) => {
            if (question_count) {
                this.setState({ question_count: question_count });
                console.log("question_count ====" + this.state.question_count);
            }
        });

        AsyncStorage.getItem('@contract_count').then((contract_count) => {
            if (contract_count) {
                this.setState({ contract_count: contract_count });
                console.log("contract_count ====" + this.state.contract_count);
            }
        });


        const { navigation } = this.props;
        responseData = navigation.getParam('responseData', 'no-responsedata');
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        completeArray = navigation.getParam('completeArray', 'no-complete-array');

        this.setState({ responseData: responseData })

        this.setState({ questionindex: 5 })
        this.setState({ question5: responseData.next_question[1].question })
        this.setState({ question5_id: responseData.next_question[1].id })


        var index = completeArray.findIndex(x => x.que_id === responseData.next_question[1].id);
        if (index != -1) {
            this.setState({ question5ans: completeArray[index].text_option })
        }

        this.setState({ question6: responseData.next_question[2].question })
        this.setState({ question6_id: responseData.next_question[2].id })

        var index = completeArray.findIndex(x => x.que_id === responseData.next_question[2].id);
        if (index != -1) {
            this.setState({ question6ans: completeArray[index].text_option })
        }

        console.log("question 5 data ====" + this.state.question5)

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
                if (selectedLanguage == "English") {
                    stringsoflanguages.setLanguage("en");
                } else {
                    stringsoflanguages.setLanguage("ar");
                }

            }
        });

        this.RBSheet1.open()

    }

    load = () => {



        AsyncStorage.getItem('@question_count').then((question_count) => {
            if (question_count) {
                this.setState({ question_count: question_count });
                console.log("question_count ====" + this.state.question_count);
            }
        });

        AsyncStorage.getItem('@contract_count').then((contract_count) => {
            if (contract_count) {
                this.setState({ contract_count: contract_count });
                console.log("contract_count ====" + this.state.contract_count);
            }
        });


        const { navigation } = this.props;
        isgoback = navigation.getParam('isgoback', false)
        if (isgoback) {

            answerArray = navigation.getParam('answerArray', 'no-business-array');
            completeArray = navigation.getParam('completeArray', 'no-complete-array');

            console.log("answerArray=======" + JSON.stringify(answerArray))

            isgoback = false;
            this.RBSheet2.open()
        }

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

                        <Text style={styles.screenntitlestyle}>{stringsoflanguages.contract}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>




                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.scrollViewInsideContainer}>


                    <ImageBackground
                                style={{ height: 280, width: 280, marginTop: 30, marginLeft: 2, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                                source={require('../images/dashboard-2.png')}>

                                <Text style={{ color: '#ffffff', fontSize: RFValue(18, 580), marginTop: 70, textAlign: 'center' }}
                                  >{stringsoflanguages.service_contracts_in_minutes}</Text>

                                <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.4), marginTop: 10, textAlign: 'center' }}
                                    >{stringsoflanguages.service_contracts_define_arguments}</Text>

                                <TouchableOpacity
                                    style={styles.white_bottom_button}
                                    activeOpacity={.5}>


                                    <Text style={styles.white_bottom_text}>
                                        {stringsoflanguages.get_your_answer}
                                    </Text>

                                    <Image
                                        style={{ marginTop: 0, width: 20, height: 15, marginLeft: 10 }}
                                        source={require('../images/red_arrow.png')} />

                                </TouchableOpacity>

                            </ImageBackground>

                    

                    </View>
                </ScrollView>





                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    onClose={() => {
                        if (isgoback) {
                            answerArray.pop();
                            this.props.navigation.navigate('ServiceContractScreen2', {
                                isgoback: true,
                                screenname: "screen3",
                                answerArray, answerArray,
                                completeArray: completeArray
                            })
                            isgoback = false;

                        } else {
                            if (this.state.isOpen) {
                                this.RBSheet2.open()
                                answerArray[4] = { que_no: 5, que_id: this.state.question5_id, text_option: this.state.question5ans, question: this.state.question5 }
                                completeArray[4] = { que_id: this.state.question5_id, index: 0, text_option: this.state.question5ans, question: this.state.question5 }

                            }
                        }
                    }}

                    animationType={'fade'}
                    height={440}
                    duration={250}
                    closeOnPressMask={false}
                    closeOnDragDown={false}
                    closeOnPressBack={false}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 10, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center',
                                alignContent: 'center', borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.questionindex}</Text>

                            </View>



                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question5}</Text>

                        </View>

                        <View style={styles.TextInputStyleClass}>

                            <TextInput
                                flex={.9}
                                style={styles.inputnew}
                                value={this.state.question5ans}
                                placeholder={stringsoflanguages.please_enter_amount}
                                underlineColorAndroid='transparent'
                                keyboardType='number-pad'
                                onChangeText={question5ans => this.setState({ question5ans })} >


                            </TextInput>

                            <Text style={{ flex: .1 }}>{stringsoflanguages.kd}</Text>


                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                isgoback = true
                                this.RBSheet1.close()

                            }} >

                            <Image source={require('../images/back_button_grey.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet1.close()

                                this.setState({ questionindex: 6 })
                                this.setState({ isOpen: true })

                            }}>

                            <Image source={require('../images/arrow_circle_blue_right.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20, marginTop: 10
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                            onPress={() => {
                                answerArray = [],
                                    completeArray = [];
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.StyleHomeTab} />

                            <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                this.props.navigation.navigate('QuestionLog')

                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/question-inactive.png')}
                                            style={styles.StyleQuestionsTab} />
                                    }
                                    BadgeElement={
                                        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                            {this.state.question_count}
                                        </Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            width: 23,
                                            height: 23,
                                            marginRight: 20,
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.question_count == 0}
                                />

                                <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>

                            </View>



                        </TouchableOpacity>

                        <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

                            <View style={{ flex: 1 }}>
                                <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        // answerArray = [];
                                        // completeArray = [];
                                        // this.props.navigation.navigate('ServiceContractScreen1')

                                    }}>
                                    {/* <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

                                    </ActionButton.Item>
                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { console.log("notes tapped!") }}
                                    >

                                        <Image source={require('../images/question-active.png')}
                                            style={styles.animationIconStyle} />
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { }}>

                                        <Image source={require('../images/contract-active.png')}
                                            style={styles.animationIconStyle} />
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { }}>


                                    </ActionButton.Item> */}

                                </ActionButton>
                            </View>
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                            onPress={() => {

                                this.props.navigation.navigate('contractLog')

                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/contract-inactive.png')}
                                            style={styles.styleContractTab} />
                                    }
                                    BadgeElement={
                                        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                            {this.state.contract_count}
                                        </Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            width: 23,
                                            height: 23,
                                            marginLeft: 20,
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.contract_count == 0}
                                />

                                <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>

                            </View>



                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                            onPress={() => {
                                this.props.navigation.navigate('Contactus')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.StyleContactusTab} />

                            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

                        </TouchableOpacity>

                    </View>

                </RBSheet>



                <RBSheet
                    ref={ref => {
                        this.RBSheet2 = ref;
                    }}
                    onClose={() => {

                        if (isgoback) {
                            isgoback = false;
                            this.RBSheet1.open()
                            this.setState({ questionindex: 5 })
                            answerArray.pop();
                        } else {
                            answerArray[5] = { que_no: 6, que_id: this.state.question6_id, text_option: this.state.question6ans, question: this.state.question6 }
                            completeArray[5] = { que_id: this.state.question6_id, index: 0, text_option: this.state.question6ans, question: this.state.question6 }

                            this.props.navigation.navigate('ServiceContractScreen4', {
                                responseData: this.state.responseData,
                                answerArray: answerArray,
                                completeArray: completeArray
                            })
                        }
                    }}
                    animationType={'fade'}
                    height={440}
                    duration={250}
                    closeOnPressMask={false}
                    closeOnDragDown={false}
                    closeOnPressBack={false}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 10, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center',
                                alignContent: 'center', borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.questionindex}</Text>

                            </View>

                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question6}</Text>

                        </View>


                        <View style={styles.TextInputStyleClass}>


                            <TextInput
                                flex={1}
                                value={this.state.question6ans}
                                placeholder=" 0"
                                keyboardType='number-pad'
                                style={styles.InputBoxStyle}
                                underlineColorAndroid='transparent'
                                onChangeText={question6ans => this.setState({ question6ans })} />


                        </View>


                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                isgoback = true
                                this.RBSheet2.close()

                            }} >

                            <Image source={require('../images/back_button_grey.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet2.close()


                            }}>

                            <Image source={require('../images/arrow_circle_blue_right.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20, marginTop: 10
                    }}>



                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                            onPress={() => {
                                answerArray = [],
                                    completeArray = [];
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.StyleHomeTab} />

                            <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                //  this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/question-inactive.png')}
                                            style={styles.StyleQuestionsTab} />
                                    }
                                    BadgeElement={
                                        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                            {this.state.question_count}
                                        </Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            width: 23,
                                            height: 23,
                                            marginRight: 20,
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.question_count == 0}
                                />
                                <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>
                            </View>



                        </TouchableOpacity>

                        <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

                            <View style={{ flex: 1 }}>
                                <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        // answerArray = [];
                                        // completeArray = [];
                                        // this.props.navigation.navigate('ServiceContractScreen1')

                                    }}>
                                    {/* <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

                                    </ActionButton.Item>
                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { console.log("notes tapped!") }}
                                    >

                                        <Image source={require('../images/question-active.png')}
                                            style={styles.animationIconStyle} />
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { }}>

                                        <Image source={require('../images/contract-active.png')}
                                            style={styles.animationIconStyle} />
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor='#fffff'
                                        title="Notifications"
                                        onPress={() => { }}>


                                    </ActionButton.Item> */}

                                </ActionButton>
                            </View>
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/contract-inactive.png')}
                                            style={styles.styleContractTab} />
                                    }
                                    BadgeElement={
                                        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                                            {this.state.contract_count}
                                        </Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            width: 23,
                                            height: 23,
                                            marginLeft: 20,
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.contract_count == 0}
                                />
                                <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                            onPress={() => {
                                //   this.RBSheet1.close()
                                // this.RBSheet2.close()
                                this.props.navigation.navigate('Contactus')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.StyleContactusTab} />

                            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

                        </TouchableOpacity>




                    </View>

                </RBSheet>



            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F0F5FE',

    },
    scrollViewContainer: {
        backgroundColor: '#F0F5FE'

    },
    scrollViewInsideContainer: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5FE'
    },
    imgBackground: {
        height: 200,
        marginTop: 10
    },
    ImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIconStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIconStyle: {
        marginTop: 3,
        height: 50,
        width: 50,
        marginRight: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationIconStyle: {
        marginTop: 3,
        height: 30,
        width: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputmultiline: {
        color: 'black',
        height: 140,
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        backgroundColor: '#ffffff'
    },
    input: {
        color: 'black',
        height: 50,
        borderWidth: 0,
        fontSize: RFPercentage(2),
        textAlignVertical: 'bottom',
        backgroundColor: '#ffffff'
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 50,
        fontWeight: 'bold',
        borderRadius: 8,
        fontSize: RFPercentage(10),
        backgroundColor: '#dc8517',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    experttext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    screenntitlestyle: {
        color: "#0094CD",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    TextViewStyle:
    {
        borderWidth: 2,
        borderBottomRightRadius: 20,
        borderColor: '#0093c8',
        width: '100%',
        padding: 5,
        marginBottom: 10,
        backgroundColor: 'transparent'

    },
    TextInputStyleClass: {

        flexDirection: 'row',
        // Setting up Hint Align center.

        marginTop: 20,

        // Setting up TextInput height as 50 pixel.
        height: 50,

        color: 'black',

        // Set border width.
        borderWidth: 1,

        // Set border Hex Color Code Here.
        borderColor: '#0093c8',

        // Set border Radius.
        borderTopRightRadius: 20,
        alignItems: 'center',

        //Set background color of Text Input.
        backgroundColor: "#F0F5FE",

    },
    TextStyle: {
        color: 'black',
        textAlign: 'left',
        marginLeft: 5
    },

    InputBoxStyle: {
        height: 50,
        margin: 3,
        color: 'black',
        alignItems: 'center'

    },
    inputnew: {
        color: 'black',
        marginLeft: 3
    },
    bottomactivebuttonstyle: {
        color: "#0094CD",
        fontSize: 7,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottominactivebuttonstyle: {
        color: "#887F82",
        fontSize: 7,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    // badgeImageIconStyle: {
    //     marginTop: 10,
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    StyleHomeTab: {
        marginTop: 5,
        width: 35,
        height: 32,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleQuestionsTab: {
        marginTop: 11,
        marginRight: 20,
        width: 30,
        height: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleContractTab: {
        marginTop: 9,
        width: 21,
        height: 30,
        marginLeft: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleContactusTab: {
        marginTop: 14,
        width: 28,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeImageIconStyle: {
        marginTop: 5,
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomquestiontextstyle: {
        color: "#887F82",
        fontSize: 7,
        marginRight: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottomcontracttextstyle: {
        color: "#887F82",
        fontSize: 7,
        marginLeft: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    white_bottom_button: {
        width: 150,
        height: 30,
        marginTop: 20,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center'

    },
    white_bottom_text: {
        textAlign: 'center',
        fontSize: 13,
        color: '#FF0100',
        alignContent: 'center',
    },
});

export default ServiceContractActivity3;
