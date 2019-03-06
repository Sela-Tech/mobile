import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#696F74',
    },
});

const AddTaskModal = ({
    visibility,
    toggleModal,
    createTask,
}) => (
        <View>
            <Modal isVisible={visibility}>

                <Button
                    fn={createTask()}
                    text="Update Task"
                    style={styles.buttonStyle} />
            </Modal>
        </View>
    );

export default AddTaskModal;