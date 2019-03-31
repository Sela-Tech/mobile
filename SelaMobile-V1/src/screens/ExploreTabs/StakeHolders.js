import React, { Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Text from '../../components/Text';
import B from '../../components/BoldText';
import UserProfile from '../../components/UserProfile';
import { YELLOW } from '../../utils/constants';

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

  const projectOwnerName =
    project.owner.fullName ||
    `${project && project.owner && project.owner.firstName} ${project &&
      project.owner &&
      project.owner.lastName}`;

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
              imgSource={{ uri: project.owner.profilePhoto || 'https://placehold.it/200' }}
              userName={projectOwnerName}
              companyName={
                project &&
                project.owner &&
                project.owner.organization &&
                project.owner.organization.name
              }
            />
          </View>
        </Fragment>
      </View>
      <View>
        <View>
          <B color={YELLOW}>CONTRACTORS</B>
        </View>
        <Fragment>
          {(contractors && contractors.length === 0) || contractors === undefined ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}>No Contractors at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {contractors &&
                contractors.map((c, index) => (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    userDetails={c}
                    imgSource={{ uri: c.user.information.profilePhoto }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={
                      c &&
                      c.user &&
                      c.user.information &&
                      c.user.information.organization &&
                      c.user.information.organization.name
                    }
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
          {(evaluators && evaluators.length === 0) || evaluators === undefined ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}> No Evaluation agent at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {evaluators &&
                evaluators.map((c, index) => (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    userDetails={c}
                    imgSource={{ uri: c.user.information.profilePhoto }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={
                      c &&
                      c.user &&
                      c.user.information &&
                      c.user.information.organization &&
                      c.user.information.organization.name
                    }
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
          {(funders && funders.length === 0) || funders === undefined ? (
            <View style={{ height: height / 7, justifyContent: 'center' }}>
              <Text style={styles.emptyPersonText}> No Funders at the moment </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {funders &&
                funders.map((c, index) => (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    userDetails={c}
                    imgSource={{ uri: c.user.information.profilePhoto }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={
                      c &&
                      c.user &&
                      c.user.information &&
                      c.user.information.organization &&
                      c.user.information.organization.name
                    }
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
