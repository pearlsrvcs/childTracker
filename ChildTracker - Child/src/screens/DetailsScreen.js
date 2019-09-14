import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

import getCurrentDateTime from '../js/GetCurentDateTime'

class DetailsScreen extends Component {
  constructor(props) {
    super(props)   
    console.log(`DETAIL SCREEN PROPS: ${JSON.stringify(props)}`) 
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,     
    };
  }
  

  componentDidMount() {
      this._getLocationAsync();      
  }

  storeLocation(location) {   
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (body) {
      if (body === '') {
        originalSend.call(this);
      } else {
        originalSend.call(this, body);
      }
    };      
    console.log(`STORELOCATION PROPS: ${JSON.stringify(this.props)}`)
    let childKey = this.props.navigation.state.params.key
    let name = this.props.navigation.state.params.name
    let phone = this.props.navigation.state.params.phone
    let birthdate = this.props.navigation.state.params.birthdate    
    currentDateTime = getCurrentDateTime()
    db.collection('child').doc(childKey).set({
      name: name,
      phone: phone,
      birthdate: birthdate,
      lat: location.coords.latitude,
      lng: location.coords.latitude,
      getCurrentDateTime: currentDateTime
    })
    .then (() => {
      console.log('SAVED CHILD LOCATION')
    }).catch( (error) => {
      console.log('Error saving info')
    }) 
  }  

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   this.storeLocation(location)
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }})        
  }
    
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Pan, zoom, and tap on the map!
        </Text>
        
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              style={{ alignSelf: 'stretch', height: 400 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            />
        }
                
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default DetailsScreen