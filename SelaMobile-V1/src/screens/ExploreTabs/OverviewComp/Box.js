import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, processColor } from 'react-native';

import { Text } from 'react-native-svg';
import PureChart from 'react-native-pure-chart';
import TextN from '../../../components/Text';
import { YELLOW } from '../../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 4,
    // borderRadius: 5.5,
    // borderWidth: 2,
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
  chart: {
    // flex: 1,
    height: 300,
    width: width - width / 8,
  },
});

const fill = '#F2994A';
const data = [50, 10, 40, 95, 85, 0, 35, 53, 24, 50];

export default class Box extends Component {
  constructor() {
    super();

    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
      legend: {
        enabled: true,
        textSize: 10,
        form: 'CIRCLE',

        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [
              { value: 45, label: 'Evaluation Teams' },
              { value: 21, label: 'Contractor' },
              { value: 21, label: 'Supplies' },
            ],
            label: 'Pie dataset',
            config: {
              colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C')],
              valueTextSize: 9,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              // xValuePosition: "OUTSIDE_SLICE",
              // yValuePosition: "OUTSIDE_SLICE",
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      highlights: [{ x: 2 }],
      description: {
        text: 'Monthly spend by category',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
    };
  }

  handleSelect(event) {
    const entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    const { upText, secondTextLeft, secondTextRight, lastText } = this.props;

    const piedata = [
      {
        key: 1,
        amount: 750,
        svg: { fill: 'blue' },
      },
      {
        key: 2,
        amount: 500,
        svg: { fill: '#990' },
      },
      {
        key: 3,
        amount: 400,
        svg: { fill: '#c61aff' },
      },
      {
        key: 4,
        amount: 950,
        svg: { fill: '#d96' },
      },
      {
        key: 5,
        amount: 350,
        svg: { fill: 'red' },
      },
    ];

    const randomColor = () =>
      `#${((Math.random() * 0xffffff) << 0).toString(16)}000000`.slice(0, 7);

    const pieData = piedata
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));

    const Labels = ({ slices, height, width }) =>
      slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={24}
            stroke="black"
            strokeWidth={0.2}
          >
            $ {data.amount}
          </Text>
        );
      });

    const sampleData = [
      {
        seriesName: 'series1',
        data: [
          { x: '0', y: 0 },
          { x: '0.5', y: 0.046 },
          { x: '1.0', y: 0.054 },
          { x: '1.5', y: 0.103 },
          { x: '2.0', y: 0.1555 },
          { x: '2.5', y: 0.165 },
          { x: '3.0', y: 0.208 },
          { x: '3.5', y: 0.246 },
        ],
        color: '#F2994A',
      },
    ];

    const sampleData2 = [
      {
        value: 500,
        label: 'Payment for evlauation agent',
        color: YELLOW,
      },
      {
        value: 400,
        label: 'Miscellaneous expenses',
        color: 'blue',
      },
      {
        value: 325,
        label: 'Support',
        color: 'green',
      },
    ];

    const databar = [
      { x: '1', y: 300 },
      { x: '2', y: 150 },
      { x: '3', y: 120 },
      { x: '4', y: 230 },
      { x: '7', y: 600 },
      { x: '8', y: 190 },
      { x: '10', y: 930 },
      { x: '9', y: 60 },
    ];
    if (upText === 'Tasks Completed') {
      return (
        <View style={{ marginVertical: 10 }}>
          <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TextN style={{ textAlign: 'center', color: '#0A2C56' }}>
              Calibration curve of absorbance against concentration of total petroleum hydrocarbons
              @420nm
            </TextN>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View
              style={{
                flex: 1,
                marginTop: 5,
                justifyContent: 'center',
              }}
            >
              <TextN
                style={{
                  flexWrap: 'wrap',
                  transform: [{ rotate: '-90deg' }],
                  color: '#0A2C56',
                }}
              >
                Absorbance
              </TextN>
            </View>
            <View style={{ flex: 4, marginLeft: '-9%' }}>
              <PureChart data={sampleData} type="line" />
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 5, justifyContent: 'center' }}>
            <TextN style={{ color: '#0A2C56' }}> Concentration (mg/l) </TextN>
          </View>
        </View>
      );
    }
    if (upText === 'Progress') {
      return (
        <View style={styles.container}>
          <PureChart data={databar} type="bar" />
        </View>
      );
    }
    if (upText === 'Total funds spent') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginBottom: 5 }}>
            <TextN style={{ fontSize: 20 }}> Transactions</TextN>
          </View>

          <PureChart data={sampleData2} type="pie" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}
          source={require('../../../../assets/charts/Bar_Chart.png')}
        />
      </View>
    );
  }
}

Box.defaultProps = {};

Box.propTypes = {};
