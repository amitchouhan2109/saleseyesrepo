




import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Dimensions, StyleSheet, TextInput } from "react-native";




const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends React.Component {



    constructor(props) {
        super(props)






        this.state = {
            loading: true,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        };
    }



    render() {
        const { marker } = this.props;
        return (
            <MapView
                style={styles.map}
                initialRegion={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}>
                <MapView.Marker
                    coordinate={{
                        "latitude": this.state.region.latitude,
                        "longitude": this.state.region.longitude
                    }}
                    title={"Your Location"}
                    draggable />
            </MapView>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: screen.height - 140,

    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
});


