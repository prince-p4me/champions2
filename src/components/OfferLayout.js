import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { TextMedium, TextBold, TextRegular, TextThin } from './TextView';
import Color from '../utility/Color'
import Images from '../utility/Image'
import Sizes from "../utility/Sizes"
import I18n from '../services/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../navigation/navigation';
import { Icon } from 'react-native-elements'

const OfferLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";

  return (
    <View>
      <View style={styles.title}>
        <TextBold
          text={I18n.t('alloffer')}
          style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
        />
        <TouchableOpacity onPress={() => Navigation.navigate('OfferAll')}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
              size={30} />
          </View>
        </TouchableOpacity>
      </View>
      {
        [1, 2, 3, 4, 5].map((value, index) => (
          <View style={styles.offercontainer} key={index}>
            <View style={styles.imgBox}>
              <Image source={Images.iphone} style={{ height: 70, width: 70 }}
                resizeMode="contain"></Image>
            </View>
            <View style={styles.secondSection}>
              <TextThin
                text="Ends on 15 April 2021" style={[styles.date, { textAlign: !isRtl ? "right" : "left", }]} />
              <TextThin
                text={"Product Name " + (index + 1)}
                style={{ textAlign: align, fontSize: Sizes.regular, }}
              />
              <TextMedium
                text="Offer's Name"
                style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10, color: Color.text }}
              />
              <View style={{ flexDirection: 'row', }}>
                <TextRegular
                  text="On 10 Points"
                  style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5, color: Color.semiGold }}
                />
                <Image source={Images.star} style={{ height: 15, width: 15, alignSelf: 'center', tintColor: Color.semiGold }}
                  resizeMode="contain"></Image>
              </View>
              <TouchableOpacity style={[styles.redeem, { backgroundColor: Color.theme, }]}
                onPress={() => Navigation.navigate("OfferDetail", { name: ("Product Name " + (index + 1)) })}>
                <TextRegular text={I18n.t('redeemnow')}
                  style={{ color: Color.white, fontSize: Sizes.medium }} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      }
    </View>
  );
};

export default OfferLayout;

const styles = StyleSheet.create({
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
    marginVertical: 5,
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