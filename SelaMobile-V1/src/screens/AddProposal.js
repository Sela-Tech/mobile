import React, { Component, Fragment } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Tabs, Tab } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProposalContent from '../components/AddProposal/ProposalContent';
import AddTaskModal from '../components/AddProposal/AddTaskModal';
import Header from '../components/Header';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import ExtStyle from '../utils/styles';

import { createTask, createMileStone, createProposal } from '../utils/api';


import { WHITE, YELLOW } from '../utils/constants';
import NavigationService from '../services/NavigationService';

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
    inputStyle: {
        width: '100%',
        borderWidth: null,
        borderBottomWidth: 2,
        borderRadius: 0,
        borderBottomColor: '#DDDDDD',
    },
});


const MileStoneHeader = ({ newVal, mileStoneTitle, updateInput, index, totalAmount }) => (
    <View style={[ExtStyle.row, styles.pv10]}>
        {
            newVal ?
                (
                    <View style={ExtStyle.flex1}>
                        <Input
                            value={mileStoneTitle}
                            style={styles.inputStyle}
                            onChangeTheText={mileStoneTitle => updateInput(mileStoneTitle, 'mileStoneTitle')}
                            text="Enter Milestone name"
                            placeHolderColor="#201D41"
                        />
                    </View>
                ) : (
                    <View style={[ExtStyle.flex1, ExtStyle.row]}>
                        <View style={[ExtStyle.flex4, ExtStyle.row]}>
                            <View>
                                <Text style={styles.mileStoneHeadingText}>{index + 1})</Text>
                            </View>
                            <View >
                                <Text style={styles.mileStoneHeadingText}>  {mileStoneTitle}</Text>
                            </View>
                        </View>
                        <View style={styles.textAmountView}>
                            <Text style={styles.textAmount}> ${totalAmount} </Text>
                        </View>
                    </View>
                )
        }
    </View>
);

export default class AddProposals extends Component {

    state = {
        propopalName: 'd',
        new: true,
        mileStoneTitle: '',
        // projectId: this.props.navigation.state.params.projectId,
        // contractorId: this.props.navigation.state.params.userId,
        projectId: '5c6ac53bb4378e0022880150',
        contractorId: '5c6ac11ab4378e002288014c',
        modalVisibility: false,
        milestones: [],
        allMileStones: [],
        taskName: '',
        taskDesription: '',
        taskEstimatedCost: '',
        taskDueDate: '',
        loading: false,
        markedTask: [],
        comments: [],
    }


    showModal = () => this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }));



    createSingleTask = async () => {

        const {
            taskName,
            taskDesription,
            taskEstimatedCost,
            taskDueDate,
            projectId,
            milestones,
        } = this.state;
        const data = {
            name: taskName,
            description: taskDesription,
            dueDate: taskDueDate,
            projectId,
            estimatedCost: taskEstimatedCost,
            deadline: taskDueDate,
            amount: taskEstimatedCost,
            id: Math.floor((Math.random() * 1000000) + 1),
        };
        // console.log('data', data);


        // const data = {
        //     "name": "wewew",
        //     "description": "eewew",
        //     "dueDate": "232323",
        //     "projectId": "5c6ac53bb4378e0022880150",
        //     "estimatedCost": "2322",
        //     deadline: "232323",
        //     amount: "2322",
        //     id: Math.floor((Math.random() * 1000000) + 1),
        // }

        try {
            this.setState({ loading: true });
            // const resp = await createTask(data);
            milestones.push(data);
            this.setState(prevState => ({
                modalVisibility: !prevState.modalVisibility,
                taskName: '',
                taskDesription: '',
                taskEstimatedCost: '',
                taskDueDate: '',
                milestones,
                loading: false,
            }));
        }
        catch (err) {
            console.log('errere', err.message);
            this.setState({ mileStoneError: err.message, loading: false });
        }

    };



    sendProposal = async () => {
        const { contractorId, allMileStones, comments, propopalName, projectId } = this.state;
        if (allMileStones.length === 0) {
            return alert('Add milestones first');
        }


        const data = {
            comments,
            projectId,
            contractor: contractorId,
            proposal_name: propopalName,
            milestones: allMileStones,
        };
        console.log('data', data);
        try {
            const resp = await createProposal(data);
            NavigationService.navigate('Project')
        }
        catch (err) {
            this.setState({ proposalError: err.message })
        }
    };




    createTheMileStone = async () => {
        const { markedTask, projectId, loading, allMileStones, mileStoneTitle, milestones } = this.state;
        const data = {
            title: mileStoneTitle,
            tasks: markedTask,
            projectId,
        }
        // console.log('data sending', data);
        if (mileStoneTitle === '') {
            return alert('Enter milestone name');
        }
        if (markedTask.length === 0) {
            return alert('You forgot to add task to this milestone');
        }
        try {
            this.setState({ loading: true });
            // const resp = await createMileStone(data);

            const pushMilestones = milestones.reduce((a, b, i) => {
                let aa = [];
                if (b.id === markedTask[i]) {
                    a.push(b)
                }
                return a;
            }, []);
            const milestoneObj = {
                name: mileStoneTitle,
                tasks: pushMilestones,
            };

            allMileStones.push(milestoneObj);

            this.setState({ mileStoneTitle: '', loading: false, markedTask: [], allMileStones, milestones: [] });

        }
        catch (err) {
            this.setState({ loading: false, mileStoneError: err.message })
        }
    };

    //Write this function again
    updateInput = (val, name) => {
        if (name === 'name') {
            this.setState({
                taskName: val,
            });
        }

        else if (name === 'description') {
            this.setState({
                taskDesription: val,
            });
        }

        else if (name === 'estimatedCost') {
            this.setState({
                taskEstimatedCost: val,
            });
        }

        else if (name === 'mileStoneTitle') {
            this.setState({
                mileStoneTitle: val,
            });
        }

        else {
            this.setState({
                taskDueDate: val,
            });
        }
    };

    markTask = id => {
        let { markedTask } = this.state;
        if (!!markedTask.includes(id)) {
            markedTask = markedTask.filter(b => b !== id);
            this.setState({ markedTask });
        }
        else {
            markedTask.push(id);
            this.setState({ markedTask });
        }
    };

    render() {
        const { modalVisibility,
            projectId,
            taskName,
            taskDesription,
            taskEstimatedCost,
            taskProjectId,
            taskDueDate,
            milestones,
            loading,
            mileStoneTitle,
            markedTask,
            allMileStones,
        } = this.state;

        const taskData = {
            taskName,
            taskDesription,
            taskEstimatedCost,
            taskProjectId,
            taskDueDate,
        };
        const { navigation } = this.props;
        return (
            <KeyboardAwareScrollView
                // innerRef={ref => {
                //   this.scroll = ref;
                // }}
                // resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled
            >
                <Header
                    complete
                    rightText="Send"
                    bodyText="Proposal"
                    navigation={navigation}
                    headerRightFunction={this.sendProposal}
                />


                <Tabs
                    tabBarUnderlineStyle={{ backgroundColor: '#201D41' }}>
                    <Tab
                        heading="Tasks and milestones"
                        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                        activeTextStyle={{ color: '#fff', fontSize: 14 }}
                        activeTabStyle={{ backgroundColor: '#201D41' }}
                        tabStyle={{ backgroundColor: '#FFFFFF' }}
                    >
                        <ScrollView style={styles.container2}
                            contentContainerStyle={ExtStyle.flexGrow}
                        >
                            <View style={styles.mt5}>
                                <Button
                                    style={styles.upButton}
                                    text="Create milestone"
                                    fn={this.createTheMileStone}
                                    loading={loading}
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
                                {
                                    milestones.length === 0 ? null : (
                                        <Fragment>
                                            <View style={styles.pv10}>
                                                <MileStoneHeader
                                                    newVal
                                                    mileStoneTitle={mileStoneTitle}
                                                    updateInput={this.updateInput}
                                                />
                                                {
                                                    milestones.map(c => (
                                                        <ProposalContent
                                                            key={c._id}
                                                            markTask={this.markTask}
                                                            data={c}
                                                            markedTask={markedTask}
                                                        />
                                                    ))
                                                }
                                            </View>
                                        </Fragment>
                                    )
                                }
                            </View>

                            <View>
                                {
                                    allMileStones.length === 0 ? null : (
                                        <Fragment>
                                            <View style={styles.pv10}>
                                                {
                                                    allMileStones.map((val, index) => (
                                                        <Fragment key={index}>
                                                            <MileStoneHeader
                                                                index={index}
                                                                mileStoneTitle={val.name}
                                                                totalAmount={val.tasks.reduce((acc, val) => acc + val.estimatedCost, 0)}
                                                                updateInput={this.updateInput}
                                                            />

                                                            <Fragment>
                                                                {
                                                                    val.tasks.map(c => {
                                                                        return (
                                                                            <ProposalContent
                                                                                key={c._id}
                                                                                markTask={console.log()}
                                                                                data={c}
                                                                                markedTask={[]}
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </Fragment>
                                                        </Fragment>
                                                    ))
                                                }
                                            </View>
                                        </Fragment>
                                    )
                                }
                            </View>


                            <AddTaskModal
                                visibility={modalVisibility}
                                toggleModal={this.showModal}
                                taskData={taskData}
                                updateInput={this.updateInput}
                                createTask={this.createSingleTask}
                                loading={loading}
                            />
                        </ScrollView>
                    </Tab>
                </Tabs>

            </KeyboardAwareScrollView>
        )
    }
};
