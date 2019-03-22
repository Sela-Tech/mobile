import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import Button from '../Button';
import BackButton from '../BackButton';
import { YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  upButton: {
    marginTop: 20,
    marginLeft: 15,
  },
});

export default class Map extends Component {
  state = {
    isMapReady: false,
    view: 'standard',
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  toggleView = () => {
    if (this.state.view === 'standard') {
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
    const { isMapReady, view, toggleMapView, location, visible } = this.props;

    return (
      <View>
        <Modal
          style={{
            margin: 0,
            marginTop: '10%',
            // height,
            flex: 1,
            //      borderRadius: 20,
            // borderTopLeftRadius: 20,
            //  borderTopRightRadius: 20,
          }}
          isVisible={visible}
        >
          <View style={styles.container}>
            <View style={styles.upButton}>
              <BackButton fn={() => toggleMapView()} />
            </View>
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
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              {isMapReady ? (
                <Fragment>
                  {
                    <Marker.Animated
                      // pinColor={c.color}
                      title={location.name}
                      description={location.name}
                      coordinate={{
                        latitude: location.lat,
                        longitude: location.lng,
                      }}
                    />
                  }
                </Fragment>
              ) : null}
            </MapView>
            <View
              style={{
                // flex: 1,
                // marginTop: 10,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 40,
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
        </Modal>
      </View>
    );
  }
}
