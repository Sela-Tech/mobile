import React, { Fragment } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Text from '../../components/Text';
import B from '../../components/BoldText';
import UserProfile from '../../components/UserProfile';
import Button from '../../components/Button';
import { YELLOW } from '../../utils/constants';
import { firstLetterCapital } from '../../utils/helpers';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 15,
  },
  subContainer: {
    flex: 5,
    marginTop: height / 4,
    alignItems: 'center',
  },
  button: {
    width: width / 2,
  },
  textColor: {
    color: '#201D41',
  },
  emptyPersonText: {
    fontSize: 12,
  },
});

const StakeHolders = ({ project, navigation }) => {
  const funders =
    project &&
    project.stakeholders &&
    project.stakeholders.filter(c => c.user.information.isFunder === true);

  const contractors =
    project &&
    project.stakeholders &&
    project.stakeholders.filter(c => c.user.information.isContractor === true);

  const evaluators =
    project &&
    project.stakeholders &&
    project.stakeholders.filter(c => c.user.information.isEvaluator === true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ paddingTop: 10 }}>
        <View>
          <B color={YELLOW}>INITIATED BY</B>
        </View>
        <Fragment>
          <View style={{ flex: 1 }}>
            <UserProfile
              userId={project.owner._id}
              userDetails={project.owner}
              imgSource={{ uri: project.owner.profilePhoto }}
              userName={`${project.owner.firstName} ${project.owner.lastName}`}
              companyName={project.owner.organization.name}
            />
          </View>
        </Fragment>
      </View>
      <View>
        <View>
          <B color={YELLOW}>CONTRACTORS</B>
        </View>
        <Fragment>
          {contractors.length === 0 ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}>No Contractors at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {contractors.map((c, index) => (
                <UserProfile
                  key={index}
                  userId={c.user.information._id}
                  userDetails={c}
                  imgSource={{ uri: c.user.information.profilePhoto }}
                  userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                  companyName={c.user.information.organization.name}
                />
              ))}
            </View>
          )}
        </Fragment>
      </View>

      <View>
        <View>
          <B color={YELLOW}>EVALUATION AGENTS</B>
        </View>
        <Fragment>
          {evaluators.length === 0 ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}> No Evaluation agent at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {evaluators.map((c, index) => (
                <UserProfile
                  key={index}
                  userId={c.user.information._id}
                  userDetails={c}
                  imgSource={{ uri: c.user.information.profilePhoto }}
                  userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                  companyName={c.user.information.organization.name}
                />
              ))}
            </View>
          )}
        </Fragment>
      </View>
      <View>
        <View>
          <B color={YELLOW}>FUNDERS</B>
        </View>
        <Fragment>
          {funders.length === 0 ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}> No Funders at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {funders.map((c, index) => (
                <UserProfile
                  key={index}
                  userId={c.user.information._id}
                  userDetails={c}
                  imgSource={{ uri: c.user.information.profilePhoto }}
                  userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                  companyName={c.user.information.organization.name}
                />
              ))}
            </View>
          )}
        </Fragment>
      </View>
    </ScrollView>
  );
};

export default StakeHolders;
