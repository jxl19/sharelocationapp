import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMaps = props => {
    let userLocationMarker = null;
    props.userLocation ? userLocationMarker = <MapView.Marker coordinate={props.userLocation}/> : null;
    const usersMarker = props.userPlaces.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id}/> ) 
    return (
        <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} region={props.userLocation}>
                {userLocationMarker}
                {usersMarker}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20,
        marginBottom: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

export default usersMaps;