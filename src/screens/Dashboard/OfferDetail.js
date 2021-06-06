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
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import I18n from '../../services/i18n';

import {
  TextRegular,
  TextThin,
  TextMedium,
  TextSemiBold,
} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import Color from '../../utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import SuccessModal from './SuccessModal';

const OfferDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const { offerDetail3 } = route.params;
  const user = useSelector(state => state.getUser);
  const offerDetail = useSelector(state => state.getOfferDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    let offer_info = {
      user_id: user.id,
      offer_id: id,
    };

    console.log({ receipeInfo: offer_info });
    if (offer_info?.user_id) {
      dispatch(Actions.getOfferDetail(offer_info));
    }
  }, []);

  const isRtl = useSelector(state => state.isRtl);
  const isSuccess = useSelector(state => state.isSuccess);
  const userData = useSelector(state => state.getPoints);
  const align = isRtl ? 'right' : 'left';
  const expired = new Date(offerDetail.expiry_date) < new Date();
  const noBalance = parseInt(userData.balance) < parseInt(offerDetail.points);

  const redeemOffer = () => {
    let obj = {
      offer_id: offerDetail.id,
      points: offerDetail.points,
    };

    dispatch(Actions.redeemOffer(obj));
    // setTimeout(() => {
    //   dispatch(Actions.offerDetail(offerDetail));
    // }, 400);
    // setSuccess(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <SuccessModal
        visible={isSuccess}
        points={offerDetail.points}
        offerDetail={offerDetail}
        offerDetail2={offerDetail3}
      />

      {/* <SuccessModal visible={true} points={500} offerDetail={offer} /> */}
      <Header
        title={offerDetail?.offer_name}
        dashboard={false}
        back={true}
        help={true}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.backgroundColor,
          padding: 10,
        }}>
        <View style={{ backgroundColor: Colors.white, paddingStart: 5 }}>
          <View style={styles.offercontainer}>
            <View style={styles.imgBox}>
              <Image
                source={{ uri: Constant.IMAGE_URL + offerDetail.image }}
                style={{ height: 70, width: 70 }}
                resizeMode="contain"></Image>
            </View>
            <View style={styles.secondSection}>
              <TextMedium
                text={offerDetail?.product_name}
                style={{
                  textAlign: align,
                  fontSize: Sizes.medium,
                  color: Color.text,
                }}
              />
              <TextSemiBold
                text={offerDetail?.offer_name}
                style={{
                  textAlign: align,
                  fontSize: Sizes.large,
                  marginTop: 10,
                  color: Color.text,
                }}
              />
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TextMedium
                  text={'On ' + offerDetail.points + ' Points'}
                  style={{
                    textAlign: align,
                    fontSize: Sizes.medium,
                    marginTop: 5,
                    color: Color.semiGold,
                  }}
                />
                <Image
                  source={Images.star}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: 'center',
                    tintColor: Color.semiGold,
                  }}
                  resizeMode="contain"></Image>
              </View>
            </View>
          </View>
          <TextMedium
            text={'Description'}
            style={{
              textAlign: align,
              fontSize: Sizes.medium,
              color: Color.text,
            }}
          />
          <HTML
            source={{ html: offerDetail?.description }}
            contentWidth={Constant.width}
          />
          <View style={styles.btnLine}>
            <TextThin
              text={'Ends on: ' + offerDetail.expiry_date}
              style={[styles.date, { textAlign: !isRtl ? 'right' : 'left' }]}
            />
            <TouchableOpacity
              style={[
                styles.redeem,
                noBalance && { backgroundColor: Color.text },
              ]}
              onPress={redeemOffer}
              disabled={noBalance}
            // disabled={expired}
            >
              <TextRegular
                text={I18n.t('redeemnow')}
                style={{ color: Color.white, fontSize: Sizes.medium }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  btnLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  descText: {
    fontSize: Sizes.medium,
    color: Color.text,
    marginTop: 10,
  },
  secondSection: {
    flex: 1,
    height: '100%',
    paddingTop: 5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: Sizes.regular,
    color: Color.parrot,
    marginEnd: 5,
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
    shadowColor: Color.bgGray,
  },
  imgBox: {
    height: 70,
    width: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  redeem: {
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
    backgroundColor: Color.theme,
  },
});
export default OfferDetail;
