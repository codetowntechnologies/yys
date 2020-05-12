import React from 'react';
import {
    StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput, FlatList,
    SafeAreaView, ActivityIndicator, TouchableWithoutFeedback
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import RadioButton from 'react-native-radio-button';

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'column' }}>

                <View style={{
                    flex: .33, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center',
                    shadowColor: '#ecf6fb', elevation: 20, margin: 10

                }}>

                    <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center',  height: 40, width: 40 }}>

                        <Image source={{ uri: item.image }}
                            style={styles.categoryIconStyle} />
                    </View>

                    {/* <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5)}}>{item.name}</Text> */}

                </View>

            </View>
        </View>

    );
}

//var index = 0;

export class ServiceContractActivity1 extends React.Component {

    constructor(props) {
        super(props);
        this.questionlist = this.questionlist.bind(this);
        this.businessTypeList = this.businessTypeList.bind(this);
        this.state = {
            selectedIndex: -1,
            value: '',
            isOpen: false,
            subjecttitle: '',
            status: '',
            question1: '',
            questionId1: '',
            question2: '',
            questionId2: '',
            wholeResult: '',
            questionlist: '',
            responseData: '',
            selecteditem: '',
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_question_list',
            businessTypeList: 'http://203.190.153.22/yys/admin/app_api/get_business_type_list'
        };
    }

    static navigationOptions = {
        title: 'Login Screen',
    };

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        this.RBSheet1.open()
        this.showLoading();
        this.questionlist();
        this.businessTypeList();

    }



    questionlist() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk'
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    this.setState({ responseData: responseData })


                    this.setState({
                        question1: responseData.question_list[0].question,
                        questionId1: responseData.question_list[0].id,
                    })

                    this.setState({
                        question2: responseData.question_list[1].question,
                        questionId2: responseData.question_list[1].id,
                    })

                    console.log('response object:', responseData);

                }



            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }


    businessTypeList() {

        var url = this.state.businessTypeList;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk'
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    this.setState({ data: responseData.business_list });
                }

            })

            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    // actionOnRow(item) {

    //     this.setState({selecteditem:item})

    //     this.RBSheet2.close()

    //     console.log("selected item===" + this.state.selecteditem);

    // }

    onPress = (index) => {

        this.setState({selectedIndex:index})
      
       // this.setState({ selectedIndex: index });

        //console.log("selected index===" + this.state.selectedIndex );
        console.log(" index===" + index);
    }

    renderItem = ({ item, index }) => {
       // console.log("Item", item);
       // console.log("index", index);
        return (

            // <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{
                    flex: 1, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center',
                    shadowColor: '#ecf6fb', elevation: 20, margin: 10, flexDirection: 'row'
                }}>


                    <View style={{ flex: .30, flexDirection: 'column', justifyContent:'center' }}>

                        <RadioButton
                            isSelected={this.state.selectedIndex == index}
                            onPress={() => {
                                this.onPress(index) }} />

                    </View>

                    <View style={{ flex: .70, flexDirection: 'column' , justifyContent: 'center' }}>

                        <View style={{ margin: 5, borderRadius: 10, padding: 10, height: 40, width: 40 }}>

                            <Image source={{ uri: item.image }}
                                style={styles.categoryIconStyle} />
                        </View>

                        <Text style={{ color: '#0093C8', padding: 10,fontSize: RFPercentage(1.5) }}>{item.name}</Text>

                    </View>
                </View>

                {/* </View> */}
            </View>




            // <View style={{ flex: 1, flexDirection: "row" }}>
            //     <Text>{item.name}</Text>
            //     <Image source={{ uri: item.image }}
            //         style={styles.categoryIconStyle} />
            //     <RadioButton
            //         isSelected={this.state.selectedIndex == index}
            //         onPress={() => { this.onPress(index) }}
            //     />
            // </View>
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

                    </View>


                    {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#0094CD" />
                        </View>
                    )}

                </ScrollView>


                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    onClose={() => {
                        if (this.state.isOpen) {
                            this.RBSheet2.open()

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
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>1</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question1}</Text>

                        </View>

                        <TextInput
                            placeholder="Ex. ABC company"
                            underlineColorAndroid='transparent'
                            onChangeText={subjecttitle => this.setState({ subjecttitle })}
                            style={styles.TextInputStyleClass} />


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
                                // this.RBSheet1.close()
                                // this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                //   this.RBSheet1.close()
                                //  this.RBSheet2.close()
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
                                //    this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //   this.RBSheet1.close()
                                //    this.RBSheet2.close()
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

                        this.props.navigation.navigate('ServiceContractScreen2', {
                            responseData: this.state.responseData,
                        })

                        // this.props.navigation.navigate('ServiceContractScreen2')
                    }}
                    animationType={'fade'}
                    height={500}
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
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>2</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}>{this.state.question2}</Text>

                        </View>

{/* 
                        <View style={{
                            flexDirection: 'row', marginTop: 20,
                            shadowOpacity: 0.8, shadowRadius: 2,
                            shadowOffset: {
                                height: 1,
                                width: 1
                            }
                        }}> */}

                            <FlatList
                                data={this.state.data}
                                renderItem={this.renderItem}
                                extraData={this.state}
                                onPress
                            />

                            {/* <FlatList
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
                                keyExtractor={item => item.email}
                                ListEmptyComponent={this.ListEmpty}
                            /> */}

                            {/*        <View style={{
                                flex: .33, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center',  height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                              
                            }}>

                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-legal.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5),  textAlign: 'center' }}>LEGAL</Text>

                            </View>

                            <View style={{
                                flex: .33, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>


                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-account.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>ACCOUNTING</Text>

                            </View>

                            <View style={{
                                flex: .34, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20,  margin:10
                            }}>

                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-it.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>IT SERVICE</Text>
                            </View>


                        </View>

                        <View style={{ flexDirection: 'row' , shadowOpacity: 0.8,  shadowRadius: 2,
                                shadowOffset: {
                                  height: 1,
                                  width: 1
                                }}}>


                            <View style={{
                                flex: .33, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center',  height: 90
                                , shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>

                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-business.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>BUSINESS</Text>

                            </View>

                            <View style={{
                                flex: .33, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>

                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-marketing.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>MARKETING</Text>

                            </View>

                            <View style={{
                                flex: .34, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>


                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-study.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>STUDY</Text>


                            </View>

*/}

                        </View>





                    {/* </View> */}


                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
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
                                //    this.RBSheet1.close()
                                //  this.RBSheet2.close()
                                this.props.navigation.navigate('Dashboard')
                            }}>

                            <Image source={require('../images/home.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            onPress={() => {
                                //  this.RBSheet1.close()
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
                                // this.RBSheet1.close()
                                //this.RBSheet2.close()
                                this.props.navigation.navigate('contractLog')
                            }}>

                            <Image source={require('../images/contract-inactive.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //   this.RBSheet1.close()
                                // this.RBSheet2.close()
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
    container: {
        flex: 1,
        backgroundColor: '#F0F5FE',

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

export default ServiceContractActivity1;
