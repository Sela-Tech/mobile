import React, { Fragment } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../Text';
import OverView from './OverView';
import Analytics from '../../screens/ExploreTabs/Overview';
import Transactions from '../../screens/ExploreTabs/Transactions';
import Updates from '../../screens/ExploreTabs/Updates';
import Stakeholders from '../../screens/ExploreTabs/StakeHolders';
import ExtStyle from '../../utils/styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  expandableBox: {
    // flex: 1,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 20,
    // backgroundColor: 'blue',

    // flexDirection: 'row',
    borderColor: '#ddd',
    shadowColor: '#ddd',
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 },
    elevation: 3,
  },
  center: {
    // width: '100%',
    // flex: 1,
    // backgroundColor: 'red',
    // height: 65,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  other: {
    // marginTop: 10,
    // height: 900,
    // width: '100%',
    // flex: 1,
    // height: 500,
    // backgroundColor: 'red',
  },
  other2: {
    // flex: 1,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {},
  textInExpandable: {
    color: '#3D4851',
    fontSize: 16,
  },
  viewInExpandable: {
    flex: 7,
    // marginLeft: 10,
  },
});

export const renderView = (name, project, navigation) => {
  switch (name) {
    case 'Analytics':
      return <Analytics project={project} />;
    case 'Overview':
      return (
        <OverView
          locationDetails={project.location}
          projectLocationText={project.location.name}
          projectStatusText={project.status}
          projectTitleText={project.name}
          budgetAmount={project.goal}
          numberOfStakeholders={project.stakeholders.length}
          raisedAmount={project.raised}
          tags={project.tags}
        />
      );

    case 'Transactions':
      return <Transactions project={project} />;

    case 'Updates':
      return <Updates project={project} />;
    case 'Stakeholders':
      return <Stakeholders project={project} navigation={navigation} />;

    case 'Proposals':
      return <Stakeholders project={project} navigation={navigation} />;

    default:
      return <Updates project={project} />;
  }
};

const ExpandableBox = ({ expand, projectInfo, fn, text }) => (
  <View style={[styles.expandableBox, !expand ? styles.center : styles.other]}>
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <View
        style={
          !expand
            ? {
                height: 65,
                width: '100%',
              }
            : {
                height: 65,
                justifyContent: 'center',
                alignItems: 'center',
              }
        }
      >
        <TouchableOpacity
          onPress={fn}
          style={
            !expand
              ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                }
              : styles.other2
          }
        >
          <View style={styles.viewInExpandable}>
            <Text style={styles.textInExpandable}>
{text}
{' '}
 </Text>
          </View>
          <View style={[ExtStyle.flex1, { alignItems: 'flex-end' }]}>
            <Image
              source={
                expand ? require('../../../assets/down.png') : require('../../../assets/upper.png')
              }
            />
          </View>
        </TouchableOpacity>
        <Fragment>
          {!expand ? (
            <View
              style={{
                height: 1,
                backgroundColor: '#b1bad2',
              }}
            />
          ) : null}
        </Fragment>
      </View>
      {<View>{expand ? null : <Fragment>{renderView(text, projectInfo)}</Fragment>}</View>}
    </View>
  </View>
);
export default ExpandableBox;
