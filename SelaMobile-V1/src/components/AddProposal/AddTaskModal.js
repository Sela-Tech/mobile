import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#B1BAD2',
        width: width / 3,
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,

    },
    bottomButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#3D4851',
        fontSize: 14,
        fontWeight: "400",
    },
    upContainer: {
        flex: 1,
        backgroundColor: '#F5F5F8',
    },
    mv5: {
        marginVertical: 5,
    },
    middleContainer: {
        flex: 4,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    inputStyle: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#DDDDDD',
    },
    centerUpText: {
        flex: 1,
        alignItems: 'center',
    },
    closeButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    addTaskText: {
        color: '#201D41',
        fontSize: 18,
    },
    addTaskView: {
        flex: 2,
        alignItems: 'flex-end',
    },
    otherContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const AddTaskModal = ({
    visibility,
    toggleModal,
    createTask,
    updateInput,
    taskData,
    loading,
}) => {
    const {
        name,
        description,
        estimatedCost,
        dueDate
    } = taskData;
    return (
        <Modal isVisible={visibility}>
            <View style={styles.container}>
                <View style={styles.upContainer}>
                    <View style={styles.otherContainer}>
                        <View style={styles.addTaskView}>
                            <Text style={styles.addTaskText}>Add Task </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => toggleModal()}>
                            <Image
                                source={require('../../../assets/close_icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerUpText}>
                        <Text> Create tasks that reflect phases of work and allow </Text>
                        <Text>   your team to track progress of your project</Text>
                    </View>
                </View>
                <View style={styles.middleContainer}>
                    <View>
                        <View style={styles.mv5}>
                            <Text style={styles.textStyle}>Enter task name </Text>
                        </View>
                        <Input
                            style={styles.inputStyle}
                            onChangeTheText={name => updateInput(name, 'name')}
                            value={name}
                        />
                    </View>

                    <View>
                        <View style={styles.mv5}>
                            <Text style={styles.textStyle}> Add a description of the task </Text>
                        </View>
                        <Input
                            style={[styles.inputStyle, { height: height / 6 }]}
                            multiline
                            onChangeTheText={description => updateInput(description, 'description')}
                            value={description}
                        />
                    </View>


                    <View>
                        <View style={styles.mv5}>
                            <Text style={styles.textStyle}> Enter the estimated cost for this task </Text>
                        </View>
                        <Input
                            numb
                            style={styles.inputStyle}
                            onChangeTheText={estimatedCost => updateInput(estimatedCost, 'estimatedCost')}
                            value={estimatedCost}
                        />
                    </View>


                    <View>
                        <View style={styles.mv5}>
                            <Text style={styles.textStyle}>Set the deadline for the task </Text>
                        </View>
                        <Input
                            style={styles.inputStyle}
                            onChangeTheText={dueDate => updateInput(dueDate, 'dueDate')}
                            value={dueDate}
                        />
                    </View>


                </View>
                <View style={styles.bottomButton}>
                    <Button
                        fn={() => createTask()}
                        text="Update Task"
                        textStyle={{ color: WHITE }}
                        loading={loading}
                        style={styles.buttonStyle} />
                </View>
            </View>
        </Modal>
    )
}

export default AddTaskModal;
