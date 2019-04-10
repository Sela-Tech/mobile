import React, { Component, Fragment } from 'react';
import { View, ScrollView, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { Tabs, Tab } from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import DropdownAlert from 'react-native-dropdownalert';
import ProposalContent from '../components/AddProposal/ProposalContent';
import AddTaskModal from '../components/AddProposal/AddTaskModal';
import SpinnerOverLay from '../components/SpinnerOverlay';
import Header from '../components/Header';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';

import ExtStyle from '../utils/styles';

import { createProposal, getAllUsers } from '../utils/api';

import { WHITE, YELLOW } from '../utils/constants';
import NavigationService from '../services/NavigationService';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  multiSelect: {
    // borderColor: '#B1BAD2',
    // width: width / 1.1,
    // borderRadius: 5,
    justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: null,
    borderBottomWidth: 2,
    borderRadius: 0,
    borderBottomColor: '#DDDDDD',
    // borderWidth: 1,
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
    {newVal ? (
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
          <View>
            <Text style={styles.mileStoneHeadingText}> {mileStoneTitle}</Text>
          </View>
        </View>
        <View style={styles.textAmountView}>
          <Text style={styles.textAmount}> ${totalAmount} </Text>
        </View>
      </View>
    )}
  </View>
);

export default class AddProposals extends Component {
  state = {
    propopalName: '',
    contractorName: '',
    new: true,
    mileStoneTitle: '',
    projectId: this.props.navigation.state.params.projectId,
    // contractorId: this.props.navigation.state.params.userId,
    // projectId: '5c6ac53bb4378e0022880150',
    // contractorId: '5c6ac11ab4378e002288014c',
    modalVisibility: false,
    milestones: [],
    users: [],
    allMileStones: [],
    taskName: '',
    taskDesription: '',
    taskEstimatedCost: '',
    taskDueDate: '',
    loading: false,
    submitProposalLoading: false,
    markedTask: [],
    comments: [],
    selectedUsers: [],
  };

  async componentDidMount() {
    try {
      const resp = await getAllUsers();

      // Get only contractors and evaluators
      const users = resp.data
        .filter(c => !c.isFunder)
        .map(c => {
          c.label = c.firstName.concat(' ').concat(c.lastName);
          c.value = c._id;
          return c;
        });

      this.setState({ users });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  showModal = () => this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }));

  createSingleTask = async () => {
    Keyboard.dismiss();
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
      id: Math.floor(Math.random() * 1000000 + 1),
    };

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
    } catch (err) {
      this.setState({ mileStoneError: err.message, loading: false });
    }
  };

  sendProposal = async () => {
    const { selectedUsers, allMileStones, comments, propopalName, projectId } = this.state;
    if (selectedUsers.length === 0) {
      return alert('Add a Contractor');
    }
    if (propopalName === '') {
      return alert('Enter Proposal Name');
    }
    if (allMileStones.length === 0) {
      return alert('Add milestones first');
    }

    const data = {
      comments,
      projectId,
      contractor: selectedUsers[0],
      proposal_name: propopalName,
      milestones: allMileStones,
    };

    try {
      this.setState({ submitProposalLoading: true });
      const resp = await createProposal(data);
      this.setState({ submitProposalLoading: false });
      this.dropdown.alertWithType('success', 'Status', 'Proposal Sent');
      setTimeout(() => NavigationService.navigate('Project'), 3000);
    } catch (err) {
      this.setState({ submitProposalLoading: false, proposalError: err.message });
    }
  };

  createTheMileStone = async () => {
    Keyboard.dismiss();
    const {
      markedTask,
      projectId,
      loading,
      allMileStones,
      mileStoneTitle,
      milestones,
    } = this.state;
    const data = {
      title: mileStoneTitle,
      tasks: markedTask,
      projectId,
    };

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
        const aa = [];
        if (b.id === markedTask[i]) {
          a.push(b);
        }
        return a;
      }, []);
      const milestoneObj = {
        name: mileStoneTitle,
        tasks: pushMilestones,
      };
      allMileStones.push(milestoneObj);
      this.setState({
        mileStoneTitle: '',
        loading: false,
        markedTask: [],
        allMileStones,
        milestones: [],
      });
    } catch (err) {
      this.setState({ loading: false, mileStoneError: err.message });
    }
  };

  // Write this function again
  updateInput = (val, name) => {
    if (name === 'name') {
      this.setState({
        taskName: val,
      });
    } else if (name === 'description') {
      this.setState({
        taskDesription: val,
      });
    } else if (name === 'estimatedCost') {
      this.setState({
        taskEstimatedCost: val,
      });
    } else if (name === 'mileStoneTitle') {
      this.setState({
        mileStoneTitle: val,
      });
    } else if (name === 'propopalName') {
      this.setState({
        propopalName: val,
      });
    } else {
      this.setState({
        taskDueDate: val,
      });
    }
  };

  markTask = id => {
    let { markedTask } = this.state;
    if (markedTask.includes(id)) {
      markedTask = markedTask.filter(b => b !== id);
      this.setState({ markedTask });
    } else {
      markedTask.push(id);
      this.setState({ markedTask });
    }
  };

  onSelectedUsersChange = selectedUsers => this.setState({ selectedUsers });

  render() {
    const {
      modalVisibility,
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
      propopalName,
      contractorName,
      submitProposalLoading,
      // users,
      selectedUsers,
    } = this.state;

    let { users } = this.state;
    users = users.map((c, index) => {
      c.id = c._id;
      c.name = c.firstName.concat(' ').concat(c.lastName);
      return c;
    });

    const taskData = {
      taskName,
      taskDesription,
      taskEstimatedCost,
      taskProjectId,
      taskDueDate,
    };
    const { navigation } = this.props;
    return (
      <ScrollView
        style={ExtStyle.flex1}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.container}
      >
        <Header
          complete
          rightText="Send"
          bodyText="Proposal"
          navigation={navigation}
          headerRightFunction={this.sendProposal}
        />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#201D41' }}>
          <Tab
            heading="Tasks and milestones"
            textStyle={{ color: '#B1BAD2', fontSize: 14 }}
            activeTextStyle={{ color: '#fff', fontSize: 14 }}
            activeTabStyle={{ backgroundColor: '#201D41' }}
            tabStyle={{ backgroundColor: '#FFFFFF' }}
          >
            <ScrollView style={styles.container2} contentContainerStyle={ExtStyle.flexGrow}>
              <SpinnerOverLay loading={submitProposalLoading} />

              <AddTaskModal
                visibility={modalVisibility}
                toggleModal={this.showModal}
                taskData={taskData}
                updateInput={this.updateInput}
                createTask={this.createSingleTask}
                loading={loading}
              />

              <View style={{ marginTop: 10 }}>
                <MultiSelect
                  // hideTags
                  items={users}
                  uniqueKey="id"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  single
                  hideSubmitButton
                  onSelectedItemsChange={this.onSelectedUsersChange}
                  selectedItems={selectedUsers}
                  selectText="Pick Contractors"
                  searchInputPlaceholderText="Search Contractor..."
                  onChangeInput={text => console.log(text)}
                  altFontFamily="Acumin-RPro'"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#B1BAD2"
                  tagTextColor="#CCC"
                  selectedItemTextColor={YELLOW}
                  selectedItemIconColor={YELLOW}
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor={YELLOW}
                  submitButtonText="Submit"
                  styleSelectorContainer={styles.multiSelect}
                  styleMainWrapper={styles.multiSelect}
                  styleInputGroup={styles.multiSelect}
                />
              </View>

              <View style={ExtStyle.mt5}>
                <Input
                  value={propopalName}
                  style={styles.inputStyle}
                  onChangeTheText={propopalName => this.updateInput(propopalName, 'propopalName')}
                  text="Enter Proposal name"
                  placeHolderColor="#201D41"
                />
              </View>

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
                {milestones.length === 0 ? null : (
                  <Fragment>
                    <View style={styles.pv10}>
                      <MileStoneHeader
                        newVal
                        mileStoneTitle={mileStoneTitle}
                        updateInput={this.updateInput}
                      />
                      {milestones.map((c, index) => (
                        <ProposalContent
                          key={index}
                          markTask={this.markTask}
                          data={c}
                          markedTask={markedTask}
                        />
                      ))}
                    </View>
                  </Fragment>
                )}
              </View>

              <View>
                {allMileStones.length === 0 ? null : (
                  <Fragment>
                    <View style={styles.pv10}>
                      {allMileStones.map((val, index) => (
                        <Fragment key={index}>
                          <MileStoneHeader
                            index={index}
                            mileStoneTitle={val.name}
                            totalAmount={val.tasks.reduce((acc, val) => acc + val.estimatedCost, 0)}
                            updateInput={this.updateInput}
                          />

                          <Fragment>
                            {val.tasks.map((c, index) => (
                              <ProposalContent
                                key={index}
                                markTask={console.log()}
                                data={c}
                                markedTask={[]}
                              />
                            ))}
                          </Fragment>
                        </Fragment>
                      ))}
                    </View>
                  </Fragment>
                )}
              </View>
              <DropdownAlert
                ref={ref => (this.dropdown = ref)}
                // startDelta={height}
                // endDelta={height - height / 8}
                closeInterval={6000}
              />
            </ScrollView>
          </Tab>
        </Tabs>
      </ScrollView>
    );
  }
}
