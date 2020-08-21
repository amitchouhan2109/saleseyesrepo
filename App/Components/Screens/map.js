




import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Dimensions, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
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

            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
            },
            locationChosen: false,
            address: "",
            userLocation: "your current Location"
        }
    }


    componentDidMount() {
        this.getLocationHandler()
        // Geocoder.init("AIzaSyCnTVcKa7vGMLY_h73i_9771INltnOdjiQ")
        // Geocoder.init("AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")


        // Geolocation.getCurrentPosition((position) => {
        //     const region = {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude,
        //         latitudeDelta: 0.001,
        //         longitudeDelta: 0.001
        //     }
        //     console.log(position, "pos")
        //     this.setState({
        //         region: region,
        //         loading: false,
        //         error: null,
        //         userLocation: " your location "
        //     });
        // })
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
            + this.state.focusedLocation.latitude + "," + this.state.focusedLocation.longitude +
            "&key=" + "AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson, "1234")
                if (responseJson.status === "OK") {
                    const res = responseJson.results[0].formatted_address;
                    // Alert.alert(
                    //     ' Do you want to set this location  as address', res,
                    //     [
                    //         {
                    //             text: 'Yes', onPress: () => {
                    //                 this.props.navigation.navigate('NewTask', { addressfromMap: res })

                    //             }
                    //         },
                    //         {
                    //             text: 'No', onPress: () => {
                    //                 console.log("no")
                    //             }
                    //         },
                    //     ]
                    // );
                    const userLocation = responseJson.results[0].formatted_address;
                    this.setState({
                        userLocation: userLocation,
                        // regionChangeProgress: false,
                        address: res
                    });
                }
                else {
                    Alert.alert("Failed", responseJson.error_message)
                }

            })
            .catch((err) => {
                console.log("eror", err)
                Alert.alert(err)
            })


    }

    onPressHandler() {
        if (this.state.address != "") {
            Alert.alert(
                ' Do you want to set this location  as address', this.state.address,
                [
                    {
                        text: 'YES', onPress: () => {
                            this.props.navigation.navigate('NewTask', { addressfromMap: this.state.address })

                        }
                    },
                    {
                        text: 'No', onPress: () => {
                            console.log("no")
                        }
                    },
                ]
            );
        }

    }




    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.fetchAddress()

    };
    getLocationHandler = () => {
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            })
    }

    render() {
        // const { marker } = this.props;
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}
                title={this.state.userLocation}
                onPress={() => this.onPressHandler()}
            />;
        }
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
            </View>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // height: screen.height - 140,
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width

    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        // height: 600
    },

});


