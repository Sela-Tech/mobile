import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Tabs, Tab } from 'native-base';
import ProposalContent from '../components/AddProposal/ProposalContent';
import AddTaskModal from '../components/AddProposal/AddTaskModal';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import ExtStyle from '../utils/styles';


import { WHITE, YELLOW } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
    },
    container2: {
        flex: 1,
        paddingHorizontal: 10,
    },
    upButton: {
        width: width / 3,
        backgroundColor: '#201D41',
    },
    upButtonText: {
        color: WHITE,
    },
    mt5: {
        marginTop: '5%',
    },
    newTaskButton: {
        width: width / 1.05,
        height: height / 12,
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B1BAD2',
        borderStyle: 'dotted',
    },
    newTaskButtonTextStyle: {
        color: YELLOW,
        fontSize: 15,
    },
    mileStoneHeadingText: {
        color: '#201D41',
        fontSize: 16,
    },
    textAmount: {
        color: YELLOW,
    },
    textAmountView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    pv10: {
        paddingVertical: 10,
    },
});


const MileStoneHeader = () => (
    <View style={[ExtStyle.row, styles.pv10]}>
        <View style={[ExtStyle.flex1, ExtStyle.row]}>
            <View style={ExtStyle.flex1}>
                <Text style={styles.mileStoneHeadingText}> 1</Text>
            </View>
            <View style={ExtStyle.flex6}>
                <Text style={styles.mileStoneHeadingText}>  Milestone 1</Text>
            </View>
        </View>
        <View style={styles.textAmountView}>
            <Text style={styles.textAmount}> $200,000 </Text>
        </View>
    </View>
);

export default class AddProposals extends Component {
    state = {
        new: true,
        modalVisibility: false,
    }

    showModal = () => this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }));

    createTask = () => {
        this.setState({
            modalVisibility: !this.state.modalVisibility
        })
        // this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }))
    };

    render() {

        const { modalVisibility } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    complete
                    rightText="Send"
                    bodyText="Proposal"
                />


                <Tabs
                    tabBarUnderlineStyle={{
                        backgroundColor: '#201D41',
                    }}
                >
                    <Tab
                        heading="Tasks and milestones"
                        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                        activeTextStyle={{ color: '#fff', fontSize: 14 }}
                        activeTabStyle={{
                            backgroundColor: '#201D41',
                        }}
                        tabStyle={{ backgroundColor: '#FFFFFF' }}
                    >
                        <ScrollView style={styles.container2}
                            contentContainerStyle={ExtStyle.flexGrow}
                        >
                            <View style={styles.mt5}>
                                <Button
                                    style={styles.upButton}
                                    text="Create milestone"
                                    textStyle={styles.upButtonText}
                                />
                            </View>
                            <View style={styles.mt5}>
                                <Button
                                    includeImage
                                    imageSource={require('../../assets/yellow_plus.png')}
                                    text="New task"
                                    style={styles.newTaskButton}
                                    textStyle={styles.newTaskButtonTextStyle}
                                    fn={() => this.showModal()}
                                />

                            </View>

                            <View>
                                <View style={styles.pv10}>
                                    <MileStoneHeader />
                                    <ProposalContent />
                                    <ProposalContent />
                                </View>



                                <View style={styles.pv10}>
                                    <MileStoneHeader />
                                    <ProposalContent />
                                    <ProposalContent />
                                    <ProposalContent />
                                    <ProposalContent />
                                </View>
                            </View>
                            <AddTaskModal
                                visibility={modalVisibility}
                                toggleModal={this.showModal}
                                createTask={this.createTask}
                            />
                        </ScrollView>
                    </Tab>
                </Tabs>

            </View>
        )
    }
};

