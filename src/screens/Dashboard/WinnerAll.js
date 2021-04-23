import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, Image
  , FlatList
} from 'react-native';
import Header from '../../components/Header';
import { TextBold, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
import styles from '../../utility/Style';
import { useSelector, useDispatch } from 'react-redux';
import SliderImg from '../../components/SliderImg';
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
import I18n from '../../services/i18n';

const OfferAll = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const list = useSelector((state) => state.getBanners);
  const data = useSelector((state) => state.getWinners);

  return (
    <View style={styles.containerDashboard}>

      <Header title={I18n.t("allwinner")} dashboard={false} back={true} />

      {(list && list.length) ? <SliderImg slideImgs={list} /> : <View />}
      <FlatList data={data}
        contentContainerStyle={{
          flexGrow: 1, alignItems: "center",
          flex: 1
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => <Winnerlayoutfull item={item} />}
      />
    </View>
  );

};

export default OfferAll