import React, { Fragment } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import Text from '../Text';

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    height: height / 15,
    width: width / 3,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B1BAD2',
    paddingLeft: 5,
  },
  textColor: {
    fontSize: 13,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CalendarBox = ({ showCalendar, chooseDate, val }) => (
  <Fragment>
    {!showCalendar ? (
      <TouchableOpacity style={style.innerContainer} onPress={() => openCalender(val)}>
        <View style={style.bottomContainer}>
          <EvilIcons name="calendar" size={25} color="#696F74" />
        </View>
        <View style={{ marginLeft: '1%', flex: 2 }}>
          <View>
            <Text style={[style.textColor, { color: '#B1BAD2' }]}>Last 30 days</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
        <Calendar onDayPress={day => chooseDate(day, val)} />
      )}
  </Fragment>
);

CalendarBox.propTypes = {
  showCalendar: PropTypes.bool,
};

export default CalendarBox;
