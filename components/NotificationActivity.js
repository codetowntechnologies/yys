import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import BottomNavigator from "../components/BottomNavigator";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
                    <Text style={{ color: '#767475', alignItems: 'center', justifyContent: 'center', marginLeft:10, fontSize: RFValue(12, 580) }}>{item.name}</Text>
                    <Text style={{ color: "#767475", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.time}</Text>
                </View>

            </View>
        </View>


    );
}

export default class NotificationActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
                {
                    "name": "YYS advisor replied your question",
                    "time": "10 minutes ago"
                },
                {
                    "name": "you posted a question",
                    "time": "5 minutes ago"
                },
            ]
        };
    }


    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#767475",
                }}
            />
        );
    }

    actionOnRow(item) {
        this.props.navigation.navigate('QuestionLogDetail')
        console.log('Selected Item :', item);
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>NOTIFICATION</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >


                    </TouchableOpacity>
                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.email}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

                        <Image source={require('../images/question-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('contractLog') }}>

                        <Image source={require('../images/contract-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { console.log("click========") }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5fd'
    },
    listItem: {
        backgroundColor: "#fbfbfb",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 30,
        width: 30,
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
});