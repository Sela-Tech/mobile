import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Text from '../components/Text';
import SingleNotificationText from '../components/Notifications/SingleNotificationText';
import { WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: WHITE,
  },
});

export default class Notifications extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  state = {
    empty: false,
  };

  render() {
    const { empty } = this.state;
    if (empty) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('../../assets/docs.png')} />
          </View>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Text style={{ color: '#201D41' }}> You have not received any </Text>
            <Text style={{ color: '#201D41' }}> notifications yet.</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
       style={styles.container} 
       contentContainerStyle={{ flex: 0 }}>
        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/man1.png')}
          time="1 day ago"
        />

        <SingleNotificationText
          text="Your proposed project “Yenagoa Fish Farm” has been approved and is open for investors."
          imageSRC={require('../../assets/logo_pink.png')}
          time="2 days ago"
        />

        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/woman1.png')}
          time="2 days ago"
        />
        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/man2.png')}
          time="2 days ago"
        />
        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/img/man.png')}
          time="2 days ago"
        />
        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/img/woman.png')}
          time="2 days ago"
        />
        <SingleNotificationText
          text="A new project - 250 Housing Units in Owerri, 
                    Nigeria - has been proposed by Aisha Hammed for 
                    funding. View project"
          imageSRC={require('../../assets/img/man.png')}
          time="2 days ago"
        />
      </ScrollView>
    );
  }
}
