import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  I18nManager,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import styles from '../../utility/Style';
import Loader from '../../components/Loader';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import { TextRegular, TextBold, TextSemiBold, TextMedium } from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from '../Auth/LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from '../Auth/ChangeLanguage';
import { useSelector, useDispatch } from 'react-redux';
import BottomTile from '../../components/BottomTile';

const SendFeedback = () => {

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.t("Sendfeedback")} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={[styles.container, { padding: 14, backgroundColor: Colors.white }]}>

      </ScrollView>
      <BottomTile title={I18n.t("addnewaddress")} onPress={() => {
        alert("saving details")
      }} />
      <SafeAreaView style={{ backgroundColor: Colors.parrot }}></SafeAreaView>
    </View>
  );
};

export default SendFeedback;
