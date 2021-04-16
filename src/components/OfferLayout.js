import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, Text } from 'react-native';
import { TextBold, TextRegular, TextThin } from './TextView';
import Color from '../utility/Color'

import star from '../assets/imgs/star.png';
import Images from '../utility/Image'
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import FullButton from './FullButton';
import About from '../assets/imgs/user.jpeg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import I18n from '../services/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OfferLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getPoints);

  return (
    <View >
      <View style={styles.offercontainer}>
        <Image source={Images.iphone} style={{ height: 70, width: 70, marginLeft: 15 }}
          resizeMode="contain"></Image>
        <View style={{ marginLeft: 30 }}>

          <TextThin
            text="Product Name"
            style={{ textAlign: align, fontSize: Sizes.regular, }}
          />
          <TextThin
            text="Offer's Name"
            style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10, color: "#000" }}
          />



          <View style={{ flexDirection: 'row', marginTop: 5 }}>


            <TextRegular
              text="On 100000 Points"
              style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5, color: Color.semiGold }}
            />
            <Image source={Images.star} style={{ height: 15, width: 15, alignSelf: 'center', tintColor: Color.semiGold }}
              resizeMode="contain"></Image>
          </View>


          <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: Color.theme, height: 30, width: 120, alignItems: 'center', justifyContent: 'center', borderRadius: 3, marginLeft: 150 }}
            onPress={() => {
              // onPress()
            }}>
            <TextRegular text={I18n.t('redeemnow')}
              style={[
                {
                  color: (Color.white),
                  fontSize: Sizes.medium
                },

              ]} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default OfferLayout;
