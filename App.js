import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import FetchLocation from './components/src/FetchLocation';
import UsersMaps from './components/src/UsersMaps';

export default class App extends React.Component {
  state = {
    userLocation: null,
    userPlaces: [],
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
      fetch('https://mapss-74b1c.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }, err => console.log(err))
  }

  getUserPlacesHandler = () => {
    fetch('https://mapss-74b1c.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          userPlaces: placesArray
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <UsersMaps userLocation={this.state.userLocation} userPlaces={this.state.userPlaces} />
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <View style={{ marginTop: 20 }}>
          <Button title="Get User places" onPress={this.getUserPlacesHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
