import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var lastresponsedata, question3_option1, question3_option2;

var question4_option1, question4_option2, question4_option3, question4_option4;
var question4_option1_1, question4_option2_2, question4_option3_3;

// var radio_stage_props;

export class ServiceContractActivity2 extends React.Component {

    constructor(props) {
        super(props);
        this.getnextquestion = this.getnextquestion.bind(this);
        this.state = {
            value: '',
            stageValue: 1,
            legalValue: 1,
            isOpen: false,
            question3: '',
            question4: '',
            responseData: '',


            radio_stage_props: [{ label: question3_option1, value: 1 }, { label: question3_option2, value: 2 }],

            radio_legal_structure_props1: [{ label: question4_option1, value: 1 },
            { label: question4_option2, value: 2 }, { label: question4_option3, value: 3 }, { label: question4_option4, value: 4 }],

            radio_legal_structure_props2: [{ label: question4_option1_1, value: 1 },
            { label: question4_option2_2, value: 2 }, { label: question4_option3_3, value: 3 }],


            baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_next_question',

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

        const { navigation } = this.props;
        lastresponsedata = navigation.getParam('responseData', 'no-responsedata');

        console.log("last response data===" + JSON.stringify(lastresponsedata))

        // for (var i = 0; i < lastresponsedata.question_list.length; i++) {
        //     console.log("i======" + i)
        //     console.log("lastresponsedata======" + lastresponsedata.question_list[i])

        //     if (i == 2) {
               
        //         for (var j = 1; j < 12; j++) {
        //             if(lastresponsedata.question_list[i].opt + j ==0)
        //             {
        //                 console.log("option1 blank ===" + lastresponsedata.question_list[i].opt)
        //             }else
        //             {
        //                 console.log("option1 else  ===" + lastresponsedata.question_list[i].opt)
        //             }
                  
        //         }

        //     }
        // }
       // radio_stage_props[i] = lastresponsedata.question_list[2].opt1

       this.setState({ question3: lastresponsedata.question_list[2].question })

        question3_option1 = lastresponsedata.question_list[2].opt1;
        question3_option2 = lastresponsedata.question_list[2].opt2;

        console.log("question3_option1===" + question3_option1)

        this.setState({ radio_stage_props: [{ label: question3_option1, value: 1 }, { label: question3_option2, value: 2 }] })

        this.RBSheet1.open()

    }


    getnextquestion() {

        console.log("question_id===" + lastresponsedata.question_list[2].id)
        console.log("option_val===" + this.state.stageValue)

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
                option_val: this.state.stageValue
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    if (this.state.stageValue == '1') {
                        console.log("if value======")
                        this.setState({ question4: responseData.next_question[0].question })

                        question4_option1 = responseData.next_question[0].opt1;
                        question4_option2 = responseData.next_question[0].opt2;
                        question4_option3 = responseData.next_question[0].opt3;
                        question4_option4 = responseData.next_question[0].opt4;

                        console.log("question4_option1===" + question4_option1)

                        this.setState({
                            radio_legal_structure_props1: [{ label: question4_option1, value: 1 },
                            { label: question4_option2, value: 2 }, { label: question4_option3, value: 3 },
                            { label: question4_option4, value: 4 }]
                        })
                    } else {
                        console.log("else value======")
                        this.setState({ question4: responseData.next_question[0].question })

                        question4_option1_1 = responseData.next_question[0].opt1;
                        question4_option2_2 = responseData.next_question[0].opt2;
                        question4_option3_3 = responseData.next_question[0].opt3;

                        console.log("question4_option1===" + question4_option1_1)

                        this.setState({
                            radio_legal_structure_props2: [{ label: question4_option1_1, value: 1 },
                            { label: question4_option2_2, value: 2 }, { label: question4_option3_3, value: 3 }]
                        })
                    }

                    this.setState({ responseData: responseData })

                    console.log('response object:', responseData);

                }



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

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>CONTRACT</Text>

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

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.RBSheet1.open() }}>Service Contracts {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.RBSheet1.open() }}>Service contracts define agreements between {'\n'} customers and providers. </Text>



                        </ImageBackground>

                        {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#0094CD" />
                            </View>
                        )}


                    </View>
                </ScrollView>

                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    onClose={() => {
                        if (this.state.isOpen && this.state.stageValue == '1') {
                            this.RBSheet2.open()
                            this.getnextquestion();
                        } else {
                            this.RBSheet3.open()
                            this.getnextquestion();
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



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 30, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, 
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', 
                                alignItems: 'center', alignContent: 'center',borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth:1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>3</Text>

                            </View>

                          

                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question3}</Text>

                        </View>

                        <RadioForm
                            radio_props={this.state.radio_stage_props}
                            initial={0}
                            onPress={(stageValue) => { this.setState({ stageValue: stageValue }) }}
                        />


                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet1.close()
                                this.setState({ isOpen: true })
                                //  this.RBSheet2.open()

                            }}>

                            <Image source={require('../images/orange-arrow.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

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
                                //    this.RBSheet1.close()
                                // this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //  this.RBSheet1.close()
                                //  this.RBSheet2.close()
                                this.props.navigation.navigate('VideoCall')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>

                    </View>

                </RBSheet>



                <RBSheet
                    ref={ref => {
                        this.RBSheet2 = ref;
                    }}
                    onClose={() => {
                        if (this.state.legalValue == "1" || this.state.legalValue == "2") {
                            this.props.navigation.navigate('ServiceContractScreen6', {
                                legalValue: this.state.legalValue,
                                questionid: 4,
                                questionno1: 5,
                                questionno2: 6
                            })
                        } else if (this.state.legalValue == "3") {
                            this.props.navigation.navigate('ServiceContractScreen7', {
                                legalValue: this.state.legalValue,
                                questionid: 4,
                                questionno1: 5,
                                questionno2: 6
                            })
                        }
                        else if (this.state.legalValue == "4") {
                            this.props.navigation.navigate('ServiceContractScreen8', {
                                legalValue: this.state.legalValue,
                                questionid: 4,
                                questionno1: 5,
                                questionno2: 6
                            })
                        }
                        else {
                            this.props.navigation.navigate('ServiceContractScreen3')
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



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 30, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, 
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', 
                                alignItems: 'center', alignContent: 'center',borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth:1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>4</Text>

                            </View>
                          

                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question4}</Text>

                        </View>


                        <RadioForm
                            radio_props={this.state.radio_legal_structure_props1}
                            initial={0}
                            onPress={(legalValue) => { this.setState({ legalValue: legalValue }) }}
                        />



                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                // this.props.navigation.navigate('ServiceContractScreen3')
                                this.RBSheet2.close()

                            }}>

                            <Image source={require('../images/orange-arrow.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {

                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

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
                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //  this.RBSheet2.close()
                                this.props.navigation.navigate('VideoCall')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>




                    </View>

                </RBSheet>

                <RBSheet
                    ref={ref => {
                        this.RBSheet3 = ref;
                    }}
                    onClose={() => {
                        this.props.navigation.navigate('ServiceContractScreen3', {
                            responseData: this.state.responseData
                        })

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



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 30, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, 
                                alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', 
                                alignItems: 'center', alignContent: 'center', borderWidth: 2, borderBottomWidth:1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>4</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question4}</Text>

                        </View>


                        <RadioForm
                            radio_props={this.state.radio_legal_structure_props2}
                            initial={0}
                            onPress={(legalValue) => { this.setState({ legalValue: legalValue }) }}
                        />



                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                // this.props.navigation.navigate('ServiceContractScreen3')
                                this.RBSheet3.close()

                            }}>

                            <Image source={require('../images/orange-arrow.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>





                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
                        height: RFPercentage(9), borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
                        marginTop: 30
                    }}>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {

                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('QuestionLog')
                            }}>

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
                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                // this.RBSheet1.close()
                                //  this.RBSheet2.close()
                                this.props.navigation.navigate('VideoCall')
                            }}>

                            <Image source={require('../images/support-inactive.png')}
                                style={styles.ImageIconStyle} />

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
        height: 25,
        width: 25,
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
        marginBottom: 20,
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



    }
});

export default ServiceContractActivity2;
