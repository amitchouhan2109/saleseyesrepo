




import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Dimensions, StyleSheet, TextInput, Alert } from "react-native";
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
                latitude: 10,
                longitude: 10,
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
        // Geocoder.init("AIzaSyCnTVcKa7vGMLY_h73i_9771INltnOdjiQ")
        // Geocoder.init("AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")


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
                userLocation: " your location "
            });
        })
        // Geocoder.from("pune")
        //     .then(json => {
        //         var location = json.results[0].geometry.location;
        //         console.log(location);
        //     })
        //     .catch(error => console.log(error, "10")),








    }
    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {


        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="
            + this.state.region.latitude + "," + this.state.region.longitude +
            "&key=" + "AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")
            .then((response) => response.json())
            .then((responseJson) => {
                const res = responseJson.results[0].formatted_address;
                Alert.alert(
                    ' Do you want to set this location  as address', res,
                    [
                        {
                            text: 'Yes', onPress: () => {
                                this.props.navigation.navigate('NewTask', { addressfromMap: res })

                            }
                        },
                        {
                            text: 'No', onPress: () => {
                                console.log("no")
                            }
                        },
                    ]
                );
                const userLocation = responseJson.results[0].formatted_address;
                this.setState({
                    userLocation: userLocation,
                    regionChangeProgress: false
                });
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
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
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
                            title={this.state.userLocation}
                            draggable />
                    </MapView>
                </View>
            </View>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 20,
        // height: screen.height - 140,
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width

    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1
    },

});


