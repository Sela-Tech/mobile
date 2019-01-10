import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import B from '../components/BoldText';
import Button from '../components/Button';
import { YELLOW, WHITE } from '../utils/constants';
import { isAndroid } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    // height: 50,
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    flex: 8,
    alignItems: 'center',
    // marginTop: isAndroid ? '25%' : '20%',
  },
  otherContainer: {
    alignItems: 'center',
    margin: 15,
  },
  floatingButton: {
    backgroundColor: YELLOW,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 25,
    flex: 1,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Project extends Component {
  state = {
    userRole: 'constractor', // funder,evaluation-agent,contractor
  }
  render() {
    const { userRole } = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerName="PROJECTS"
          sideIconStatus
          sideIconImage={require('../../assets/emptyBell.png')}
        />
        <View style={styles.subContainer}>
          <View>
            <Image source={require('../../assets/Illustration.png')} />
          </View>
          <View style={styles.otherContainer}>
            {/* <View style={styles.otherContainer}>
            <Text>
              {' '}
              Seems like you havent
              <B>proposed</B>
              {' '}
              or
              <B>been</B>{' '}
            </Text>
            <Text>
              {' '}
              <B> added </B>
              {' '}
              to any projects yet.You can propose a{' '}
            </Text>
            <Text> project using the plus sign or button below or </Text>
            <Text> wait to be added to one </Text>
          </View> */}

            <View style={styles.otherContainer}>
              {
                userRole === 'funder' ?
                  (
                    <Fragment>
                      <Text> You haven't created, funded, or saved any </Text>
                      <Text> projects yet. </Text>
                    </Fragment>
                  ) : userRole === 'contractor' ?
                    (
                      <Fragment>
                        <Text> You haven't propose or been </Text>
                        <Text> added to any projects yet. </Text>
                      </Fragment>
                    ) :
                    (
                      <Fragment>
                        <Text> You haven't evaluated or  </Text>
                        <Text> saved any projects yet. </Text>
                      </Fragment>
                    )
              }

            </View>
            <View>
              <Button
                text="Explore Project"
                color={userRole === 'funder' ? WHITE : YELLOW}
                textColor={userRole === 'funder' ? '#201D41' : WHITE}
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#B1BAD2',
                }}
                fn={() => this.props.navigation.navigate('ProjectListing')}
              />
              <Fragment>
                {
                  userRole === 'funder' ?
                    <View style={{ paddingTop: 15 }}>
                      <Button
                        text="Create new project"
                        color={YELLOW}
                        textColor={WHITE}
                        fn={() => this.props.navigation.navigate('CreateProject')}
                      />
                    </View> : null
                }

              </Fragment>
            </View>
          </View>

          {/* <View style={styles.floatingButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateProject')}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image source={require('../../assets/plus.png')} />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }
}
