import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import { TextBold, TextSemiBold, TextThin } from './TextView';
import i18n from '../services/i18n';

import scan from '../assets/imgs/scan.png';
import styles from '../utility/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../navigation/navigation';
import Sizes from "../utility/Sizes";

const QRCodeContainer = () => {
  return (
    <View style={styles.qrContainer}>
      <TouchableOpacity
        onPress={() => {
          Navigation.navigate('Scan');
        }}>
        <Image source={scan} style={styles.qrIcon}></Image>
      </TouchableOpacity>

      <TextBold
        text={i18n.t('scanfor')}
        style={{ textAlign: 'center', fontSize: Sizes.large,marginTop:10 }}
      />
      <TextThin
        text={i18n.t('wonmorepoints')}
        style={{ textAlign: 'center', fontSize: Sizes.large,marginTop:10 }}
      />
    </View>
  );
};

export default QRCodeContainer;
