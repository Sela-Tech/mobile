import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Text from '../../components/Text';
import B from '../../components/BoldText';
import UserProfile from '../../components/UserProfile';
import Button from '../../components/Button';
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
});

export default class StakeHolders extends Component {
  render() {
    const project = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 10 }}>
          <View>
            <B color={YELLOW}>INITIATED BY</B>
          </View>
          <Fragment>
            {
              project.stakeholders.length === 0 ?
                (
                  <View style={{ height: height / 7, justifyContent: 'center' }}>
                    <Text> No StakeHolders at the moment </Text>
                  </View>
                ) :
                (
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
                )
            }
          </Fragment>
        </View>
        <View>
          <View>
            <B color={YELLOW}>CONTRACTOR</B>
          </View>
          <View style={{ flex: 1 }}>
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
          </View>
        </View>

        <View>
          <View>
            <B color={YELLOW}>EVALUATION AGENTS</B>
          </View>
          <View style={{ flex: 1 }}>
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
          </View>
        </View>
        <View>
          <View>
            <B color={YELLOW}>FUNDERS</B>
          </View>
          <View style={{ flex: 1 }}>
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <UserProfile
              userId={"5c4edbe8e7c1380022277653"}
              imgSource={require('../../../assets/person.png')}
              userName="Hawa Mohammed"
              companyName="Markers LTD"
            />
            <Text style={styles.textColor}> See more </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={{ color: '#201D41' }}> View updates</Text>
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
            <Image source={require('../../../assets/forward-arrow.png')} />
          </View>
        </View>

        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Button text="INVEST" />
        </View>
      </ScrollView>
    );
  }
}
