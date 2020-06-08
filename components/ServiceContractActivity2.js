import React from 'react';
import {
    StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput,
    SafeAreaView, FlatList
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import RadioButton from 'react-native-radio-button';
import stringsoflanguages from './locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import IconBadge from 'react-native-icon-badge';

var lastresponsedata;
var answerArray = [];
var completeArray = [];
var isgoback = false;
var screenname = '';
var stageValue = 1;



export class ServiceContractActivity2 extends React.Component {

    constructor(props) {
        super(props);
        this.getnextquestion = this.getnextquestion.bind(this);
        this.state = {
            value: '',
            //    selectedcontractsitem: [],
            legalValue: 1,
            firstselectedindex: -1,
            secondselectedindex: -1,
            thirdselectedindex: -1,
            isOpen: false,
            questionindex: '',
            question3: '',
            selectedquestionid: '',
            question4: '',
            responseData: '',
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_next_question',
            selectedLanguage: '',
            languageType: '',
            question_count: '',
            contract_count: '',

        };
    }

    static navigationOptions = {
        title: 'service Screen 2',
    };

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.load)
        const { navigation } = this.props;
        lastresponsedata = navigation.getParam('responseData', 'no-responsedata');
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        completeArray = navigation.getParam('completeArray', 'no-complete-array');

        this.setState({
            questionindex: 3,
            data: lastresponsedata.question_list[2].option_array,
            question3: lastresponsedata.question_list[2].question
        })

        var index = completeArray.findIndex(x => x.que_id === lastresponsedata.question_list[2].id);

        if (index == -1) {
            this.setState({ firstselectedindex: -1 })
            stageValue = 1;
        } else {
            console.log("complete array =========" + JSON.stringify(completeArray));

            this.setState({ firstselectedindex: completeArray[index].index })
            stageValue = (completeArray[index].index + 1);
            answerArray[2] = { que_no: 3, que_id: completeArray[index].que_id, text_option: completeArray[index].text_option, question: completeArray[index].question }

        }


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




        AsyncStorage.getItem('@language').then((languageType) => {
            if (languageType) {
                this.setState({ languageType: languageType });
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


        this.RBSheet1.open()

    }

    getnextquestion() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                question_id: lastresponsedata.question_list[2].id,
                option_val: stageValue
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    console.log('stage value=====' + stageValue)
                    if (stageValue == '1') {

                        this.setState({
                            questionindex: 4,
                            question4: responseData.next_question[0].question,
                            data1: responseData.next_question[0].option_array
                        })

                        var index = completeArray.findIndex(x => x.que_id === responseData.next_question[0].id);
                        if (index == -1) {
                            this.setState({ secondselectedindex: -1 })
                        } else {
                            this.setState({ secondselectedindex: completeArray[index].index })
                            this.setState({ legalValue: (completeArray[index].index +1) })
                        }

                    } else {

                        this.setState({
                            questionindex: 4,
                            question4: responseData.next_question[0].question,
                            data2: responseData.next_question[0].option_array
                        })

                        var index = completeArray.findIndex(x => x.que_id === responseData.next_question[0].id);
                        if (index == -1) {
                            this.setState({ thirdselectedindex: -1 })
                        } else {
                            this.setState({ thirdselectedindex: completeArray[index].index })
                        }

                    }

                    this.setState({ responseData: responseData })

                    console.log('response object of next question :', responseData);

                }
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    load = () => {

        const { navigation } = this.props;
        isgoback = navigation.getParam('isgoback', false)
        screenname = navigation.getParam('screenname', 'no-screen-name')


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


        if (isgoback && screenname != "screen3") {

            answerArray = navigation.getParam('answerArray', 'no-business-array');
            completeArray = navigation.getParam('completeArray', 'no-complete-array');
           // legalValue = navigation.getParam('legalValue', 'no-legalvalue');

            console.log("complete array in load ===" + JSON.stringify(completeArray))

            isgoback = false;
            stageValue = 1;
          //  this.setState({ legalValue: legalValue })
            this.RBSheet2.open()
            this.getnextquestion();
        }
        else if (isgoback && screenname == "screen3") {

            answerArray = navigation.getParam('answerArray', 'no-business-array');

            isgoback = false;
            stageValue = 2;
            this.RBSheet3.open()
            this.getnextquestion();
        }

    }

    onPress = (item, index) => {

        if (this.state.questionindex == 3) {

            this.setState({ firstselectedindex: index })

            answerArray[2] = { que_no: 3, que_id: item.question_id, text_option: item.option_name, question: this.state.question3 }
            completeArray[2] = { que_id: item.question_id, index: index, text_option: item.option_name, question: this.state.question3 }

            stageValue = (index + 1);


        }
        else if (this.state.questionindex == 4 && stageValue == 1) {

            this.setState({ secondselectedindex: index })

            answerArray[3] = { que_no: 4, que_id: item.question_id, text_option: item.option_name, question: this.state.question4 }
            completeArray[3] = { que_id: item.question_id, index: index, text_option: item.option_name, question: this.state.question4 }

            // this.setState({ selectedquestionid: item.question_id })
            this.setState({ legalValue: (index + 1) })

        }
        else if (this.state.questionindex == 4 && stageValue == 2) {

            this.setState({ thirdselectedindex: index })

            answerArray[3] = { que_no: 4, que_id: item.question_id, text_option: item.option_name, question: this.state.question4 }
            completeArray[3] = { que_id: item.question_id, index: index, text_option: item.option_name, question: this.state.question4 }

            //  this.setState({ selectedquestionid: item.question_id })
            this.setState({ legalValue: (index + 1) })
        }

    }

    renderItem = ({ item, index }) => {

        return (

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: 1, backgroundColor: '#ffffff',
                    elevation: 0, margin: 5, flexDirection: 'row'
                }}>
                    <RadioButton

                        isSelected={this.state.firstselectedindex == index}
                        onPress={() => {
                            this.onPress(item, index)
                        }} />

                    <Text


                        isSelected={this.state.firstselectedindex == index}
                        onPress={() => {

                            this.onPress(item, index)
                        }}
                        style={{ color: '#0093C8', padding: 10, fontSize: RFPercentage(1.9) }}>{item.option_name}</Text>


                </View>

            </View>
        )
    }

    renderItem2 = ({ item, index }) => {

        return (

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: 1, backgroundColor: '#ffffff',
                    elevation: 0, margin: 5, flexDirection: 'row'
                }}>
                    <RadioButton
                        isSelected={this.state.secondselectedindex == index}
                        onPress={() => {
                            this.onPress(item, index)
                        }} />

                    <Text
                        isSelected={this.state.secondselectedindex == index}
                        onPress={() => {

                            this.onPress(item, index)
                        }}
                        style={{ color: '#0093C8', padding: 10, fontSize: RFPercentage(1.9) }}>{item.option_name}</Text>


                </View>

            </View>
        )
    }

    renderItem3 = ({ item, index }) => {

        return (

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: 1, backgroundColor: '#ffffff',
                    elevation: 0, margin: 5, flexDirection: 'row'
                }}>
                    <RadioButton
                        isSelected={this.state.thirdselectedindex == index}
                        onPress={() => {
                            this.onPress(item, index)
                        }} />

                    <Text
                        isSelected={this.state.thirdselectedindex == index}
                        onPress={() => {

                            this.onPress(item, index)
                        }}
                        style={{ color: '#0093C8', padding: 10, fontSize: RFPercentage(1.9) }}>{item.option_name}</Text>


                </View>

            </View>
        )
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
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20, textAlign: 'left' }}
                                onPress={() => { this.RBSheet1.open() }}>{stringsoflanguages.service_contracts_in_minutes}</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20, textAlign: 'left' }}
                                onPress={() => { this.RBSheet1.open() }}>{stringsoflanguages.service_contracts_define_arguments}</Text>



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
                            this.props.navigation.navigate('ServiceContractScreen1', {
                                isgoback: isgoback,
                                completeArray: completeArray,
                                answerArray: answerArray,


                            })
                            isgoback = false;

                        } else {
                            // if (this.state.isOpen && this.state.stageValue == 1) {
                            console.log("stage value on rb sheet===" + stageValue)
                            if (this.state.isOpen && stageValue == 1) {
                                this.RBSheet2.open()
                                this.getnextquestion();
                            } else {
                                this.RBSheet3.open()
                                this.getnextquestion();
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
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center',
                                alignItems: 'center', alignContent: 'center', borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.questionindex}</Text>

                            </View>



                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question3}</Text>

                        </View>

                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            extraData={this.state}
                        />

                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

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
                                this.setState({ isOpen: true })

                            }}>

                            <Image source={require('../images/arrow_circle_blue_right.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
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

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',flexDirection: 'column' }}>
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.question_count == 0}
                                />

                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.questions}</Text>

                            </View>



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


                                    </ActionButton.Item>

                                </ActionButton>
                            </View>
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                            onPress={() => {

                                this.props.navigation.navigate('contractLog')

                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',flexDirection: 'column' }}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/contract-inactive.png')}
                                            style={styles.badgeImageIconStyle} />
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.contract_count == 0}
                                />

                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contracts}</Text>

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
                            this.setState({ questionindex: 3 })
                            this.RBSheet1.open();

                        } else {
                            console.log("legal value===" + this.state.legalValue)

                            answerArray[3] = { que_no: 4, que_id: completeArray[3].que_id, text_option: completeArray[3].text_option, question: this.state.question4 }
                            completeArray[3] = { que_id: completeArray[3].que_id, index: completeArray[3].index, text_option: completeArray[3].text_option, question: this.state.question4 }


                            if (this.state.legalValue == "1" || this.state.legalValue == "2") {

                                console.log("complete array on sheet====" + JSON.stringify(completeArray))

                                this.props.navigation.navigate('ServiceContractScreen6', {
                                    legalValue: this.state.legalValue,
                                    questionid: completeArray[3].que_id,
                                    questionno1: 5,
                                    questionno2: 6,
                                    screename: "screen2",
                                    answerArray: answerArray,
                                    completeArray: completeArray,
                                })
                            } else if (this.state.legalValue == "3") {
                                this.props.navigation.navigate('ServiceContractScreen7', {
                                    legalValue: this.state.legalValue,
                                    questionid: completeArray[3].que_id,
                                    questionno1: 5,
                                    questionno2: 6,
                                    screename: "screen2",
                                    answerArray: answerArray,
                                    completeArray: completeArray,
                                })
                            }
                            else if (this.state.legalValue == "4") {
                                this.props.navigation.navigate('ServiceContractScreen8', {
                                    legalValue: this.state.legalValue,
                                    questionid: completeArray[3].que_id,
                                    questionno1: 5,
                                    questionno2: 6,
                                    screename: "screen2",
                                    answerArray: answerArray,
                                    completeArray: completeArray,
                                })
                            }
                            else {

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
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center',
                                alignItems: 'center', alignContent: 'center', borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.questionindex}</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question4}</Text>

                        </View>

                        <FlatList
                            data={this.state.data1}
                            renderItem={this.renderItem2}
                            extraData={this.state}
                        />

                    </View>



                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 0, marginTop: 0
                    }}>

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
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.question_count == 0}
                                />
                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.questions}</Text>
                            </View>



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


                                    </ActionButton.Item>

                                </ActionButton>
                            </View>
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/contract-inactive.png')}
                                            style={styles.badgeImageIconStyle} />
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.contract_count == 0}
                                />
                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contracts}</Text>
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

                <RBSheet
                    ref={ref => {
                        this.RBSheet3 = ref;
                    }}
                    onClose={() => {

                        if (isgoback) {
                            isgoback = false;
                            this.setState({ questionindex: 3 })
                            answerArray.pop();
                            this.RBSheet1.open();

                        } else {
                            answerArray[3] = { que_no: 4, que_id: completeArray[3].que_id, text_option: completeArray[3].text_option, question: this.state.question4 }
                            completeArray[3] = { que_id: completeArray[3].que_id, index: completeArray[3].index, text_option: completeArray[3].text_option, question: this.state.question4 }

                            
                            this.props.navigation.navigate('ServiceContractScreen3', {
                                responseData: this.state.responseData,
                                answerArray: answerArray,
                                completeArray:completeArray
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
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center',
                                alignItems: 'center', alignContent: 'center', borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.questionindex}</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question4}</Text>

                        </View>

                        <FlatList
                            data={this.state.data2}
                            renderItem={this.renderItem3}
                            extraData={this.state}
                        />
                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                isgoback = true
                                this.RBSheet3.close()

                            }} >

                            <Image source={require('../images/back_button_grey.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet3.close()

                            }}>

                            <Image source={require('../images/arrow_circle_blue_right.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 10
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.question_count == 0}
                                />
                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.questions}</Text>
                            </View>



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


                                    </ActionButton.Item>

                                </ActionButton>
                            </View>
                        </View>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                <IconBadge
                                    MainElement={
                                        <Image source={require('../images/contract-inactive.png')}
                                            style={styles.badgeImageIconStyle} />
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
                                            backgroundColor: 'red'
                                        }
                                    }
                                    Hidden={this.state.contract_count == 0}
                                />
                                <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contracts}</Text>
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
    scrollViewContainer: {
        backgroundColor: '#F0F5FE'

    },
    scrollViewInsideContainer: {
        backgroundColor: '#F0F5FE'
    },
    imgBackground: {
        height: 200,
        marginTop: 10
    },
    ImageIconStyle: {
        marginTop: 3,
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
        borderWidth: 1,
        borderBottomRightRadius: 20,
        borderColor: '#0093c8',
        width: '100%',
        padding: 5,
        marginBottom: 10,
        backgroundColor: 'transparent'

    },
    TextInputStyleClass: {

        // Setting up Hint Align center.
        textAlign: 'center',

        marginTop: 20,

        // Setting up TextInput height as 50 pixel.
        height: 50,

        // Set border width.
        borderWidth: 1,

        // Set border Hex Color Code Here.
        borderColor: '#0093c8',

        // Set border Radius.
        borderTopRightRadius: 20,

        //Set background color of Text Input.
        backgroundColor: "#F0F5FE",
    },
    TextStyle: {
        color: 'black',
        textAlign: 'left',
        marginLeft: 5
    },
    bottomactivebuttonstyle: {
        color: "#0094CD",
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottominactivebuttonstyle: {
        color: "#887F82",
        fontSize: 10,
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
        marginTop: 11,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      StyleQuestionsTab: {
        marginTop: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      badgeImageIconStyle: {
        marginTop: 9,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      StyleContactusTab: {
        marginTop: 14,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default ServiceContractActivity2;
