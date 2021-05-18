import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import { TextBold, TextSemiBold, TextThin } from './TextView';
import i18n from '../services/i18n';

import star from '../assets/imgs/star.png';
import dashboard from '../assets/imgs/my-dashboard.png';
import Rewards from '../assets/imgs/my-rewards.png';
import Refer from '../assets/imgs/Referafriend.png';

import Sizes from '../utility/Sizes';
import styles from '../utility/Style';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';

import * as Navigation from '../navigation/navigation';

const MenuContainer = () => {
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const data = useSelector(state => state.getPoints);

  return (
    <View style={[styles.menuTypeContainer]}>
      <View style={styles.pointTypeCol}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('MyReward', { data })}>
          <Image source={Rewards} style={styles.menuIcon}></Image>
          <TextThin
            text={i18n.t('my_rewards')}
            style={{ textAlign: align, fontSize: Sizes.semiLarge }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuTypeColMiddle}
        onPress={() => Navigation.navigate("MyDashboard")}>
        <Image source={dashboard} style={styles.menuIcon}></Image>
        <TextThin
          text={i18n.t('my_dashboard')}
          style={{ textAlign: align, fontSize: Sizes.semiLarge }}
        />
      </TouchableOpacity>
      <View style={styles.pointTypeCol}>
        <TouchableOpacity style={{ flex: 1, alignItems: "center" }}
          onPress={() => Navigation.navigate("Reffer")}>
          <Image source={Refer} style={styles.menuIcon}></Image>
          <TextThin
            text={i18n.t('refer_friend')}
            style={{ textAlign: align, fontSize: Sizes.semiLarge }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuContainer;
