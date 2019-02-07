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

const StakeHolders = ({ project, navigation }) => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ paddingTop: 10 }}>
      <View>
        <B color={YELLOW}>INITIATED BY</B>
      </View>
      <Fragment>
        {project.stakeholders.length === 0 ? (
          <View style={{ height: height / 7, justifyContent: 'center' }}>
            <Text style={styles.emptyPersonText}> No StakeHolders at the moment </Text>
          </View>
        ) : (
            <View style={{ flex: 1 }}>
              {project.stakeholders.map((c, index) => {
                let photoLink = c.user.information.profilePhoto;
                if (photoLink === null) {
                  photoLink = 'https://placeimg.com/640/480/any';
                } else if (photoLink === undefined) {
                  photoLink = 'https://placeimg.com/640/480/any';
                }
                return (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    userDetails={c}
                    // imgSource={{ uri: photoLink }}
                    imgSource={require('../../../assets/man1.png')}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={c.user.information.organization.name}
                  />
                );
              })}
            </View>
          )}
      </Fragment>
    </View>
    <View>
      <View>
        <B color={YELLOW}>CONTRACTORS</B>
      </View>
      <Fragment>
        {project.stakeholders.length === 0 ? (
          <View style={{ height: height / 7, justifyContent: 'center' }}>
            <Text style={styles.emptyPersonText}>No Contractors at the moment </Text>
          </View>
        ) : (
            <View style={{ flex: 1 }}>
              {project.stakeholders.map((c, index) => {
                let photoLink = c.user.information.profilePhoto;
                if (photoLink === null) {
                  photoLink = 'https://placeimg.com/640/480/any';
                } else if (photoLink === undefined) {
                  photoLink = 'https://placeimg.com/640/480/any';
                }
                return (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    imgSource={require('../../../assets/man1.png')}
                    userDetails={c}
                    // imgSource={{ uri: photoLink }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={firstLetterCapital(c.user.information.organization.name)}
                  />
                );
              })}
            </View>
          )}
      </Fragment>
    </View>

    <View>
      <View>
        <B color={YELLOW}>EVALUATION AGENTS</B>
      </View>
      <Fragment>
        {project.stakeholders.length === 0 ? (
          <View style={{ height: height / 7, justifyContent: 'center' }}>
            <Text style={styles.emptyPersonText}> No Evaluation agent at the moment </Text>
          </View>
        ) : (
            <View style={{ flex: 1 }}>
              {project.stakeholders.map((c, index) => {
                let photoLink = c.user.information.profilePhoto;
                if (photoLink === null) {
                  photoLink = 'https://placeimg.com/640/480/any';
                } else if (photoLink === undefined) {
                  photoLink = 'https://placeimg.com/640/480/any';
                }
                return (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    imgSource={require('../../../assets/man1.png')}
                    userDetails={c}
                    // imgSource={{ uri: photoLink }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={firstLetterCapital(c.user.information.organization.name)}
                  />
                );
              })}
            </View>
          )}
      </Fragment>
    </View>
    <View>
      <View>
        <B color={YELLOW}>FUNDERS</B>
      </View>
      <Fragment>
        {project.stakeholders.length === 0 ? (
          <View style={{ height: height / 7, justifyContent: 'center' }}>
            <Text style={styles.emptyPersonText}> No Funders at the moment </Text>
          </View>
        ) : (
            <View style={{ flex: 1 }}>
              {project.stakeholders.map((c, index) => {
                let photoLink = c.user.information.profilePhoto;
                if (photoLink === null) {
                  photoLink = 'https://placeimg.com/640/480/any';
                } else if (photoLink === undefined) {
                  photoLink = 'https://placeimg.com/640/480/any';
                }
                return (
                  <UserProfile
                    key={index}
                    userId={c.user.information._id}
                    userDetails={c}
                    imgSource={{ uri: photoLink }}
                    userName={`${c.user.information.firstName} ${c.user.information.lastName}`}
                    companyName={c.user.information.organization.name}
                  />
                );
              })}
            </View>
          )}
      </Fragment>
    </View>
    {/* <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate('UpdatesOrTask')}
    >
      <View>
        <Text style={{ color: '#201D41' }}> View updates</Text>
      </View>
      <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
        <Image source={require('../../../assets/forward-arrow.png')} />
      </View>
    </TouchableOpacity> */}

    <View style={{ paddingTop: 10, alignItems: 'center' }}>
      <Button
        fn={() => NavigationService.navigate('Invest', { name: project.name })} text="INVEST" />
    </View>
  </ScrollView>
);

export default StakeHolders;
