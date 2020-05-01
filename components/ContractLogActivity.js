import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import BottomNavigator from "../components/BottomNavigator";


function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5 }}>

          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>25 Apr 2020</Text>

        </View>

        <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
          <Text style={{ color: '#767475', alignItems: 'center', fontSize: 15 }}>{item.name}</Text>
          <Text style={{ color: "#0093c8", alignSelf: 'flex-end', marginTop: 10 }}>YYS ADVICED</Text>
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
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "miyah.myles@gmail.com",
          "position": "Data Entry Clerk",
          "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "june.cha@gmail.com",
          "position": "Sales Manager",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "iida.niskanen@gmail.com",
          "position": "Sales Manager",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "renee.sims@gmail.com",
          "position": "Medical Assistant",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "jonathan.nu\u00f1ez@gmail.com",
          "position": "Clerical",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "sasha.ho@gmail.com",
          "position": "Administrative Assistant",
          "photo": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "abdullah.hadley@gmail.com",
          "position": "Marketing",
          "photo": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "thomas.stock@gmail.com",
          "position": "Product Designer",
          "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "veeti.seppanen@gmail.com",
          "position": "Product Designer",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
        },
        {
          "name": "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",
          "email": "bonnie.riley@gmail.com",
          "position": "Marketing",
          "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
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
            onPress={() => {this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <Image source={require('../images/question-inactive.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { console.log("click========") }}>

            <Image source={require('../images/home-inactive.png')}
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