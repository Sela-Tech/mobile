import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SingularProject from './Project';
import ExtStyle from '../../utils/styles';
import NavigationService from '../../services/NavigationService';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'red',
    },
    buttonCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        backgroundColor: YELLOW,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'flex-end',
        // flex: 1,
        position: 'absolute',
        bottom: 35,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const renderButton = () => (
    <View style={styles.floatingButton}>
        <TouchableOpacity
            onPress={() => NavigationService.navigate('ExploreProject')}
            style={styles.buttonCenter}
        >
            <Image source={require('../../../assets/plus.png')} />
        </TouchableOpacity>
    </View>
)

const ContractorProjects = ({ projects }) => (
    <ScrollView
        contentContainerstyle={styles.container}>
        <View>
            <View style={ExtStyle.flex1}>
                <SingularProject
                    leftText="Initiated by others"
                    // rightText="See all"
                    projects={projects}
                />
            </View>

            <View style={ExtStyle.flex1}>
                <SingularProject
                    leftText="Initiated by you"
                    // rightText="See all"
                    projects={projects}
                />
            </View>

            <View style={ExtStyle.flex1}>
                <SingularProject
                    leftText="Projects that may interest you"
                    // rightText="Edit interest"
                    projects={projects}
                />
            </View>

            <View style={ExtStyle.flex1}>
                <SingularProject
                    leftText="Bookmarks"
                    // rightText="See all"
                    projects={projects}
                />
            </View>
            <View style={ExtStyle.flex1}>{renderButton()}</View>
        </View>
    </ScrollView>
);

export default ContractorProjects;
