import React from 'react';
import { Header, Left, Icon, Body, Title,Container,Button,Right } from 'native-base';

const HeaderB = ({ headerName, sideIconStatus, sideIconImage}) => (
    <Container>
        <Header>
            <Body>
                <Title>{headerName}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Right>
        </Header>
    </Container>
);

export default HeaderB;