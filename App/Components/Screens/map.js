// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// // import MapView from 'react-native-maps';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


// export default function map() {
//     return (
//         <View style={styles.container}>


//             <MapView
//                 provider={PROVIDER_GOOGLE} // remove if not usinsg Google Maps
//                 style={styles.map}
//                 ref="map"
//                 zoomEnabled={true}
//                 showsUserLocation={true}
//                 followUserLocation={true}
//                 initialRegion={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             // annotations={markers}
//             >
//                 <MapView.Marker
//                     coordinate={{
//                         latitude: 18.6187,
//                         longitude: 73.8037,
//                     }}
//                     title="app"

//                 />
//             </MapView>
//         </View>

//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 20,
//         height: screen.height - 140,

//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//         flex: 1
//     },
// });
