import React from 'react';
import {
    StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image,
    FlatList, SafeAreaView
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import RadioButton from 'react-native-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';

var responseData;
var answerArray = [];
var completeArray = [];
var isgoback=false;

export class ServiceContractActivity5 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            value: '',
            serviceValue: 1,
            isOpen: false,
            question9: '',
            responseData: '',
            questionindex: '',
            selectedLanguage:'',
            languageType: '',
            selectedquestionid: '',
            question_count: '',
            contract_count: '',

        };
    }

    static navigationOptions = {
        title: 'Servoce Contract Screen',
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


        this.setState({ questionindex: 9 })
        this.setState({ question9: responseData.next_question[5].question })

        this.setState({ data: responseData.next_question[5].option_array })
        this.setState({ responseData: responseData })

        var index = completeArray.findIndex(x => x.que_id === responseData.next_question[5].id);
        if (index == -1) {
            this.setState({ selectedIndex: -1 })
        } else {
            this.setState({ selectedIndex: completeArray[index].index })
            this.setState({ legalValue: (completeArray[index].index +1) })

            answerArray[8] = { que_no: 9, que_id: completeArray[index].que_id, text_option: completeArray[index].text_option , question: completeArray[index].question }
       
            completeArray[8] = { que_id: completeArray[index].que_id, index: completeArray[index].index , text_option: completeArray[index].text_option, question: completeArray[index].question}
                            
           
        }


        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
              if(selectedLanguage=="English")
              {
                stringsoflanguages.setLanguage("en");
              }else{
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

        if(isgoback)
        {       
            answerArray = navigation.getParam('answerArray', 'no-business-array');
            completeArray = navigation.getParam('completeArray', 'no-complete-array');
            console.log("answerArray=====" + answerArray)

            
            isgoback=false;
            this.RBSheet1.open()
        }
    
      }
    


    onPress = (item, index) => {

        this.setState({ selectedIndex: index })

        this.setState({ serviceValue: index + 1 })

        answerArray[8] = { que_no: 9, que_id: item.question_id, text_option: item.option_name, question: this.state.question9 }
       
        completeArray[8] = { que_id: item.question_id, index: index, text_option: item.option_name, question: this.state.question9 }
                        
       
        this.setState({selectedquestionid:item.question_id})

        console.log(" index===" + index);
    }

    renderItem = ({ item, index }) => {
       
        return (

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: 1, backgroundColor: '#ffffff',
                    elevation: 0, margin: 5, flexDirection: 'row'
                }}>
                    <RadioButton
                        isSelected={this.state.selectedIndex == index}
                        onPress={() => {

                            this.onPress(item, index)
                        }} />

                    <Text 
                       isSelected={this.state.selectedIndex == index}
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
                            style={{ height: 300, width: 300, marginTop: 30, marginLeft: 2, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                            source={this.state.islegalvalueselected ? require('../images/dashboard.png') : require('../images/dashboard-2.png')}>

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
                            this.props.navigation.navigate('ServiceContractScreen4', {
                                isgoback: true,
                                answerArray:answerArray,
                                completeArray:completeArray
                            })
                            isgoback = false;
                        } else {

                            if (this.state.isOpen) {
                    
                                console.log("service value===" + this.state.serviceValue)
                                if (this.state.serviceValue == "1" || this.state.serviceValue == "2") {
                                    this.props.navigation.navigate('ServiceContractScreen6', {
                                        legalValue: this.state.serviceValue,
                                        questionid: completeArray[8].que_id,
                                        questionno1: 10,
                                        questionno2: 11,
                                        screename: "screen5",
                                        answerArray: answerArray,
                                        completeArray:completeArray
                                    })
                                } else if (this.state.serviceValue == "3") {
                                    this.props.navigation.navigate('ServiceContractScreen7', {
                                        legalValue: this.state.serviceValue,
                                        questionid: completeArray[8].que_id,
                                        questionno1: 10,
                                        questionno2: 11,
                                        screename: "screen5",
                                        answerArray: answerArray,
                                        completeArray:completeArray
                                    })
                                }
                                else if (this.state.serviceValue == "4") {
                                    this.props.navigation.navigate('ServiceContractScreen8', {
                                        legalValue: this.state.serviceValue,
                                        questionid: completeArray[8].que_id,
                                        questionno1: 10,
                                        questionno2: 11,
                                        screename: "screen5",
                                        answerArray: answerArray,
                                        completeArray:completeArray
    
                                    })
                                }
                                else {
                                    //  this.props.navigation.navigate('ServiceContractScreen3')
                                    // this.props.navigation.navigate('PreviewScreen')
                                }
    
                            }

                        }

                    }}

                    animationType={'fade'}
                    height={450}
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

                            <Text style={styles.TextStyle}>{this.state.question9}</Text>

                        </View>

                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            extraData={this.state}
                        />


                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 0 }}>

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
                                            marginRight:20,
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

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',flexDirection: 'column' }}>
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
                                            marginLeft:20,
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
        textAlign:'left',
        marginLeft:5
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
        marginRight:20,
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
        marginLeft:20,
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
        marginRight:20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottomcontracttextstyle: {
        color: "#887F82",
        fontSize: 7,
        marginLeft:20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ServiceContractActivity5;
