import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BarChart, Grid, ProgressCircle } from 'react-native-svg-charts';
import Text from '../../../components/Text';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // height: height / 5,
        borderRadius: 5.5,
        borderWidth: 2,
        borderColor: '#F5F5F8',
        width: width / 1.5,
        marginVertical: 12,
    },
    text: {
        color: '#222829',
        fontSize: 20
    },
    viewStyle: {
        flex: 1,
        paddingLeft: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    viewStyle2: {
        paddingTop: 10,
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        // alignItems: 'center',
    },
});

const fill = '#F2994A';
const data = [50, 10, 40, 95, 85, 0, 35, 53, 24, 50];

const Box = ({
    upText,
    secondTextLeft,
    secondTextRight,
    lastText,
}) => (
        <View style={styles.container}>
            <View style={styles.viewStyle2}>
                <Text style={styles.text}>{upText} </Text>
            </View>
            <View style={{
                justifyContent: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
                flex: 1
            }}>
                <View style={{ justifyContent: 'center', paddingTop: 10, flex: 1 }}>
                    <Text style={[styles.text, {
                        fontSize: 30,
                        fontWeight: "500"
                    }]}>
                        {secondTextLeft} </Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <Text style={[styles.text, {
                        color: '#369C05',
                        fontSize: 14,
                    }]}>
                        {secondTextLeft}
                    </Text>
                </View>
            </View>
            <View style={styles.viewStyle}>
                {
                    upText === "Progress" || upText === "Budget used" ?
                        (
                            <ProgressCircle
                                style={{ height: 150 }}
                                progress={0.7}
                                progressColor={'#F2994A'}
                            />
                        )
                        :
                        (
                            <BarChart
                                style={{ height: 150 }}
                                data={data}
                                svg={{ fill }}
                                contentInset={{}}
                            >
                                <Grid />
                            </BarChart>
                        )
                }

            </View>
            <Fragment>
                {
                    lastText ?
                        <View style={{ alignItems: 'center', marginTop: 5, justifyContent: 'center' }}>
                            <Text>     {lastText} </Text>
                        </View>
                        : null
                }
            </Fragment>
        </View>
    )

Box.defaultProps = {

};

Box.propTypes = {

};

export default Box;