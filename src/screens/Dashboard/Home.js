import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {
  TextBold,
  TextRegular,
  TextSemiBold,
  TextThin,
} from '../../components/TextView';
import styles from '../../utility/Style';
import Imagess from '../../utility/Image';
import SliderImg from '../../components/SliderImg';
import I18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';

import PointsContainer from '../../components/PointsContainer';
import QRCodeContainer from '../../components/QRCodeContainer';
import Winnerlayout from '../../components/Winnerlayout';
import RewardLayout from '../../components/RewardLayout';
import FeedbackLayout from '../../components/FeedbackLayout';
import OfferLayout from '../../components/OfferLayout';
import RecipeLayout from '../../components/RecipeLayout';
import * as Actions from '../../redux/action';

import SuccessModal from './SuccessModal';
import { connect } from 'react-redux';
import OtpScreen from '../Auth/Otp';
import LandingScreen from '../Auth/Landing';
import Profilemain from './Profilemain';
// import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../../navigation/navigation';
import ReviewLayout from '../../components/ReviewLayout';

import Geolocation from '@react-native-community/geolocation';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestLocationAccuracy,
} from 'react-native-permissions';
import MenuContainer from '../../components/MenuContainer';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: '',
      latitude: '',
      longitude: '',
    };
    this.props.navigation.addListener('focus', () => {
      // do something
      console.log('rendered again and checking the props');
      this.checkProps();
    });
  }

  async componentDidMount() {
    const granted = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    );
    if (granted) {
      this.getLocationPermissions();
    } else {
      Alert.alert("Alert !", 'Permission Not Granted.');
    }
  }

  getLocationPermissions() {
    Geolocation.getCurrentPosition(info => {
      this.setState(
        {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
        () => {
          console.log({ state: this.state });
        },
      );
    });
  }

  checkProps = () => {
    if (this.props.route.params && this.props.route.params.data) {
      let { data } = this.props.route.params;
      console.log('scan data', data);
      console.log('executing data');
      data = data.split(',');
      console.log('scan data array', data);
      let obj = { qr_id: data[0], points: data[1] };
      this.setState(
        {
          points: obj.points,
        },
        () => {
          this.props.scanQr(obj);
        },
      );
    } else {
      this.props.getBanners();
    }
  };

  render() {
    let { visible, list } = this.props;
    let { points } = this.state;
    // const isSuccess = useSelector(state => state.isSuccess);

    return (
      <View style={styles.containerDashboard}>
        {/* <SuccessModal visible={isSuccess} points={offer.points} /> */}
        <Header title={'Home'} dashboard={true} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {list && list.length ? <SliderImg slideImgs={list} /> : <View />}
          <Winnerlayout />
          <PointsContainer />
          <QRCodeContainer />

          <MenuContainer />
          <OfferLayout />
          <RecipeLayout horizontal={true} />
          <ReviewLayout />
          <View style={{ height: 50 }}></View>
        </ScrollView>
        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  list: state.getBanners,
  visible: state.isSuccess,
  isRtl: state.isRtl,
});

const mapDispatchToProps = dispatch => {
  return {
    scanQr: data => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
