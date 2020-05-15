import React from 'react';
import { View, AsyncStorage, Image, Text,ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { getPhotos, getArticles, getProduct} from '../actions/Product.action';
import { getUserDetail } from '../actions/User.action'
import { bindActionCreators } from 'redux';
import MenuButton from '../../components/MenuButton/MenuButton';
// import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { color } from 'react-native-reanimated';
const URL = `https://digimonk.co/medplus/admin/App-api`;

// console.log()

 class DrawerContainer extends React.Component {

  state={
    customer_id:"",
    // customer_datail:[]
    name :""
  }

  async componentDidMount(){
  
    console.log("Helo")
    var user=await AsyncStorage.getItem('userId')
    this.setState({
      customer_id:user
    })
    

    if(this.state.customer_id!==null){
      this.getMe()
    }
  
    // var data= this.props.data.userDetail
    // var detail= data._result
    // var customer_datail= detail.customer_detail[0]
    // console.log(customer_datail)
    // this.setState({
    //   name:customer_datail['f_name']
    // })

  }

  getMe=()=>{
    // alert(this.state.customer_id)
  
  }

  componentWillReceiveProps(){
    console.log("myapp")
    this.sessionStorage()
  }
  // componentDidUpdate(){
    
  // }

async sessionStorage(){
 console.log("hello")
 var user=await AsyncStorage.getItem('userId')
    this.setState({
      customer_id:user
    })
    if(user!==null){
      console.log(this.props.data)
      var data= this.props.data.userDetail
      var detail= data.customer_detail[0]
      var name = detail.f_name
      this.setState({
        name:name
      })
    }
}

  render() {
    const { navigation } = this.props; 
    // this.sessionStorage()
  //  console.log(this.state.customer_id)
  //  if(this.state.customer_id!==null){
  //    console.log(this.props.data)
  //  }
   
    return (
      <View style={styles.DrawerContainer}>
       <SafeAreaView style={{backgroundColor:"#e22034"}}>
       <View style={styles.drawerHeader}>
            <Image source={require('../../../assets/user.png')} style={{height:45, width:45}} />
             {
               this.state.customer_id==null?<Text style={{color:"#fff", fontSize:18, fontFamily:"Raleway-Regular", marginLeft:10}}>Guest</Text>:<Text style={{color:"#fff", fontSize:18, fontFamily:"Raleway-Regular", marginLeft:10}}>{this.state.name}</Text>
             }
        </View>
       </SafeAreaView>
         <ScrollView>
         <View style={styles.content}>
        <View style={styles.container}>

        <MenuButton
            title="Order History"
            source={require('../../../assets/icons/order-history.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="My Order"
            source={require('../../../assets/icons/my-order.png')}
            onPress={() => {
              navigation.navigate('MyOrder');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="Profile"
            source={require('../../../assets/icons/profile.png')}
            onPress={() => {
              navigation.navigate('MyProfile');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Payment"
            source={require('../../../assets/icons/payment.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
          
        <MenuButton
            title="Find Doctors"
            source={require('../../../assets/icons/find-doctors.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
           <MenuButton
            title="Appointent"
            source={require('../../../assets/icons/appointment.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="Doctor Consult"
            source={require('../../../assets/icons/doctor-consult.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Chat"
            source={require('../../../assets/icons/chat.png')}
            onPress={() => {
              navigation.navigate('CommingSoon');
              navigation.closeDrawer();
            }}
          />
          {
            this.state.customer_id==null? <MenuButton
            title="Login"
            source={require('../../../assets/icons/logout.png')}
            onPress={async() => {
              var user=await AsyncStorage.removeItem('userId')
              if(user==null){
                navigation.navigate('Login');
                navigation.closeDrawer();
              }
              
            }}
          />: <MenuButton
          title="Logout"
          source={require('../../../assets/icons/logout.png')}
          onPress={async() => {
            var user=await AsyncStorage.removeItem('userId')
            if(user==null){
              navigation.navigate('Login');
              navigation.closeDrawer();
            }
            
          }}
        />
          }
          
        </View>
      </View>
         </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state){
  // console.log(state)
  return {
      data:state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getUserDetail},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
