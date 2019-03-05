import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from '../../components/Button';
import { YELLOW } from '../../utils/constants';
import { titleCase } from '../../utils/helpers';

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

export default class Location extends Component {
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
    const { project } = this.props;
    const { isMapReady, view } = this.state;
    const cc = [
      {
        latitude: project.location.lat + 0.002,
        longitude: project.location.lng + 0.002002,
        color: '#C91C53',
      },
      {
        latitude: project.location.lat + 0.00326673,
        longitude: project.location.lng + 0.00412612323,
        color: '#669FCE',
      },
      {
        latitude: project.location.lat + 0.0032326,
        longitude: project.location.lng + 0.00534346,
        color: '#665633',
      },
      {
        latitude: project.location.lat + 0.002253438,
        longitude: project.location.lng + 0.006363488,
        color: '#669',
      },
      {
        latitude: project.location.lat + 0.00241223,
        longitude: project.location.lng + 0.007312934,
        color: '#DAFFB2',
      },
      {
        latitude: project.location.lat + 0.002333314,
        longitude: project.location.lng + 0.0032322314,
        color: '#22AD34',
      },
      {
        latitude: project.location.lat + 0.00412776,
        longitude: project.location.lng + 0.0023416,
        color: '#669FCE',
      },
      {
        latitude: project.location.lat - 0.005232322,
        longitude: project.location.lng + 0.004022323,
        color: '#E06811',
      },
      {
        latitude: project.location.lat - 0.0040123222,
        longitude: project.location.lng + 0.00702322,
        color: '#669FCE',
      },
      {
        latitude: project.location.lat + 0.007220125,
        longitude: project.location.lng - 0.0033222324,
        color: '#0B089D',
      },
      {
        latitude: project.location.lat + 0.00526,
        longitude: project.location.lng + 0.0022023264,
        color: '#0B089D',
      },

      {
        latitude: project.location.lat - 0.002322,
        longitude: project.location.lng - 0.008322,
        color: '#669FCE',
      },
      {
        latitude: project.location.lat - 0.0034,
        longitude: project.location.lng - 0.0084,
      },
      {
        latitude: project.location.lat - 0.0016,
        longitude: project.location.lng - 0.0086,
        color: '#0B089D',
      },
      {
        latitude: project.location.lat - 0.0038,
        longitude: project.location.lng - 0.0098,
      },
      {
        latitude: project.location.lat - 0.00123,
        longitude: project.location.lng - 0.0062,
      },
      {
        latitude: project.location.lat - 0.00344,
        longitude: project.location.lng - 0.00284,
        color: '#0B089D',
      },
      {
        latitude: project.location.lat - 0.00896,
        longitude: project.location.lng - 0.00916,
      },
      {
        latitude: project.location.lat - 0.0022321,
        longitude: project.location.lng - 0.00122232,
      },
      {
        latitude: project.location.lat - 0.0022,
        longitude: project.location.lng - 0.0022,
        color: '#0B089D',
      },
    ];
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
            <Fragment>
              {project.location.name === 'Abia, Nigeria' ? (
                <Fragment>
                  {
                    <Marker.Animated
                      // pinColor={c.color}
                      title={project.name}
                      description={project.name}
                      coordinate={{
                        latitude: project.location.lat,
                        longitude: project.location.lng,
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
                      title={project.name}
                      description={project.name}
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
            fn={() => this.toggleView()}
          />
        </View>
      </View>
    );
  }
}
