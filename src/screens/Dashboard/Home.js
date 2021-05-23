import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Button,
  SafeAreaView,
  Alert,
  TextInput,
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
import {connect} from 'react-redux';
import OtpScreen from '../Auth/Otp';
import LandingScreen from '../Auth/Landing';
import Profilemain from './Profilemain';
// import { NavigationEvents } from 'react-navigation';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Navigation from '../../navigation/navigation';
import ReviewLayout from '../../components/ReviewLayout';

import {request, PERMISSIONS} from 'react-native-permissions';
import MenuContainer from '../../components/MenuContainer';

import {useSelector, useDispatch} from 'react-redux';

import {store} from '../../redux/store';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: '',
      isSuccess: false,
      soundsList: [],
    };
    this.props.navigation.addListener('focus', () => {
      // do something
      console.log('rendered again and checking the props');
      this.checkProps();
    });
  }

  componentDidMount() {
    // messaging().getInitialNotification(async remoteMessage => {
    //   alert('Kill app');
    //   console.log({remote10233222: remoteMessage?.data});
    //   // alert(JSON.stringify(remoteMessage?.data));
    // });
  }
  getLocationPermissions() {
    Geolocation.getCurrentPosition(info => {
      this.setState(
        {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
        () => {
          console.log({state: this.state});
        },
      );
    });
  }

  checkProps = () => {
    if (this.props.route.params && this.props.route.params.data) {
      let {data} = this.props.route.params;
      console.log('scan data', data);
      console.log('executing data');
      data = data.split(',');
      console.log('scan data array', data);
      let obj = {qr_id: data[0], points: data[1]};

      // let successType = false;
      // if (data.length) {
      //   successType = true;
      // }
      this.setState(
        {
          points: obj.points,
          // isSuccess: successType,
        },
        () => {
          this.props.scanQr(obj);
          // playSampleSound(this.state.soundsList[1]);
          // playSampleSound(this.state.soundsList[1]);
        },
      );
    } else {
      this.props.getBanners();
    }
  };

  render() {
    let {token, list, isSuccess} = this.props;
    let {points} = this.state;
    // let token = store.getState().getFcmToken;
    if (isSuccess) {
      // if (this.state.soundsList && this.state.soundsList.length) {
      setTimeout(() => {
        // playSampleSound(this.state.soundsList[1]);
        // RNLocalNotifications.createNotification(
        //   1,
        //   'Notification',
        //   'notification',
        //   'default',
        // );
      }, 3000);
      // }
    }
    return (
      <View style={styles.containerDashboard}>
        <SuccessModal visible={isSuccess} points={points} />
        <Header title={'Home'} dashboard={true} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {list && list.length ? <SliderImg slideImgs={list} /> : <View />}
          <Winnerlayout />
          <View style={{height: 20}} />
          <TextInput
            multiline={true}
            style={{
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: 10,
              padding: 7,
            }}
            placeholder="token"
            keyboardType="phone-pad"
            value={token}
            maxLength={10}></TextInput>
          <QRCodeContainer />
          <PointsContainer />
          <MenuContainer />
          <OfferLayout home={true} />
          <RecipeLayout horizontal={true} />
          <ReviewLayout />
          <View style={{height: 50}}></View>
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
  isSuccess: state.isSuccess,
  token: state.getFcmToken,
});

const mapDispatchToProps = dispatch => {
  return {
    scanQr: data => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
