import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import Text from '../Text';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    marginTop: '15%',
    alignItems: 'center',
  },
  imageStyle: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    height: width / 12,
    width: width / 12,
    borderRadius: width / 6,
  },
});

export default class ProjectLevelSubmission extends Component {
  state = {
    empty: true,
  };

  render() {
    const { empty } = this.state;
    if (!empty) {
      return (
        <View style={styles.viewContainer}>
          <Text> No submissions yet</Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 2, marginVertical: 10 }}>
          <View>
            <Text style={{ fontSize: 16, color: '#0A2C56' }}> Requested</Text>
          </View>

          <View
            style={{
              marginVertical: 10,
              flexGrow: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              // marginLeft: 5,
              // justifyContent: 'space-between',
              // margin: 15,
              paddingBottom: '10%',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <TouchableOpacity
                style={{ height: 200, width: 200, flexWrap: 'wrap', flexDirection: 'row' }}
              >
                <View style={{ height: 100, width: 100 }}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require('../../../assets/img/cleanup/factory.jpg')}
                  />
                </View>
                <View style={{ height: 100, width: 100 }}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require('../../../assets/class.png')}
                  />
                </View>
                <View style={{ height: 100, width: 100 }}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require('../../../assets/img/cleanup/cleanup_22.jpg')}
                  />
                </View>
                <View style={{ height: 100, width: 100 }}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require('../../../assets/img/cleanup/cleanup_4.jpg')}
                  />
                </View>
              </TouchableOpacity>
              <View>
                <View>
                  <Text style={{ color: '#696F74' }}> Date of last submission </Text>
                </View>

                <View>
                  <Text style={{ color: '#0A2C56' }}> Request title </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{}}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/woman1.png')}
                    />
                  </View>
                  <View style={{ marginLeft: -15 }}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/img/woman.png')}
                    />
                  </View>
                  <View style={{ marginLeft: -15 }}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/person.png')}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'red' }} />
            <View>
              <TouchableOpacity style={{ height: 200, width: 200 }}>
                <Image
                  style={{ height: 200, width: 200 }}
                  source={require('../../../assets/table-data.png')}
                />
              </TouchableOpacity>
              <View>
                <View>
                  <Text style={{ color: '#696F74' }}> Date of last submission </Text>
                </View>

                <View>
                  <Text style={{ color: '#0A2C56' }}> Request title </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{}}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/woman1.png')}
                    />
                  </View>
                  <View style={{ marginLeft: -15 }}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/img/woman.png')}
                    />
                  </View>
                  <View style={{ marginLeft: -15 }}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/person.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Text style={{ color: '#0A2C56' }}> Others</Text>
        </View>
      </ScrollView>
    );
  }
}
