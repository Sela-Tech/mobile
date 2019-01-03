import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { Header, Left, Icon, Body, Title, Container, Button, Right } from 'native-base';
import NavigationService from '../services/NavigationService';
import { WHITE } from '../utils/constants';


const HeaderB = ({ headerName, sideIconStatus, sideIconImage }) => (
    <Header
        style={{ backgroundColor: WHITE }}
        androidStatusBarColor={"#E5E5E5"}
    >
        <Left style={{ flex: 1 }} />
        <Body style={{ alignItems: 'center', flex: 1 }}>
            <Title style={{ color: "#201D41" }}>{headerName}</Title>
        </Body>


        <Right style={{ flex: 1 }}>
            {
                sideIconStatus ? (
                    <Button style={{ backgroundColor: WHITE }} onPress={() => NavigationService.navigate("Notification")}>
                        <Image source={sideIconImage} />
                    </Button>)
                    : null
            }
        </Right>
    </Header>

);

export default HeaderB;