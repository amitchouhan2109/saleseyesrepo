




import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Dimensions, StyleSheet, TextInput } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';




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
            },
            isMapReady: false,
            marginTop: 1,
            userLocation: "",
            regionChangeProgress: false
        };
    }


    componentDidMount() {
        Geocoder.init("AIzaSyCnTVcKa7vGMLY_h73i_9771INltnOdjiQ")
        // Geocoder.init("AIzaSyB-1UgXp3dcLFbi6IbyZneoM8DwIevtke0")


        Geolocation.getCurrentPosition((position) => {
            const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
            console.log(position, "pos")
            this.setState({
                region: region,
                loading: false,
                error: null,
            });
        })
        Geocoder.from("pune")
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log(location);
            })
            .catch(error => console.log(error, "10")),
            Geocoder.from(41.89, 12.49)
                .then(json => {
                    var addressComponent = json.results[0].address_components[0];
                    console.log(addressComponent, "12");
                })
                .catch(error => console.log(error, "11"));





        // navigator.geolocation.getCurrentPosition(
        // (position) => {
        //     console.log(position)
        //     const region = {
        //         //     latitude: position.coords.latitude,
        //         //     longitude: position.coords.longitude,
        //         //     latitudeDelta: 0.001,
        //         //     longitudeDelta: 0.001
        //     };
        //     console.log(region)
        //     // this.setState({
        //     //     region: region,
        //     //     loading: false,
        //     //     error: null,
        //     // });
        // },
        // (error) => {
        //     alert(error);
        //     // this.setState({
        //     //     error: error.message,
        //     //     loading: false
        //     // })
        // },
        //     { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },

    }
    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="
            + 18.5204 + "," + 73.8567 +
            "&key=" + "AIzaSyB-1UgXp3dcLFbi6IbyZneoM8DwIevtke0")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // const userLocation = responseJson.results[0].formatted_address;
                // this.setState({
                //     userLocation: userLocation,
                //     regionChangeProgress: false
                // });
            });
    }

    // Update state on region change
    onRegionChange = region => {
        this.setState({
            region,
            regionChangeProgress: true
        }, () => this.fetchAddress());
    }
    onLocationSelect = () => alert(this.state.userLocation);

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


