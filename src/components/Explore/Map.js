import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import Button from '../Button';
import Text from '../Text';
import { YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  upButton: {
    marginTop: 20,
    marginLeft: 15,
  },
  imagePosition: {
    position: 'absolute',
    top: 25,
    bottom: 0,
    left: 5,
    right: 0,
  },
  buttonPosition: {
    position: 'absolute',
    top: height / 8,
    bottom: 0,
    left: 20,
    right: 0,
  },

  flex4mb5: {
    flex: 4,
  },
  backButton: {
    marginTop: '7%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  backButtonText: {
    color: YELLOW,
    fontSize: 15,
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
            flex: 1,
          }}
          isVisible={visible}
        >
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              loadingEnabled
              onPress
              mapType={view}
              onPress={event => console.log(event.nativeEvent.coordinate)}
              onMapReady={() => this.onMapLayout()}
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

            <View style={styles.imagePosition}>
              <TouchableOpacity
                transparent
                style={styles.backButton}
                onPress={() => toggleMapView()}
              >
                <View>
                  <Image
                    source={require('../../../assets/white-back.png')}
                    style={{ tintColor: YELLOW }}
                  />
                </View>
                <View>
                  <Text style={styles.backButtonText}> Back </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
