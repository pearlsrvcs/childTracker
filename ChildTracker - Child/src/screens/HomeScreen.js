import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase'
import firestore from 'firebase/firestore';

class HomeScreen extends Component {
    constructor(props) {
      super(props)
      this.state = {
        phone: '2566062139',
        birthdate: '03/03/1959',
        name: 'Kim',
        key:'030319592566062139',
        children: []
      } 
      firebase.initializeApp({
        apiKey: 'AIzaSyCJifH-46GRw3E8i1rU8Bd438Gl8V6S1yk',  
        projectId: 'childtracker', 
        token: 'AAAAcyS9VuM:APA91bFqiWF6_rBhFgZ_nEp4ABOEayLwIbumKiNzRCVbBC00WHtjF9vt7xlgAo_NA5EDMm4I_6dPCKgMj8KhsLB3X9cYJzuHSpiJavusIbn4p6RFruFU-0yGUFpphnOnYdjOR43gmuLY',
        senderID: '494537627363',
        storageBuicket: 'childtracker.appspot.com'
        }); 
    var db                
    }
   
     onPhoneChange = (text) => {
      this.setState({
        phone: text 
      })
    }
    onNameChange = (text) => {
      this.setState({
        name: text 
      })
    }
    
    onBirthdateChange = (text) => {
      this.setState({
        birthdate: text 
      })
    }

    onChildrenButtonPress = () => {
      this.props.navigation.navigate('Lists', this.state.children, this.db)
    }    

    saveChildToFirebase(child){
      const originalSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function (body) {
        if (body === '') {
          originalSend.call(this);
        } else {
          originalSend.call(this, body);
        }
      };
      db = firebase.firestore()      
      db.collection('child').doc(child.key).set({
        name: child.name,
        phone: child.phone,
        birthdate: child.birthdate,        
      })
      .then (() => {
        console.log('Saved')
      }).catch( (error) => {
        console.log('Error saving info')
      })      
    }   

    onButtonPress = ()  => {
      Alert.alert(
        'Save and use this information?',
        `Name: ${this.state.name}: Phone: ${this.state.phone} and Birthday: ${this.state.birthdate}`,
        [{text: "Cancel", onPress: () => {
          console.log('User Pressed Cancel')
          }},
        {text: "OK", onPress: () => {
          let key = this.state.birthdate
          key = key.replace(/\//g, '')        
          key = key + this.state.phone
          key = key.replace('(\D+','')  
          child={
            name: this.state.name,
            birthdate: this.state.birthdate,
            phone: this.state.phone,
            key: key
          }
          this.saveChildToFirebase(child)
          this.state.children.push(child);
          this.setState({
            name: '',
            birthdate: '',
            phone: '',
            key: ''
          })}}
        ],
        {cancelable: true}      
      )         
    }

    render() {      
      return (        
        <View>
          <Text style={styles.textStyle}>Please</Text>
            <View>
          <Text style={styles.promptStyle}>enter your childs name: </Text>
          <TextInput 
            style={styles.textInputStyle} 
            placeholder="John Smith" 
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
          />         
          <Text style={styles.promptStyle}>enter your childs birthday: </Text>
          <TextInput 
              style={styles.textInputStyle} 
              placeholder="01/01/1959" 
              onChangeText= {(text) => this.setState({birthdate: text})} 
              value={this.state.birthdate}
            />                  
          <Text style={styles.promptStyle}>and enter your childs phone number: </Text>
          <TextInput 
              style={styles.textInputStyle} 
              placeholder="0123456789" 
              onChangeText= {(text) => this.setState({phone: text})} 
              value={this.state.phone}
            />
            </View>
          <View style={styles.btnView}>
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} title="Confirm" style={styles.btn}><Text style={styles.textStyle}>Confirm</Text></TouchableOpacity>        
            <TouchableOpacity onPress={this.onChildrenButtonPress.bind(this)} title="Children" style={styles.btn}><Text style={styles.textStyle}>Children</Text></TouchableOpacity>             
          </View>           
      </View>   
    )
  }
}

const styles=StyleSheet.create({
  textStyle: {
    fontSize: 24,
    paddingHorizontal: 28
  },
  promptStyle: {
    fontSize: 18,
    padding: 10
  },
  textInputStyle: {
    height: 50,
    fontSize: 18,
    backgroundColor: 'azure',
    padding: 10
  },
  btn: {
    borderWidth: 2,   
    borderColor: '#002AFF',
    marginTop: 30,
    marginHorizontal: 10,    
    borderRadius: 20,    
    width: 150,
    backgroundColor: 'azure',
    alignContent: 'center'
  },
  btnView: {
    display:'flex',
    flexDirection: 'row',
    marginBottom: 0,
    justifyContent: 'center',
    alignContent: 'center'
  },
  keyView: {
    paddingTop: 100
  }
  
  
})

export default HomeScreen