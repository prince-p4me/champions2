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

  checkProps = () => {
    if (this.props.route.params && this.props.route.params.data) {
      let {data} = this.props.route.params;
      console.log('scan data', data);
      console.log('executing data');
      data = data.split(',');
      console.log('scan data array', data);
      let obj = {qr_id: data[0], points: data[1]};
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
      // alert(language);
      this.props.getBanners();
    }
  };

  TokenBox = () => {
    let {token, list, language} = this.props;
    return (
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
        maxLength={10}
      />
    );
  };

  updateLanguage = language => {
    setTimeout(() => {
      I18n.locale = language;
      // forceUpdate();
    }, 100);
  };

  render() {
    let {offerDetail, list, isSuccess, language} = this.props;
    let {points} = this.state;
    this.updateLanguage(language);
    return (
      <View style={styles.containerDashboard}>
        <SuccessModal
          visible={isSuccess}
          points={points}
          offerDetail={offerDetail}
        />
        <Header title={'Home'} dashboard={true} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {list && list.length ? <SliderImg slideImgs={list} /> : <View />}
          <Winnerlayout />
          <View style={{height: 20}} />
          {/* {this.TokenBox()} */}
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
  offerDetail: state.getOfferDetail,
  language: state.getLanguage,
});

const mapDispatchToProps = dispatch => {
  return {
    scanQr: data => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
