import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class BloodRequestScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedBloodList : [],
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("requested_blood")
    .onSnapshot((snapshot)=>{
      var requestedBloodList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedBloodList : requestedBloodList
      });
    })
  }

  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
   
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.blood_name}
        subtitle={item.room_for}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details": item})
              }}
              >
              <Text style={{color:'#0D4F8B', fontWeight: 'bold'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Take on Rent" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedBloodList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Rooms</Text>
              </View>
            )
            :(
              <FlatList
              
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBloodList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#00FF7F",
    shadowColor: "green",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
