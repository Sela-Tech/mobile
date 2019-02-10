import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BarChart, Grid, ProgressCircle, PieChart } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import { Circle, G, Text, Line } from 'react-native-svg'
import TextN from '../../../components/Text';

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
    fontSize: 15,
  },
  viewStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewStyle2: {
    paddingTop: 10,
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  chartHeight: {
    height: height / 4,
  },
  buttomText: {
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },
});

const dataPie = [
  {
    key: 1,
    amount: 50,
    value: '',
    svg: { fill: '#600080' },
  },
  {
    key: 2,
    amount: 50,
    value: '',
    svg: { fill: '#9900cc' }
  },
  {
    key: 3,
    amount: 40,
    value: '',
    svg: { fill: '#c61aff' }
  },
  {
    key: 4,
    amount: 95,
    value: '',
    svg: { fill: '#d966ff' }
  },
  {
    key: 5,
    amount: 35,
    value: '',
    svg: { fill: '#ecb3ff' }
  }
];

const fill = '#F2994A';
const data = [50, 10, 40, 95, 85, 0, 35, 53, 24, 50];
const Labelss = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    return (
      <Text
        key={index}
        fill={'black'}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={'1.3rem'}
        y={'-0.5rem'}
      >
        {dataPie.amount}
        {/* {totalAmount} */}
        <Text y={'0.7rem'} fontSize={'0.7rem'}>
          Moments
            </Text>
      </Text>
    );
  });
};

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    return (
      <Text
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill={'white'}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={24}
        stroke={'black'}
        strokeWidth={0.2}
      >
        {data.amount}
      </Text>
    )
  })
}



const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

const pieData = data
  .filter(value => value > 0)
  .map((value, index) => ({
    value,
    svg: { fill: randomColor() },
    key: `pie-${index}`,
  }))


// const Labels = ({ slices, height, width }) => {
//   return slices.map((slice, index) => {
//     const { labelCentroid, pieCentroid, data } = slice;
//     return (
//       <Text
//         key={index}
//         x={pieCentroid[0]}
//         y={pieCentroid[1]}
//         fill={'white'}
//         textAnchor={'middle'}
//         alignmentBaseline={'middle'}
//         fontSize={24}
//         stroke={'black'}
//         strokeWidth={0.2}
//       >
//         {dataPie.amount}
//       </Text>
//     )
//   })
// }

function totalClicks(arr, type) {
  return arr.reduce((total, obj) => {
    if (typeof obj[type] === 'string') {
      return total + Number(obj[type]);
    }
    return total + obj[type];
  }, 0);
}

let totalAmount = totalClicks(dataPie, 'amount');


const Box = ({ upText, secondTextLeft, secondTextRight, lastText }) => (
  <View style={styles.container}>
    <View style={styles.viewStyle2}>
      <TextN style={styles.text}>
        {upText}
        {' '}
      </TextN>
    </View>
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <View style={{ justifyContent: 'center', paddingTop: 10, flex: 1 }}>
        <TextN
          style={[
            styles.text,
            {
              fontSize: 30,
              fontWeight: '500',
              color: '#201D41',
            },
          ]}
        >
          {secondTextLeft}
        </TextN>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <TextN
          style={[
            styles.text,
            {
              color: '#369C05',
              fontSize: 14,
            },
          ]}
        >
          {secondTextRight}
        </TextN>
      </View>
    </View>
    <View style={styles.viewStyle}>
      {upText === 'Progress' || upText === 'Budget used' ? (
        <ProgressCircle style={styles.chartHeight} progress={0.7} progressColor="#F2994A" />
      ) : (
          <PieChart
            style={{ height: 200 }}
            valueAccessor={({ item }) => item.amount}
            data={dataPie}
            spacing={0}
            outerRadius={'95%'}
          >
            <Labels />
          </PieChart>

        )}
    </View>
    <Fragment>
      {lastText ? (
        <View style={styles.buttomText}>
          <TextN style={styles.text}> {lastText} </TextN>
        </View>
      ) : null}
    </Fragment>
  </View>
);

Box.defaultProps = {};

Box.propTypes = {};

export default Box;


{/* <BarChart style={styles.chartHeight} data={data} svg={{ fill }} contentInset={{}}>
            <Grid />
          </BarChart> */}