import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import SelectMultiple from 'react-native-select-multiple'
import AsyncStorage from '@react-native-community/async-storage';
import RadioButton from 'react-native-radio-button';
import IconBadge from 'react-native-icon-badge';

import stringsoflanguages from './locales/stringsoflanguages';


var legalValue, questionid, questionno1, questionno2;
var answerArray = [];
var completeArray = [];
var que_id;
var isgoback = false;
var screenname;
var multiselectoption = [];


export class ServiceContractActivity6 extends React.Component {

    constructor(props) {
        super(props);
        this.getnextquestion = this.getnextquestion.bind(this);
        this.state = {
            firstselectedindex: -1,
            businesstype: '',
            isOpen: false,
            question5: '',
            question6: '',
            selectedContract: [],
            contractlist: [],
            selectedLanguage: '',
            languageType: '',
            screenname: '',
            isbusinessBoxVisible: false,
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_next_question',
            question_count: '',
            contract_count: '',

        };
    }



    static navigationOptions = {
        title: 'service Screen 6',
    };

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    onSelectionsChange = (selectedContract) => {
        
        multiselectoption = [];
   
        for (let i = 0; i < selectedContract.length; i++) {
            multiselectoption.push(selectedContract[i].label);
        }

        if (multiselectoption.includes('Other (Please Specifiy)')) {
            this.setState({ isbusinessBoxVisible: true })
        } else {
            this.setState({ isbusinessBoxVisible: false })
        }

        console.log("multiselectoption ===" + JSON.stringify(multiselectoption));



        console.log("after on press  ===" + multiselectoption.toString().replace(/[[\]]/g, ''));


        this.setState({ selectedContract })

      

    }




    componentDidMount() {

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
        legalValue = navigation.getParam('legalValue', 'no-legalvalue');
        questionid = navigation.getParam('questionid', 'no-questionid');
        questionno1 = navigation.getParam('questionno1', 'no-questionno');
        questionno2 = navigation.getParam('questionno2', 'no-questionno');
        screenname = navigation.getParam('screename', 'no-screenname');
        answerArray = navigation.getParam('answerArray', 'no-business-array');
        completeArray = navigation.getParam('completeArray', 'no-complete-array');

        console.log("complete array===" + JSON.stringify(completeArray))

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
                if (selectedLanguage == "English") {
                    stringsoflanguages.setLanguage("en");
                } else {
                    stringsoflanguages.setLanguage("ar");
                }

            }
        });

        this.setState({ screenname: screenname })

        AsyncStorage.getItem('@language').then((languageType) => {
            if (languageType) {
                this.setState({ languageType: languageType });
                console.log("language type ====" + this.state.languageType);
                this.getnextquestion();

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
                question_id: questionid,
                option_val: legalValue
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    this.setState({ question5: responseData.next_question[0].question })

                    var optionlist = responseData.next_question[0].option_array
                    //  console.log('option list=======' + optionlist)
                    var contractoption = []
                    optionlist.map(value => {
                        que_id = value.question_id;
                        contractoption.push({ label: value.option_name, value: value.option_name })
                    })

                    this.setState({ contractlist: contractoption });
                    this.setState({ question6: responseData.next_question[1].question })
                    this.setState({ data: responseData.next_question[1].option_array })


                    var index = completeArray.findIndex(x => x.que_id === responseData.next_question[0].id);
                    if (index != -1) {

                        console.log("selected value==" + completeArray[index].text_option)

                        let selectedContract = [];
                         multiselectoption=[];
                        
                         for (let i = 0; i < contractoption.length; i++) {

                            if (completeArray[index].text_option.includes(contractoption[i].value)) {
                               
                                selectedContract.push({ label: contractoption[i].value, value: contractoption[i].value })
                                multiselectoption.push(contractoption[i].value)
                                if(completeArray[index].text_option.includes("Other (Please Specifiy)"))
                                {
                                    this.setState({isbusinessBoxVisible:true})
                                    AsyncStorage.getItem('@businessValue').then((businessValue) => {
          
                                        console.log("business value====" + this.state.businesstype)

                                         this.setState({businesstype:businessValue})

                                   
                                    });

                                
                                    
                                }
                            
                            }

                        }

                        this.setState({ selectedContract: selectedContract });


                    }


                    var index = completeArray.findIndex(x => x.que_id === responseData.next_question[1].id);
                    if (index == -1) {
                        this.setState({ firstselectedindex: -1 })
                    } else {
                        // console.log("complete array =========" + JSON.stringify(completeArray));
                        this.setState({ firstselectedindex: completeArray[index].index })

                    }


                    console.log('response object:', responseData);
                }
            })

            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    onPress = (item, index) => {

        //  this.setState({ selectedIndex: index }) 

        this.setState({ firstselectedindex: index })


        answerArray[questionno2 - 1] = { que_no: questionno2, que_id: item.question_id, text_option: item.option_name, question: this.state.question6 }

        completeArray[questionno2 - 1] = { que_id: item.question_id, index: index, text_option: item.option_name, question: this.state.question6 }

        console.log(" json data ===" + JSON.stringify(answerArray));

        //  console.log(" index===" + index);
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
                                onPress={() => { this.RBSheet1.open() }}>{stringsoflanguages.service_contracts_define_arguments} </Text>



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
                        console.log("after adding on activity 6 =========" + JSON.stringify(answerArray));
                        if (isgoback) {

                            answerArray.pop();

                            if (this.state.screenname == "screen2") {

                                this.props.navigation.navigate('ServiceContractScreen2', {
                                    isgoback: isgoback,
                                    screenname: "screen2",
                                    answerArray: answerArray,
                                    completeArray: completeArray
                                })
                            } else {

                                this.props.navigation.navigate('ServiceContractScreen5', {
                                    isgoback: isgoback,
                                    answerArray: answerArray
                                })
                            }
                            isgoback = false;

                        } else {

                            completeArray[questionno1 - 1] = {
                                que_id: que_id, index: 0, text_option: multiselectoption.toString().replace(/[[\]]/g, ''),
                                question: this.state.question5
                            }

                            for (let i = 0; i < multiselectoption.length; i++) {
                                if (multiselectoption[i] == "Other (Please Specifiy)") {
                                    multiselectoption[i] = (this.state.businesstype)
                                    AsyncStorage.setItem('@businessValue', this.state.businesstype);
                                }
                            }

                            answerArray[questionno1 - 1] = {
                                que_no: questionno1, que_id: completeArray[questionno1 - 1].que_id, text_option: multiselectoption.toString().replace(/[[\]]/g, ''),
                                question: this.state.question5
                            }

                       
                             console.log("array after adding ============" + JSON.stringify(answerArray));

                            if (this.state.isOpen) {
                                this.RBSheet2.open()
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
                                backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end',
                                height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{questionno1}</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question5}</Text>

                        </View>


                        <SelectMultiple
                            items={this.state.contractlist}
                            selectedItems={this.state.selectedContract}
                            onSelectionsChange={this.onSelectionsChange} />



                        {
                            this.state.isbusinessBoxVisible ?


                                <TextInput
                                    placeholder={stringsoflanguages.enter_your_service}
                                    placeholderTextColor={'grey'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={businesstype => this.setState({ businesstype })}
                                    value={this.state.businesstype}
                                    style={styles.TextInputStyleClass} />

                                : null
                        }

                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>

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
                                //  this.RBSheet2.open()

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


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                answerArray = [],
                                    completeArray = [];
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
                                this.props.navigation.navigate('Contactus')
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
                        if (isgoback) {
                            isgoback = false;
                            this.RBSheet1.open()
                        } else {
                          
                            completeArray[questionno2 - 1] = { que_id: completeArray[questionno2 - 1].que_id, index: completeArray[questionno2 - 1].index, text_option: completeArray[questionno2 - 1].text_option, question: this.state.question6 }

                            answerArray[questionno2 - 1] = { que_no: questionno2, que_id: completeArray[questionno2 - 1].que_id, text_option: completeArray[questionno2 - 1].text_option, question: this.state.question6 }

                            
                            this.props.navigation.navigate('PreviewScreen', {
                                answerArray: answerArray,
                                completeArray: completeArray,
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
                                alignItems: 'center', alignContent: 'center', borderColor: '#0093C8',
                                borderWidth: 2, borderBottomWidth: 1
                            }}>
                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{questionno2}</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question6}</Text>

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
                                // this.props.navigation.navigate('ServiceContractScreen3')
                                this.RBSheet2.close()

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


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                //  this.RBSheet1.close()
                                //   this.RBSheet2.close()
                                answerArray = [],
                                    completeArray = [];
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
                                this.props.navigation.navigate('Contactus')
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

        marginLeft:5,

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
});

export default ServiceContractActivity6;