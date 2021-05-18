import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import { TextBold, TextSemiBold, TextThin } from './TextView';
import i18n from '../services/i18n';

import star from '../assets/imgs/star.png';
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import QRCodeContainer from './QRCodeContainer';

const RewardPointlayout = props => {
  const { bgColor } = props;
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getPoints);

  return (
    <View style={[styles.pointTypesContainerreward, bgColor && { backgroundColor: bgColor }]}>
      <View style={styles.pointTypeCol}>
        <Image source={earned} style={styles.pointIcon}></Image>
        <TextSemiBold
          text={data.total_earned}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
        <TextThin
          text={i18n.t('EarnedWon')}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
      </View>
      <View style={styles.pointTypeColMiddle}>
        <Image source={Redeem} style={styles.pointIcon}></Image>
        <TextSemiBold
          text={data.total_redeemed}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
        <TextThin
          text={i18n.t('redeem')}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
      </View>
      <View style={styles.pointTypeCol}>
        <Image source={Balance} style={styles.pointIcon}></Image>
        <TextSemiBold
          text={data.balance}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
        <TextThin
          text={i18n.t('balance')}
          style={{ textAlign: align, fontSize: Sizes.semiLarge, color: "#fff", marginTop: 5 }}
        />
      </View>
    </View>
  );
};

export default RewardPointlayout;
