import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import Button from '../Button';
import { YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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

    console.log('loaction nowo', location);
    // const location = location;
    const cc = [
      {
        latitude: location.lat + 0.002,
        longitude: location.lng + 0.002002,
        color: '#C91C53',
      },
      {
        latitude: location.lat + 0.00326673,
        longitude: location.lng + 0.00412612323,
        color: '#669FCE',
      },
      {
        latitude: location.lat + 0.0032326,
        longitude: location.lng + 0.00534346,
        color: '#665633',
      },
      {
        latitude: location.lat + 0.002253438,
        longitude: location.lng + 0.006363488,
        color: '#669',
      },
      {
        latitude: location.lat + 0.00241223,
        longitude: location.lng + 0.007312934,
        color: '#DAFFB2',
      },
      {
        latitude: location.lat + 0.002333314,
        longitude: location.lng + 0.0032322314,
        color: '#22AD34',
      },
      {
        latitude: location.lat + 0.00412776,
        longitude: location.lng + 0.0023416,
        color: '#669FCE',
      },
      {
        latitude: location.lat - 0.005232322,
        longitude: location.lng + 0.004022323,
        color: '#E06811',
      },
      {
        latitude: location.lat - 0.0040123222,
        longitude: location.lng + 0.00702322,
        color: '#669FCE',
      },
      {
        latitude: location.lat + 0.007220125,
        longitude: location.lng - 0.0033222324,
        color: '#0B089D',
      },
      {
        latitude: location.lat + 0.00526,
        longitude: location.lng + 0.0022023264,
        color: '#0B089D',
      },

      {
        latitude: location.lat - 0.002322,
        longitude: location.lng - 0.008322,
        color: '#669FCE',
      },
      {
        latitude: location.lat - 0.0034,
        longitude: location.lng - 0.0084,
      },
      {
        latitude: location.lat - 0.0016,
        longitude: location.lng - 0.0086,
        color: '#0B089D',
      },
      {
        latitude: location.lat - 0.0038,
        longitude: location.lng - 0.0098,
      },
      {
        latitude: location.lat - 0.00123,
        longitude: location.lng - 0.0062,
      },
      {
        latitude: location.lat - 0.00344,
        longitude: location.lng - 0.00284,
        color: '#0B089D',
      },
      {
        latitude: location.lat - 0.00896,
        longitude: location.lng - 0.00916,
      },
      {
        latitude: location.lat - 0.0022321,
        longitude: location.lng - 0.00122232,
      },
      {
        latitude: location.lat - 0.0022,
        longitude: location.lng - 0.0022,
        color: '#0B089D',
      },
    ];
    return (
      <View>
        <Modal isVisible={visible}>
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
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              {isMapReady ? (
                <Fragment>
                  {location.name === 'Abia, Nigeria' ? (
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
                  ) : (
                    <Fragment>
                      {cc.map((c, index) => (
                        <Marker.Animated
                          key={index}
                          // pinColor={c.color}
                          title={location.name}
                          description={location.name}
                          coordinate={{
                            latitude: c.latitude,
                            longitude: c.longitude,
                          }}
                        />
                      ))}
                    </Fragment>
                  )}
                </Fragment>
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
                fn={() => toggleMapView()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
