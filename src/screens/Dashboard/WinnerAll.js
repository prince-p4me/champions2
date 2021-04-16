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
import QRCodeContainer from '../../components/QRCodeContainer';
import Winnerlayout from '../../components/Winnerlayout';
import RewardLayout from '../../components/RewardLayout';
import FeedbackLayout from '../../components/FeedbackLayout';
import OfferLayout from '../../components/OfferLayout';
import RecipeLayout from '../../components/RecipeLayout';
import Winnerlayoutfull from '../../components/Winnerlayoutfull';
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

class OfferAll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: ""
    }
     
}

   

  render() {
    let { visible, list } = this.props;
    let { points } = this.state;
    return (
      <View style={styles.containerDashboard}>

        <Header title={'All Winners'} dashboard={false}back={true} />

        {(list && list.length) ? <SliderImg slideImgs={list} /> : <View />}

        <Winnerlayoutfull />
          <Winnerlayoutfull />
          <Winnerlayoutfull />

          <Winnerlayoutfull />
          <Winnerlayoutfull />

        </View>
    );
  }
};


const mapStateToProps = (state) => ({
  list: state.getBanners,
  visible: state.isSuccess
})

const mapDispatchToProps = (dispatch) => {
  return {
    scanQr: (data) => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferAll)