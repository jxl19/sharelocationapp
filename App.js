import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import FetchLocation from './components/src/FetchLocation';

export default class App extends React.Component {
  constructor(props){
    super(props);
      this.state= {
        url: 'https://www.facebook.com'
      }
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
    }, err => console.err(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically test.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="testing" onPress={ ()=>{ Linking.openURL(this.state.url)}} />
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
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
