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

import { TextRegular, TextBold, TextSemiBold } from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from '../Auth/LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from '../Auth/ChangeLanguage';
import { useSelector, useDispatch } from 'react-redux';
 
const EditProfile = () => {
  
  return (
    <View
      style={[styles.container, { padding: 14, backgroundColor: Colors.white }]}>
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>
     

     </View>
  );
};

export default EditProfile;
