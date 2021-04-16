import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextBold, TextSemiBold, TextThin } from './TextView';
import i18n from '../services/i18n';

import star from '../assets/imgs/star.png';
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import Imagess from '../utility/Image';
 import * as Navigation from '../navigation/navigation';

const RewardLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getPoints);

  return (
    <View>

      <View style={styles.rewardcontainer}>


        <TouchableOpacity
          onPress={() => {
            Navigation.navigate('myreward');
          }}
          style={styles.pointTypeCol}>
          <View style={styles.pointTypeCol}>
            <Image source={Imagess.reward} style={styles.rewardimage}></Image>

            <TextThin
              text={i18n.t('myreward')}
              style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10 }}
            />
          </View>

        </TouchableOpacity>
        <View style={styles.rewardmiddle}>
          <Image source={Imagess.dashboard} style={styles.rewardimage}></Image>

          <TextThin
            text={i18n.t('mydashboard')}
            style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10 }}
          />
        </View>
        <View style={styles.pointTypeCol}>
          <Image source={Imagess.refer} style={styles.rewardimage}></Image>

          <TextThin
            text={i18n.t('refer')}
            style={{ textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

export default RewardLayout;
