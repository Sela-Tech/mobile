import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class AuthLoading extends Component {
    async componentDidMount() {
        try {
            await this.getKey();
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    getKey = async () => {
        try {
            const key = await  AsyncStorage.getItem('token');
            this.props.navigation.navigate( key ? 'AppHome' : 'AuthHome')
            } 
        catch(err) {
            this.props.navigation.navigate('AuthHome');
        }
     }

    render() {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        );
    }
}

