import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Map from './Map';
import { projectStatusTextColor, mapNameToTag, formatMoney } from '../../utils/helpers';
import extStyle from '../../utils/styles';
import Text from '../Text';
import Tag from './ClTag';
import PdfBox from './PdfBox';
import TagDisplay from './TagDisplay';
import { WHITE, YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#696F74',
  },
  verySmallText: {
    fontSize: 14,
  },
  pt: {
    paddingTop: 3,
  },
  text: {
    color: '#696F74',
    fontSize: 15,
  },
  bold: {
    color: '#201D41',
    fontSize: 16,
    fontWeight: '500',
  },
  parentTagStyle: {
    paddingTop: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  tagStyle: {
    height: '60%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  darkBlue: {
    fontSize: 16,
    color: '#201D41',
  },
});

export default class OverView extends Component {
  state = {
    bookmarkStatus: false,
    openMap: false,
  };

  showTag = src => {
    this.setState(prevState => ({
      showTag: !prevState.showTag,
      src,
    }));
  };

  changeBookmark = () =>
    this.setState(prevState => ({ bookmarkStatus: !prevState.bookmarkStatus }));

  toggleMapView = () => this.setState(prevState => ({ openMap: !prevState.openMap }));

  render() {
    const { project } = this.props;
    const { bookmarkStatus, showTag, src, openMap } = this.state;
    if (openMap) {
      return (
        <View style={styles.container}>
          <Map visible={openMap} toggleMapView={this.toggleMapView} location={project.location} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={[{ flex: 2 }]}>
          <View style={{ justifyContent: 'center', flexDirection: 'row', flex: 1 }}>
            <View style={[{ paddingTop: 5, flex: 1 }]}>
              <View>
                <Text style={styles.darkBlue}>LOCATION</Text>
              </View>
              <View style={[extStyle.row, {}]}>
                <View>
                  <Text style={styles.verySmallText}>
                    {project.location.name.length > 35
                      ? project.location.name.slice(0, 32).concat('...')
                      : project.location.name}{' '}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.toggleMapView()}
                    style={{
                      paddingLeft: 8,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text style={{ color: YELLOW }}> View on map</Text>
                    </View>

                    <View style={{ paddingLeft: 5 }}>
                      <Image source={require('../../../assets/forward_yellow.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.parentTagStyle}>
              <Tag
                style={styles.tagStyle}
                text="Ongoing"
                viewColor={projectStatusTextColor(project.status)}
                textColor={WHITE}
              />
            </View>
          </View>

          <View style={{ flex: 1, marginBottom: 5 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.darkBlue}>Description</Text>
            </View>
            <View>
              <Text>{project.description}</Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Text style={styles.darkBlue}>Duration </Text>
              </View>
              <View style={styles.pt}>
                <Text style={{ fontSize: 16 }}>
                  {moment(project.startDate).format('MMMM Do YYYY')} --
{' '}
                  {moment(project.endDate).format('MMMM Do YYYY')}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <View>
                  <Text style={styles.darkBlue}>Budget </Text>
                </View>
                <View style={styles.pt}>
                  <Text style={styles.text}>{formatMoney(project.observationBudget)}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Fragment>
              {project.tags.length === 0 ? null : (
                <View
                  style={{
                    marginTop: 10,
                    flex: 2,
                    flexDirection: 'row',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    {project.tags.map((c, i) => (
                      <Tag key={i} showTag={this.showTag} src={mapNameToTag(c)} />
                    ))}
                  </View>
                  <View />
                </View>
              )}
            </Fragment>
          </View>
          <TagDisplay showTag={this.showTag} visibility={showTag} imageSource={src} />

          <View style={{ paddingTop: 5 }}>
            {project && project.documents && project.documents.length !== 0 ? (
              <Fragment>
                <View>
                  <Text style={{ color: '#696F74' }}> Additional Documents </Text>
                </View>
                <PdfBox />
              </Fragment>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

OverView.defaultProps = {};

OverView.propTypes = {};
