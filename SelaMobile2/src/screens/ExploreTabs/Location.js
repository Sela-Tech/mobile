import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});



export default class Location extends Component {

    state = {
        isMapReady: false,
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    render() {
        const { project } = this.props;
        const { isMapReady } = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    loadingEnabled
                    onMapReady={() => this.onMapLayout()}
                    // onLayout={this.onMapLayout}
                    initialRegion={{
                        latitude: project.location.lat,
                        longitude: project.location.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {
                        isMapReady ?
                            <Marker
                                coordinate={{
                                    latitude: project.location.lat,
                                    longitude: project.location.lng,
                                }}
                            /> : null
                    }

                </MapView>
            </View>
        )
    }
}


