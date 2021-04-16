import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, Image
  , Button
} from 'react-native';
import Header from '../../components/Header';
import { TextBold, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
import styles from '../../utility/Style';
import Imagess from '../../utility/Image';
import { useSelector, useDispatch } from 'react-redux';
import SliderImg from '../../components/SliderImg';
import i18n from '../../services/i18n';
import Sizes from "../../utility/Sizes"

import PointsContainer from '../../components/PointsContainer';
import RewardPointlayout from '../../components/RewardPointlayout';
import PointsWonLayout from '../../components/PointsWonLayout';
import QRCodeContainer from '../../components/QRCodeContainer';
import Winnerlayout from '../../components/Winnerlayout';
import RewardLayout from '../../components/RewardLayout';
import FeedbackLayout from '../../components/FeedbackLayout';
import OfferLayout from '../../components/OfferLayout';
import RecipeLayout from '../../components/RecipeLayout';
import * as Actions from '../../redux/action';

import SuccessModal from './SuccessModal';
import { connect } from 'react-redux'
import OtpScreen from '../Auth/Otp';
import LandingScreen from '../Auth/Landing';
import Profilemain from './Profilemain';
// import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../../navigation/navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class MyReward extends React.Component {


  render() {
    return (
      <View style={[styles.containerDashboard, { backgroundColor: "#F1FFF2" }]}>

        <Header title={'My Reward'} dashboard={false} back={true} />
        <RewardPointlayout />

        <QRCodeContainer />
        <View style={{ backgroundColor: "#fff", flex: 1, margin: 10 }}>

          <View style={{ backgroundColor: "#fff", flexDirection: 'row', height: 60, alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>

              <TextRegular text={i18n.t('EarnedWon')} />

              <View style={{ height: 3, backgroundColor: "#135338", width: 100, marginTop: 10 }}></View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>

              <TextRegular text={i18n.t('redeem')} />
              <View style={{ height: 3, backgroundColor: "#135338", width: 100, marginTop: 10 }}></View>
            </View>


          </View>
          <View style={{ height: 0.3, backgroundColor: "#6AB8B8B8", width: "100%", opacity: 50 }}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <PointsWonLayout />
            <PointsWonLayout />

          </View>


        </View>

      </View>
    );
  }
};



export default MyReward