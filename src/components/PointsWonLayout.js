import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import { TextBold, TextRegular, TextSemiBold, TextThin } from './TextView';
import i18n from '../services/i18n';
import Color from '../utility/Color'

import star from '../assets/imgs/star.png';
import Images from '../utility/Image'
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import About from '../assets/imgs/user.jpeg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CardView from 'react-native-cardview'
const PointsWonLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getPoints);

  return (
    <View >
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}>


        <View style={styles.pointwoncontainer}>
          <Image source={Images.star2} style={{ height: 50, width: 50, alignSelf: 'center' }}></Image>
          <TextRegular
            text="Points Won"
            style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10 }}
          />
          <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
            <Image source={Images.star} style={{ height: 13, width: 13, alignSelf: 'center', marginTop: 3, marginRight: 5 }}
              resizeMode="contain"></Image>

            <TextRegular
              text="100"
              style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5 }}
            />

          </View>

          <TextThin
            text="27 FEB 2020"
            style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 20 }}
          />

        </View>
      </CardView>
    </View>
  );
};

export default PointsWonLayout;
