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


const MileStoneHeader = ({ newVal, mileStoneTitle, updateInput }) => (
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
                        <Fragment>
                            <View style={ExtStyle.flex1}>
                                <Text style={styles.mileStoneHeadingText}> 1</Text>
                            </View>
                            <View style={ExtStyle.flex6}>
                                <Text style={styles.mileStoneHeadingText}> {mileStoneTitle}</Text>
                            </View>
                        </Fragment>
                        <View style={styles.textAmountView}>
                            <Text style={styles.textAmount}> $200,000 </Text>
                        </View>
                    </View>
                )
        }
    </View>
);

export default class AddProposals extends Component {

    state = {
        propopalName: '',
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
        // const data = {
        //     name: taskName,
        //     description: taskDesription,
        //     dueDate: taskDueDate,
        //     projectId,
        //     estimatedCost: taskEstimatedCost,
        // };
        // console.log('data', data);


        const data = {
            "name": "wewew",
            "description": "eewew",
            "dueDate": "232323",
            "projectId": "5c6ac53bb4378e0022880150",
            "estimatedCost": "2322"
        }

        try {
            this.setState({ loading: true });
            const resp = await createTask(data);
            milestones.push(resp.data.task);
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
        const { contractorId, comments, propopalName, projectId } = this.state;

        const data = {
            comments: comments,
            projectId,
            contractor: contractorId,
            proposal_name: propopalName,
        };
        try {
            const resp = await createProposal(data);
            console.log(' proposal,resp.data', resp.data)
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
            const resp = await createMileStone(data);

            const pushMilestones = milestones.reduce((a, b, i) => {
                let aa = [];
                if (b._id === markedTask[i]) {
                    a.push(b)
                }
                return a;
            }, []);
            const milestoneObj = {
                name: mileStoneTitle,
                tasks: pushMilestones,
            };

            allMileStones.push(milestoneObj);
            console.log('fkdkfd', allMileStones);

            this.setState({ loading: false, allMileStones, milestones: [] });

        }
        catch (err) {
            console.log('ther ', err.message)
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
            console.log('djjdfd', val)
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
                                                                mileStoneTitle={val.name}
                                                                updateInput={this.updateInput}
                                                            />

                                                            <Fragment>
                                                                {
                                                                    val.tasks.map(c => {

                                                                        {/* console.log('c,,c', c) */ }
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
