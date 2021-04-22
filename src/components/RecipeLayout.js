import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { TextMedium, TextRegular, TextBold } from './TextView';
import Color from '../utility/Color';
import { Icon } from 'react-native-elements'

import star from '../assets/imgs/star.png';
import Images from '../utility/Image';
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from '../utility/Sizes';
import FullButton from './FullButton';
import About from '../assets/imgs/user.jpeg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import I18n from '../services/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RecipeLayout = () => {
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const data = useSelector(state => state.getPoints);

  return (
    <View>
      <View style={styles.title}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextBold
            text={I18n.t('recipe')}
            style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
          />
          <Icon
            name="star"
            size={20} />
        </View>
        <TouchableOpacity onPress={() => Navigation.navigate('OfferAll')}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
              size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.offercontainer}>
        <View style={{ width: 150 }}>
          <Image
            source={Images.dish}
            style={{
              width: 130,
              height: 120,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            resizeMode="cover"></Image>
        </View>
        <View>
          <TextMedium
            text="Veg Dum Briyani"
            style={{ textAlign: align, fontSize: Sizes.semiLarge, color: '#000' }}
          />

          <TextRegular
            text="Very Tasty Briyani Very "
            style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5 }}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: Color.theme,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              marginLeft: 130,
              marginTop: 20,
            }}
            onPress={() => {
              // onPress()
            }}>
            <TextRegular
              text={I18n.t('readmore')}
              style={[
                {
                  color: Color.white,
                  fontSize: Sizes.medium,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecipeLayout;

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