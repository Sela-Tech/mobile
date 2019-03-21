import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import NavigationService from '../../services/NavigationService';
import IndUpdates from '../../components/ExploreProject/Updates';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { WHITE } from '../../utils/constants';
import ExtStyles from '../../utils/styles';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    marginTop: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width / 2,
  },
});

const Updates = ({ project, userRole, requests }) => {
  if (requests && requests.length === 0) {
    return (
      <View style={ExtStyles.center}>
        <Text> You haven't been assigned any task </Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Fragment>
        {requests &&
          requests.map((c, index) => (
            <IndUpdates
              allData={c}
              userRole={userRole}
              key={index}
              text={c.text}
              projectName={project.name}
              title={c.level === 'project' ? c.title : c.task.name}
              statusText={c.status}
              dataType={c.datatype}
            />
          ))}
      </Fragment>
    </ScrollView>
  );
};

export default Updates;
