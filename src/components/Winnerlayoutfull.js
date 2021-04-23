import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import { TextBold, TextRegular, TextSemiBold, TextThin } from './TextView';
import Color from '../utility/Color'

import Images from '../utility/Image'
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import Constant from '../utility/Constant';

const Winnerlayoutfull = props => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const { item } = props;

  return (
    <View >
      <View style={styles.winnercontainerfull}>
        <View style={{
          width: 80, height: "100%",
          alignItems: "center",
        }}>
          <Image source={{ uri: Constant.IMAGE_URL + item.profile_pic }}
            style={{ height: 60, width: 60, borderRadius: 100, alignSelf: 'center' }}></Image>
        </View>
        <View style={{ flex: 1, paddingStart: 5 }}>
          <TextSemiBold
            text={item.name}
            style={{ alignSelf: "flex-start", fontSize: Sizes.semiLarge, }}
          />
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TextRegular
              text={"Redeemed"}
              style={{ color: Color.semiGold, fontSize: Sizes.medium, marginTop: 5 }}
            />
          </View>
          <View style={{ flexDirection: 'row', }}>
            <TextRegular
              text={item.redeemed_on + " Points"}
              style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5, color: Color.semiGold }}
            />
            <Image source={Images.star} style={{ height: 15, width: 15, alignSelf: 'center', tintColor: Color.semiGold }}
              resizeMode="contain"></Image>
          </View>
        </View>
        <View style={{
          width: 90, height: "90%",
          borderStartWidth: 1,
          borderColor: Color.border,
          alignItems: "center",
        }}>
          <Image source={{ uri: Constant.IMAGE_URL + item.product_image }} style={{ height: 50, width: 50 }}
            resizeMode="contain"></Image>
          <TextRegular text={`Win~\nVivo Z1 Pro`} style={{ textAlign: "center", fontSize: Sizes.small }} />
        </View>
      </View>
    </View>
  );
};

export default Winnerlayoutfull;
