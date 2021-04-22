import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  I18nManager,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import Loader from '../../components/Loader';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import { TextRegular, TextThin, TextMedium, TextSemiBold } from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from '../Auth/LinkButton';
import Sizes from '../../utility/Sizes';
import Color from '../../utility/Color';
import ChangeLanguage from '../Auth/ChangeLanguage';
import { useSelector, useDispatch } from 'react-redux';
import HTML from "react-native-render-html";
import SuccessModal from './SuccessModal';

const OfferDetail = ({ route, navigation }) => {
  const { offer } = route.params;
  const dispatch = useDispatch();
  console.log("offer", offer);
  const isRtl = useSelector((state) => state.isRtl);
  const isSuccess = useSelector((state) => state.isSuccess);
  const align = isRtl ? "right" : "left";
  const expired = new Date(offer.expiry_date) < new Date();

  const redeemOffer = () => {
    let obj = {
      "offer_id": offer.id,
      "points": offer.points
    }
    dispatch(Actions.redeemOffer(obj));
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <SuccessModal visible={isSuccess} points={offer.points} /> */}
      <Header title={offer?.offer_name} dashboard={false} back={true} help={true} />
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 10 }}>
        <View style={{ backgroundColor: Colors.white, paddingStart: 5 }}>
          <View style={styles.offercontainer} >
            <View style={styles.imgBox}>
              <Image source={Images.iphone} style={{ height: 70, width: 70 }}
                resizeMode="contain"></Image>
            </View>
            <View style={styles.secondSection}>
              <TextMedium
                text={offer?.product_name}
                style={{ textAlign: align, fontSize: Sizes.medium, color: Color.text }}
              />
              <TextSemiBold
                text={offer?.offer_name}
                style={{ textAlign: align, fontSize: Sizes.large, marginTop: 10, color: Color.text }}
              />
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TextMedium
                  text={"On " + offer.points + " Points"}
                  style={{ textAlign: align, fontSize: Sizes.medium, marginTop: 5, color: Color.semiGold }}
                />
                <Image source={Images.star} style={{ height: 15, width: 15, alignSelf: 'center', tintColor: Color.semiGold }}
                  resizeMode="contain"></Image>
              </View>
            </View>
          </View>
          <TextMedium text={"Description"}
            style={{ textAlign: align, fontSize: Sizes.medium, color: Color.text }}
          />
          <HTML source={{ html: offer?.description }} contentWidth={Constant.width} />
          <View style={styles.btnLine}>
            <TextThin
              text={"Ends on: " + offer.expiry_date} style={[styles.date, { textAlign: !isRtl ? "right" : "left", }]} />
            <TouchableOpacity style={[styles.redeem, { backgroundColor: Color.theme, }]}
              onPress={redeemOffer}>
              <TextRegular text={I18n.t('redeemnow')}
                style={{ color: Color.white, fontSize: Sizes.medium }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OfferDetail;


const styles = StyleSheet.create({
  btnLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },
  descText: {
    fontSize: Sizes.medium,
    color: Color.text, marginTop: 10
  },
  secondSection: {
    flex: 1, height: "100%",
    paddingTop: 5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    fontSize: Sizes.regular,
    color: Color.parrot,
    marginEnd: 5
  },
  offercontainer: {
    backgroundColor: Color.white,
    // height: 120,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 20,
    shadowColor: Color.bgGray
  },
  imgBox: {
    height: 70, width: 100,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  redeem: {
    height: 30, width: 120,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 3,
    alignSelf: "flex-end"
  }
})