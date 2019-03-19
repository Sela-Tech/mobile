import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.flatten({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomButton: {
    view: {
      width: width / 3.5,
      height: height / 15,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  },
});
export default class Proposals extends Component {
  render() {
    const { project, userId } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ marginTop: '10%', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>No active Proposal </Text>
        </View>
        <View style={styles.container}>
          <Button
            fn={() =>
              NavigationService.navigate('AddProposal', {
                projectId: project && project._id,
                userId,
              })
            }
            style={styles.bottomButton.view}
            textStyle={styles.bottomButton.text}
            text="Send Proposal"
            textColor={WHITE}
          />
        </View>
      </View>
    );
  }
}
