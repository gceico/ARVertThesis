import React, { useState, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { connect } from "react-redux";
import { getVisitsList } from "../actions/visitsActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import { settingsBG } from "../Assets";
import Layout from "../constants/Layout";
import Loader from "../components/Loader";
import PureChart from 'react-native-pure-chart';
import ContainerStyles from "../styles/ContainerStyles";

function AdStatisticsScreen (props) {
  const sexData = [
    {
      seriesName: 'Male',
      data: [
        { x: '< 18', y: 0 },
        { x: '18 - 28', y: 0 },
        { x: '29 - 40', y: 0 },
        { x: '41 - 60', y: 0 },
        { x: '> 60', y: 0 },
      ],
      color: '#3fa7e1'
    },
    {
      seriesName: 'Female',
      data: [
        { x: '< 18', y: 0 },
        { x: '18 - 24', y: 0 },
        { x: '24 - 30', y: 0 },
        { x: '31 - 40', y: 0 },
        { x: '41 - 60', y: 0 },
        { x: '> 60', y: 0 },
      ],
      color: '#dd3f07'
    },
  ];
  const monthlyData = [
    { x: 'January', y: 0 },
    { x: 'February', y: 0 },
    { x: 'March', y: 0 },
    { x: 'April', y: 0 },
    { x: 'May', y: 0 },
    { x: 'June', y: 0 },
    { x: 'July', y: 0 },
    { x: 'August', y: 0 },
    { x: 'September', y: 0 },
    { x: 'October', y: 0 },
    { x: 'November', y: 0 },
    { x: 'December', y: 0 },
  ];
  const citiesData = [
    {
      seriesName: 'Cities',
      data: [
        { x: 'Iasi', y: 0 },
        { x: 'Cluj', y: 0 },
        { x: 'Bucuresti', y: 0 },
        { x: 'Timisoara', y: 0 },
        { x: 'Suceava', y: 0 },
      ],
      color: '#297AB1'
    },
  ];
  const [chart, setChart] = useState({
    total: 0,
    sexData: sexData,
    monthlyData: monthlyData,
    citiesData: citiesData,
    loaded: props.visitedAd === props.adId
  });
  useEffect(() => {
    if (props.visitsList && !chart.loaded) {
      let totalLocal = props.visitsList.length;
      let sexLocal = sexData;
      let monthlyLocal = monthlyData;
      let citiesLocal = citiesData;

      for (let i = 0; i < props.visitsList.length; i++) {
        const month = props.visitsList[i].data.VisitedAt;
        const age = parseInt(props.visitsList[i].data.User.Age, 10);
        const gender = props.visitsList[i].data.User.Gender;
        const origin = props.visitsList[i].data.User.Origin;
        switch (month) {
          case 'January':
            monthlyLocal[0].y++;
            break;
          case 'February':
            monthlyLocal[1].y++;
            break;
          case 'March':
            monthlyLocal[2].y++;
            break;
          case 'April':
            monthlyLocal[3].y++;
            break;
          case 'May':
            monthlyLocal[4].y++;
            break;
          case 'June':
            monthlyLocal[5].y++;
            break;
          case 'July':
            monthlyLocal[6].y++;
            break;
          case 'August':
            monthlyLocal[7].y++;
            break;
          case 'September':
            monthlyLocal[8].y++;
            break;
          case 'October':
            monthlyLocal[9].y++;
            break;
          case 'November':
            monthlyLocal[10].y++;
            break;
          case 'December':
            monthlyLocal[11].y++;
            break;
          default:
            break;
        }
        if (age < 18) {
          if (gender === 'Male') {
            sexLocal[0].data[0].y++;
          } else if (gender === 'Female') {
            sexLocal[1].data[0].y++;
          }
        }
        if (age > 18 && age < 28) {
          if (gender === 'Male') {
            sexLocal[0].data[1].y++;
          } else if (gender === 'Female') {
            sexLocal[1].data[1].y++;
          }
        }
        if (age > 29 && age < 40) {
          if (gender === 'Male') {
            sexLocal[0].data[2].y++;
          } else if (gender === 'Female') {
            sexLocal[1].data[2].y++;
          }
        }
        if (age > 41 && age < 60) {
          if (gender === 'Male') {
            sexLocal[0].data[3].y++;
          } else if (gender === 'Female') {
            sexLocal[1].data[3].y++;
          }
        }
        if (age > 60) {
          if (gender === 'Male') {
            sexLocal[0].data[4].y++;
          } else if (gender === 'Female') {
            sexLocal[1].data[4].y++;
          }
        }
        switch (origin) {
          case 'Iasi':
            citiesLocal[0].data[0].y++;
            break;
          case 'Cluj':
            citiesLocal[0].data[1].y++;
            break;
          case 'Bucuresti':
            citiesLocal[0].data[2].y++;
            break;
          case 'Timisoara':
            citiesLocal[0].data[3].y++;
            break;
          case 'Suceava':
            citiesLocal[0].data[4].y++;
            break;
          default:
            break;
        }
      }
      setChart({
        total: totalLocal,
        sexData: sexLocal,
        monthlyData: monthlyLocal,
        citiesData: citiesLocal,
        loaded: true
      })
    } else if (props.adId && props.visitsList === undefined) {
      props.getVisitsList({ ad: props.adId });
    }
  });

  if (!props.loading) {
    return (
      <ImageBackground source={settingsBG} resizeMode={'stretch'} style={styles.background}>
        <View style={[styles.container]}>
          {_renderStatsIntro(props, chart.total)}
          <ScrollView style={[ContainerStyles.container, styles.locationsList]}>
            <ChartView title={'Sex/Age'} type={'bar'} data={chart.sexData}/>
            <ChartView title={'Number of views'} type={'line'} data={chart.monthlyData}/>
            <ChartView title={'Origin'} type={'bar'} data={chart.citiesData} style={{ marginBottom: 16 }}/>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <Loader/>
    )
  }
}

function ChartView (props) {
  return (
    <View style={styles.chart}>
      <Text style={styles.title}>{props.title}</Text>
      <PureChart data={props.data}
                 type={props.type}
                 width={'100%'}
      />
    </View>
  )
}

function _renderStatsIntro (props, total) {
  return (
    <View style={[styles.inlineHeader]}>
      <View>
        <Text style={[TextStyles.headerSecondary, styles.header]}>Stats</Text>
        <Text style={[TextStyles.caption, styles.caption]}>{props.ad.Name} – <Text>Views: {total}</Text></Text>
      </View>
    </View>
  )
}

export const AdStatisticsScreenWithRedux = connect(state => ({
  ...state.visitsReducer,
  ...state.adReducer,
  ...state.locationReducer
}), {
  getVisitsList
})(AdStatisticsScreen);

AdStatisticsScreenWithRedux.navigationOptions = {
  header: null,
  headerMode: 'none',
};

const styles = StyleSheet.create({
  chart: {
    marginTop: 32,
  },
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: Colors.black80,
    marginBottom: 16,
    marginLeft: 16,
  },
  container: {
    flex: 1,
  },
  inlineHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  background: {
    flex: 1,
  },
  header: {
    marginLeft: 16,
    marginTop: 32,
    color: Colors.white
  },
  subHeader: {
    marginLeft: 16,
    marginTop: 16
  },
  caption: {
    marginLeft: 16,
    marginTop: 8,
    textAlign: 'left',
    color: Colors.white
  },

  locationsList: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.white,
    marginTop: 16
  },

  buttonGroup: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 16,
  },
  roundContainer: {
    marginRight: 16
  },
  analytics: {
    backgroundColor: Colors.white,
    borderWidth: 0
  },
  trash: {
    backgroundColor: Colors.white,
    borderWidth: 0
  },
  locationPhoto: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 24
  },
  locationPhotoDetails: {
    width: Layout.window.width - 148,
    marginLeft: 16
  },
  locationPhotoValuesGroup: {
    marginTop: 24,
    flexDirection: 'row'
  },
  locationPhotoValues: {
    marginRight: 32,
    // alignItems: 'center',
    // flexDirection: 'row'
  },
  photoCaption: {
    color: Colors.white,
    textAlign: 'left'
  },
  saveButton: {
    position: 'absolute',
    bottom: 8,
    left: 16
  },
  onColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});
