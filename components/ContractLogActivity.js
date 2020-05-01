import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import BottomNavigator from "../components/BottomNavigator";


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', padding:5 }}>25 Apr</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 15}}>
                    <Text style={{ color: '#767475', alignItems: 'center', fontSize: 15 }}>ABC COMPANY</Text>
                    <Text style={{ color: "#0093c8", alignItems: 'center', marginTop: 10 }}>Legal Services</Text>
                </View>

            </View>
        </View>


    );
}

export default class ContractLogActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "name": "ABC COMPANY1",
                    "email": "Legal Services1",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY2",
                    "email": "Legal Services2",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY3",
                    "email": "Legal Services3",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY4",
                    "email": "Legal Services4",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY5",
                    "email": "Legal Services5",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY6",
                    "email": "Legal Services6",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY7",
                    "email": "Legal Services7",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY8",
                    "email": "Legal Services8",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY9",
                    "email": "Legal Services9",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                },
                {
                    "name": "ABC COMPANY10",
                    "email": "Legal Services10",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                }
            ]
        };
    }

    // state = {

    // }

    actionOnRow(item) {
        this.props.navigation.navigate('QuestionLogDetail')
        console.log('Selected Item :', item);
    }


    render() {
        return (
            <View style={styles.container}>

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
        backgroundColor: '#f1f5fd',
        marginTop: 60
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
        height: 30,
        width: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});