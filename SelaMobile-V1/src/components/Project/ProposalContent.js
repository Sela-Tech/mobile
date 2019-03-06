import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../Text';
import Button from '../Button';
import { YELLOW, WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';
import NavigationService from '../../services/NavigationService';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: height / 8,
        marginLeft: 5,
        // backgroundColor: 'red',
        borderBottomWidth: 2,
        borderBottomColor: '#F5F5F8',
        alignItems: 'center',
    },
    yellowText: {
        color: YELLOW,
        fontSize: 14,
    },
    detailsTex: {
        fontSize: 12,
        color: '#696F74',
    },
    titleText: {
        color: '#201D41',
        fontSize: 14,
    },
});

const ProposalContent = () => (
    <View style={styles.container}>
        <View style={ExtStyle.flex2}>
            <View>
                <Text style={styles.titleText}> Owerri Oil Spill Clean-up Project </Text>
            </View>
            <View>
                <Text> 12 Milestones, 72 Tasks </Text>
            </View>

            <View>
                <Text style={styles.yellowText}> $150,000 </Text>
            </View>
        </View>

        <View style={ExtStyle.flex1}>
            <Button
                fn={() => NavigationService.navigate('ExploreProject', '5c6ac53bb4378e0022880150')}
                text="View"
                textStyle={{
                    color: '#201D41',
                    fontSize: 14,
                    fontWeight: '400',
                }}
                textSize={14}
                style={{
                    backgroundColor: WHITE,
                    width: width / 4,
                    height: height / 15,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#B1BAD2',
                }}
            />
        </View>
    </View>
);

export default ProposalContent;
