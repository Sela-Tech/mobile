import React, { Fragment } from 'react';
import { TouchableOpacity, ScrollView, View, StyleSheet, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Text from '../Text';
import OverView from './OverView';
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
        shadowOffset: { width: 10, height: 10, },
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
    innerButton: {

    },
    textInExpandable: {
        color: '#3D4851',
        fontSize: 16,
    },
    viewInExpandable: {
        flex: 7,
        // marginLeft: 10,
    },
});

const ExpandableBox = ({ expand, projectInfo, fn, text }) => (
    <View
        style={[styles.expandableBox, !expand ? styles.center : styles.other]}>

        <View style={{
            // backgroundColor: 'red',
            marginHorizontal: 10,
        }}>
            <View style={!expand ? {
                height: 65,
                width: '100%',
                // marginHorizontal: 5,
            } :
                {
                    height: 65,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginHorizontal: 5,
                }}>
                <TouchableOpacity
                    onPress={fn}
                    style={!expand ?
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        } :
                        styles.other2
                    }>
                    <View style={styles.viewInExpandable}>
                        <Text style={styles.textInExpandable}>{text} </Text>
                    </View>
                    <View style={[ExtStyle.flex1, { alignItems: 'flex-end' }]}>
                        <Image
                            source={!!expand ? require('../../../assets/down.png') : require('../../../assets/upper.png')}
                        />
                    </View>
                </TouchableOpacity>
                <Fragment>
                    {
                        !expand ?
                            (
                                <View
                                    style={{
                                        // flex: 1,
                                        // marginHorizontal: 5,
                                        // marginLeft: 20,

                                        // marginHorizontal: 15,
                                        height: 1,
                                        backgroundColor: '#b1bad2',
                                    }}
                                />
                            )
                            : null
                    }
                </Fragment>
            </View>
            {
                <View >
                    {
                        !!expand ? null : (
                            <OverView
                                locationDetails={projectInfo.location}
                                projectLocationText={projectInfo.location.name}
                                projectStatusText={projectInfo.status}
                                projectTitleText={projectInfo.name}
                                budgetAmount={projectInfo.goal}
                                numberOfStakeholders={projectInfo.stakeholders.length}
                                raisedAmount={projectInfo.raised}
                                tags={projectInfo.tags}
                            />
                        )
                    }
                </View>
            }
        </View>
    </View>
);
export default ExpandableBox;
