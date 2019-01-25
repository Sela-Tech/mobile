import React from 'react';
import { createAppContainer } from 'react-navigation';
import { RootStackNavigator } from './Navigator';


export default class AuthenticatedUserNavigator extends React.Component {

    render() {
        console.log('fjfjfj')
        const Nav = createAppContainer(RootStackNavigator);
        return (
            <RootStackNavigator />
        )
    }
}

// );
