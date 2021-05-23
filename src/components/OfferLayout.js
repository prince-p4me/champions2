import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { TextMedium, TextBold, TextRegular, TextThin } from './TextView';
import Color from '../utility/Color';
import Images from '../utility/Image';
import Sizes from '../utility/Sizes';
import I18n from '../services/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../navigation/navigation';
import { Icon } from 'react-native-elements';
import Constant from '../utility/Constant';

const OfferLayout = props => {
  const { home } = props;
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const list = useSelector(state => state.getOffers);
  let data = list.filter((obj) => parseInt(obj.redeemed) < 1);
  // let data = list;
  if (home) {
    data = list.slice(0, 4);
  }

  if (data && data.length) {
    console.log("offers found", data);
    return (
      <View style={{ backgroundColor: Color.white }}>
        {(home && data.length) && <View style={styles.title}>
          <TextBold
            text={I18n.t('alloffer')}
            style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
          />
          <TouchableOpacity onPress={() => Navigation.navigate('OfferAll')}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextRegular text={I18n.t('Seeall')} />
              <Icon
                name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>}
        {data.map((item, index) => {
          const expired = new Date(item.expiry_date) < new Date();
          const noBalance = parseInt(item.balance) >= parseInt(item.points);

          // if (parseInt(item.redeemed) < 1)
          //   return (
          <TouchableOpacity
            style={styles.offercontainer}
            key={index}
            onPress={() => {
              console.log({ item10377777: item });

              Navigation.navigate('OfferDetail', { offer: item })

            }}>
            <View style={styles.imgBox}>
              <Image
                source={{ uri: Constant.IMAGE_URL + item.image }}
                style={{ height: 70, width: 70 }}
                resizeMode="contain"></Image>
            </View>
            <View
              style={[
                styles.secondSection,
                !noBalance && { backgroundColor: Color.bgGray },
              ]}>
              <View style={{ width: '100%', alignItems: 'flex-end' }}>
                <TextThin
                  text={'Ends on : ' + item.expiry_date}
                  style={[styles.date, expired && { color: 'red' }]}
                />
              </View>
              <TextThin
                text={item.product_name}
                style={{ fontSize: Sizes.regular }}
              />
              <TextMedium
                text={item.offer_name}
                style={{
                  fontSize: Sizes.semiLarge,
                  marginTop: 10,
                  color: Color.text,
                }}
              />
              <View style={{ flexDirection: 'row' }}>
                <TextRegular
                  text={'On ' + item.points + ' Points'}
                  style={{
                    textAlign: isRtl ? 'left' : 'right',
                    fontSize: Sizes.regular,
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
              <View style={{ width: '100%', alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={[
                    styles.redeem,
                    // !noBalance && {backgroundColor: Color.text},
                  ]}
                  onPress={() => {
                    console.log({ item103: item });
                    Navigation.navigate('OfferDetail', { offer: item })
                  }

                  }>
                  <TextRegular
                    text={I18n.t('redeemnow')}
                    style={{ color: Color.white, fontSize: Sizes.medium }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          // );
        })}
      </View>
    );
  } else {
    return <View />
  }
};

export default OfferLayout;

const styles = StyleSheet.create({
  secondSection: {
    flex: 1,
    height: '100%',
    paddingTop: 5,
    alignItems: 'flex-start',
    paddingStart: 8,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: Color.border,
    elevation: 5,
    backgroundColor: Color.white,
    // height: 120,
    marginHorizontal: 3,
    marginVertical: 5,
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
