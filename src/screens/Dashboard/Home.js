import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, Image
  , Button,
  SafeAreaView
} from 'react-native';
import Header from '../../components/Header';
import { TextBold, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
import styles from '../../utility/Style';
import Imagess from '../../utility/Image';
import SliderImg from '../../components/SliderImg';
import I18n from '../../services/i18n';
import Sizes from "../../utility/Sizes"

import PointsContainer from '../../components/PointsContainer';
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

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: ""
    }
    this.props.navigation.addListener('focus', () => {
      // do something
      console.log("rendered again and checking the props");
      this.checkProps();
    });
  }

  checkProps = () => {
    if (this.props.route.params && this.props.route.params.data) {
      let { data } = this.props.route.params;
      console.log("scan data", data);
      console.log("executing data");
      data = data.split(",");
      console.log("scan data array", data);
      let obj = { "qr_id": data[0], "points": data[1] };
      this.setState({
        points: obj.points
      }, () => {
        this.props.scanQr(obj)
      })
    } else {
      this.props.getBanners();
    }
  }

  renderStaticData = () => {
    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <TextBold
              text={I18n.t('recipe')}
              style={{ fontSize: Sizes.large, marginLeft: 10 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate('recipeall');
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextRegular text={I18n.t('Seeall')} />
              <Icon
                name='keyboard-arrow-right'
                size={30}
                iconStyle={{}} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          <RecipeLayout />
          <RecipeLayout />
          <RecipeLayout />
          <RecipeLayout />
          <RecipeLayout />
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <TextBold
              text={I18n.t('reviews')}
              style={{ fontSize: Sizes.large, marginLeft: 10 }}
            />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name='keyboard-arrow-right'
              size={30}
              iconStyle={{}} />
          </View>
        </View>
        <ScrollView horizontal={false} >
          <FeedbackLayout />
        </ScrollView>
      </>
    )
  }

  renderWinners = () => {
    const { isRtl } = this.props;
    return (
      <>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TextBold
            text={I18n.t('allwinner')}
            style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
          />
          <TouchableOpacity onPress={() => Navigation.navigate('WinnerAll')}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextRegular text={I18n.t('Seeall')} />
              <Icon size={30}
                name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Winnerlayout />
          <Winnerlayout />
          <Winnerlayout />
          <Winnerlayout />
        </View>
      </>
    )
  }

  render() {
    let { visible, list } = this.props;
    let { points } = this.state;
    return (
      <View style={styles.containerDashboard}>

        <Header title={'Home'} dashboard={true} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {(list && list.length) ? <SliderImg slideImgs={list} /> : <View />}
          <Winnerlayout />
          <QRCodeContainer />
          <PointsContainer />
          <OfferLayout />
          <RecipeLayout horizontal={true} />
          <View style={{ height: 50 }}></View>
        </ScrollView>
        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  list: state.getBanners,
  visible: state.isSuccess,
  isRtl: state.isRtl
})

const mapDispatchToProps = (dispatch) => {
  return {
    scanQr: (data) => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)