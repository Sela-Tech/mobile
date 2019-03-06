import React, { Fragment, Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, processColor } from 'react-native';
import { PieChart, BarChart, Grid, ProgressCircle } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import { Circle, G, Line } from 'react-native-svg';
import TextN from '../../../components/Text';
import StakeHolders from '../StakeHolders';
import { YELLOW } from '../../../utils/constants';
import DropdownAlert from 'react-native-dropdownalert';
import NavigationService from '../../../services/NavigationService';

import { NavigationActions } from 'react-navigation';

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
  container2: {
    height: height / 1.4,
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

// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
// }

// const ddata = [
//   { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//   { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//   { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//   { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//   { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
// ]

// const dataPie = [
//   {
//     key: 1,
//     amount: 50,
//     value: '',
//     svg: { fill: '#600080' },
//   },
//   {
//     key: 2,
//     amount: 50,
//     value: '',
//     svg: { fill: '#9900cc' }
//   },
//   {
//     key: 3,
//     amount: 40,
//     value: '',
//     svg: { fill: '#c61aff' }
//   },
//   {
//     key: 4,
//     amount: 95,
//     value: '',
//     svg: { fill: '#d966ff' }
//   },
//   {
//     key: 5,
//     amount: 35,
//     value: '',
//     svg: { fill: '#ecb3ff' }
//   }
// ];

// const fill = '#F2994A';
// const datas = [50, 10, 40, 95, 85, 0, 35, 53, 24, 50];
// const Labelss = ({ slices, height, width }) => {
//   return slices.map((slice, index) => {
//     const { labelCentroid, pieCentroid, data } = slice;
//     return (
//       <Text
//         key={index}
//         fill={'black'}
//         textAnchor={'middle'}
//         alignmentBaseline={'middle'}
//         fontSize={'1.3rem'}
//         y={'-0.5rem'}
//       >
//         {dataPie.amount}
//         {/* {totalAmount} */}
//         <Text y={'0.7rem'} fontSize={'0.7rem'}>
//           Moments
//             </Text>
//       </Text>
//     );
//   });
// };

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
//         {data.amount}
//       </Text>
//     )
//   })
// }

// const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

// const pieData = datas
//   .filter(value => value > 0)
//   .map((value, index) => ({
//     value,
//     svg: { fill: randomColor() },
//     key: `pie-${index}`,
//   }))

// // const Labels = ({ slices, height, width }) => {
// //   return slices.map((slice, index) => {
// //     const { labelCentroid, pieCentroid, data } = slice;
// //     return (
// //       <Text
// //         key={index}
// //         x={pieCentroid[0]}
// //         y={pieCentroid[1]}
// //         fill={'white'}
// //         textAnchor={'middle'}
// //         alignmentBaseline={'middle'}
// //         fontSize={24}
// //         stroke={'black'}
// //         strokeWidth={0.2}
// //       >
// //         {dataPie.amount}
// //       </Text>
// //     )
// //   })
// // }

// function totalClicks(arr, type) {
//   return arr.reduce((total, obj) => {
//     if (typeof obj[type] === 'string') {
//       return total + Number(obj[type]);
//     }
//     return total + obj[type];
//   }, 0);
// }

// let totalAmount = totalClicks(dataPie, 'amount');

// const Box = ({ upText, secondTextLeft, secondTextRight, lastText }) => (

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
    const { show, upText, secondTextLeft, secondTextRight, navigation, lastText } = this.props;
    // const { labelWidth, selectedSlice } = this.state;
    // const { label, value } = selectedSlice;
    // const keys = ['Evaluation team', 'Contractor payout', 'Supplies'];
    // const values = [35, 45, 55];
    // const colors = [YELLOW, '#d966ff', '#29BEE2']
    // const data = keys.map((key, index) => {
    //   return {
    //     key,
    //     value: values[index],
    //     svg: { fill: colors[index] },
    //     arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
    //     onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
    //   }
    // });
    // console.log('data', data)
    // const deviceWidth = Dimensions.get('window').width
    if (upText === 'Tasks Completed') {
      return (
        <TouchableOpacity style={styles.container} onPress={
          () => this.dropdown.alertWithType('info', 'Task Details', 'Check task Screen for more info')
          //   const resetAction = NavigationActions.reset({
          //     index: 0,
          //     actions: [
          //       NavigationActions.navigate({ routeName: 'StakeHolders' })
          //     ]
          //   });
          //   navigation.dispatch(resetAction);
          // }
        }>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            resizeMode="contain"
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/charts/task.png')}
          />
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
        </TouchableOpacity>
      );
    }


    if (upText === 'Progress') {
      return (
        <View style={styles.container}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/charts/progress.png')}
          />
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
        </View>
      );
    }
    if (upText === 'Total Funds Spent') {
      return (
        <TouchableOpacity style={styles.container} onPress={
          () => this.dropdown.alertWithType('info', 'Transaction Details', 'Check Transaction Screen for more info')
          //   const resetAction = NavigationActions.reset({
          //     index: 0,
          //     actions: [
          //       NavigationActions.navigate({ routeName: 'StakeHolders' })
          //     ]
          //   });
          //   navigation.dispatch(resetAction);
          // }
        }>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/charts/pie_chart.png')}
          />
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
        </TouchableOpacity>
      );
    }
    // Community Feedback


    if (upText === 'Community Feedback') {
      return (
        <TouchableOpacity
          onPress={() => show('COMMUNITY')}
          style={styles.container2}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/oil-spill/bar3.png')}
          />

          {/* <View style={{ marginTop: 5 }}> */}
          <Image
            style={{
              paddingTop: 4,
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/oil-spill/bar4.png')}
          />

          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
          {/* </View> */}
        </TouchableOpacity>
      );
    }


    if (upText === 'Changes in TPH Level') {
      return (
        <TouchableOpacity style={styles.container2}
          onPress={() => show('notCOMMUNITY')}
        >
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/oil-spill/bar1.png')}
          />

          {/* <View style={{ marginTop: 5 }}> */}
          <Image
            style={{
              paddingTop: 4,
              flex: 1,
              width: undefined,
              height: undefined,
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: 'contain',
            }}
            // source={require('../../../../assets/charts/Bar_Chart.png')}
            source={require('../../../../assets/oil-spill/bar2.png')}
          />

          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
          {/* </View> */}
        </TouchableOpacity>
      );
    }


    return (
      <View style={[styles.container, { height: height / 1.8 }]}>
        <View>
          <Text> Sample spending on one of the sites </Text>
        </View>
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            // flex: 1,
            // width: null,
            // height: null,
            resizeMode: 'contain',
          }}
          source={require('../../../../assets/oil-spill/bar-budget.png')}
        />
        {/* <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          // startDelta={height}
          // endDelta={height - height / 8}
          closeInterval={6000}
        /> */}
      </View>
    );
  }
}

// );

{
  /* <PieChart
  style={{ height: 200 }}
  valueAccessor={({ item }) => item.amount}
  data={dataPie}
  spacing={0}
  outerRadius={'95%'}
>
  <Labels />
</PieChart> */
}

Box.defaultProps = {};

Box.propTypes = {};

// export default Box;

{
  /* <PieChart
  style={styles.chart}
  logEnabled={true}
  chartBackgroundColor={processColor('#FFFFFF')}
  chartDescription={this.state.description}
  data={this.state.data}
  legend={this.state.legend}
  highlights={this.state.highlights}

  entryLabelColor={processColor('green')}
  entryLabelTextSize={20}
  drawEntryLabels={true}

  rotationEnabled={true}
  rotationAngle={45}
  usePercentValues={true}
  styledCenterText={{ text: '', color: processColor('#FFFFFF'), size: 20 }}
  centerTextRadiusPercent={100}
  holeRadius={40}
  holeColor={processColor('#f0f0f0')}
  transparentCircleRadius={45}
  transparentCircleColor={processColor('#f0f0f088')}
  maxAngle={350}
  onChange={(event) => console.log(event.nativeEvent)}
/> */
}

{
  /* <View>
  <PieChart
    style={{ height: 200 }}
    outerRadius={'80%'}
    innerRadius={'45%'}
    data={data}
  />
  <Text
    onLayout={({ nativeEvent: { layout: { width } } }) => {
      this.setState({ labelWidth: width });
    }}
    style={{
      fontSize: 15,
      position: 'absolute',
      left: 20,
      textAlign: 'center'
    }}>
    {value}
  </Text>
</View> */
}

// <View style={styles.viewStyle2}>
//   <TextN style={styles.text}>
//     {upText}
//     {' '}
//   </TextN>
// </View>
//   <View
//     style={{
//       justifyContent: 'center',
//       paddingHorizontal: 20,
//       flexDirection: 'row',
//       flex: 1,
//     }}
//   >
//     <View style={{ justifyContent: 'center', paddingTop: 10, flex: 1 }}>
//       <TextN
//         style={[
//           styles.text,
//           {
//             fontSize: 30,
//             fontWeight: '500',
//             color: '#201D41',
//           },
//         ]}
//       >
//         {secondTextLeft}
//       </TextN>
//     </View>
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'flex-end',
//       }}
//     >
//       <TextN
//         style={[
//           styles.text,
//           {
//             color: '#369C05',
//             fontSize: 14,
//           },
//         ]}
//       >
//         {secondTextRight}
//       </TextN>
//     </View>
//   </View>
//   <View style={styles.viewStyle}>
//     {upText === 'Progress' || upText === 'Budget used' ? (
//       <ProgressCircle style={styles.chartHeight} progress={0.7} progressColor="#F2994A" />
//     ) : (
//         <BarChart style={styles.chartHeight} data={data} svg={{ fill }} contentInset={{}}>
//           <Grid />
//         </BarChart>
//       )}
//   </View>
//   <Fragment>
//     {lastText ? (
//       <View style={styles.buttomText}>
//         <TextN style={styles.text}> {lastText} </TextN>
//       </View>
//     ) : null}
