import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from '../../components/Button';
import { YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Location extends Component {
  state = {
    isMapReady: false,
    view: 'standard',
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  toggleView = () => {
    const { view } = this.state;
    if (view === 'standard') {
      this.setState({
        view: 'satellite',
      });
    } else {
      this.setState({
        view: 'standard',
      });
    }
  };

  render() {
    const { project } = this.props;
    const { isMapReady, view } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          loadingEnabled
          onPress
          mapType={view}
          onPress={event => console.log(event.nativeEvent.coordinate)}
          onMapReady={() => this.onMapLayout()}
          // onLayout={this.onMapLayout}
          initialRegion={{
            latitude: project.location.lat,
            longitude: project.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {isMapReady ? (
            <Marker.Animated
              // pinColor={c.color}
              title={project.name}
              description={project.name}
              coordinate={{
                latitude: project.location.lat,
                longitude: project.location.lng,
              }}
            />
          ) : null}
        </MapView>
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <Button
            text="Toggle view"
            style={{
              width: width / 4,
            }}
            color={YELLOW}
            fn={() => this.toggleView()}
          />
        </View>
      </View>
    );
  }
}
