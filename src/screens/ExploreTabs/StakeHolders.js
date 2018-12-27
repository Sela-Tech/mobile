import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Text from '../../components/Text';
import B from '../../components/BoldText';
import UserProfile from '../../components/UserProfile';
import Button from '../../components/Button';
import { WHITE, YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        marginHorizontal: 18,
        marginBottom: 15,
    },
    subContainer: {
        flex: 5,
        marginTop: height / 4,
        alignItems: 'center',
    },
    button: {
        width: width / 2,
    },
    textColor: {
        color: '#201D41',
    },
});

export default () => (
    <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
    >
        <View style={{ paddingTop: 10 }}>
            <View>
                <B
                    color={YELLOW}
                >
                    INITIATED BY
                </B>
            </View>
            <View style={{ flex: 1 }}>
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
            </View>
        </View>

        <View>
            <View>
                <B
                    color={YELLOW}
                >
                    CONTRACTOR
                </B>
            </View>
            <View style={{ flex: 1 }}>
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
            </View>
        </View>

        <View>
            <View>
                <B
                    color={YELLOW}
                >
                    EVALUATION AGENTS
                </B>
            </View>
            <View style={{ flex: 1 }}>
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
            </View>
        </View>
        <View>
            <View>
                <B color={YELLOW}>
                    INVESTORS
                </B>
            </View>
            <View style={{ flex: 1 }}>
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
                <Text style={styles.textColor}> See more </Text>
            </View>
        </View>
        <View style={{
            flexDirection: 'row',
            marginVertical: 10,
        }}>
            <View>
                <Text style={{ color: '#201D41' }}>  View updates</Text>
            </View>
            <View
                style={{ justifyContent: 'center', paddingLeft: 10 }}
            >
                <Image
                    source={require('../../../assets/forward-arrow.png')}
                />
            </View>
        </View>

        <View style={{ paddingTop: 10, alignItems: 'center' }}>
            <Button
                text="INVEST"
            />
        </View>
    </ScrollView>
);
