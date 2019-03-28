import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import NavigationService from '../../services/NavigationService';
import ProposalContent from '../../components/Project/ProposalContent';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Spinner from '../../components/Spinner';
import { WHITE } from '../../utils/constants';
import { getProposalsBelongingToAProject } from '../../utils/api';

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
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default class Proposals extends Component {
  state = {
    loading: true,
    proposals: [],
  };

  async componentDidMount() {
    try {
      const resp = await getProposalsBelongingToAProject(this.props.project._id);
      this.setState({ loading: false, proposals: resp.data.proposals });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }

  render() {
    const { proposals, loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (proposals.length === 0) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>No active Proposal </Text>
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
    return (
      <View>
        {proposals &&
          proposals.map((c, index) => (
            <ProposalContent
              key={index}
              // projectName=""
              totalMileStone={c.totalMilestones}
              totalTask={c.totalTasks}
              cost={c.totalBudget}
              hide
            />
          ))}
      </View>
    );
  }
}
