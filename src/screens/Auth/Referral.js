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

import { TextRegular, TextBold, TextSemiBold, TextThin } from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from './LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from './ChangeLanguage';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { showToast } from '../../utility/Index';

const Referral = () => {
  const isRtl = useSelector(state => state.isRtl);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const process = () => {
    if (code.length) {
      dispatch(Actions.setRefferCode(code));
      Navigation.navigate("SignUp");
    } else {
      showToast("Please enter the referral code . . .")
    }
  };

  return (
    <View
      style={[styles.container]}>
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>
      <TouchableOpacity
        style={{
          width: 30, margin: 14,
          alignSelf: 'flex-start',
        }}
        onPress={() => Navigation.goBack()}>
        {isRtl ? (
          <Icon name="arrow-right-alt" size={30} color="#000" />
        ) : (
          <Image
            source={Images.back}
            style={{ tintColor: Colors.text }}
            resizeMode="contain"></Image>
        )}
      </TouchableOpacity>
      <View style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
      }}>
        <TextBold text={I18n.t("delighted")} style={{ textAlign: "center", fontSize: Sizes.extraLarge }} />
        {/* <TextBold text={I18n.t("delighted")}/> */}
        <Image source={Images.reffer} style={{
          width: 130, height: 130,
          marginTop: 40,
          resizeMode: "contain"
        }}></Image>

        <TextRegular text={I18n.t("collectcode")} style={{ textAlign: "center", fontSize: Sizes.large, marginTop: "7%" }} />
        <TextRegular text={I18n.t("entercode")} style={{ textAlign: "center", fontSize: Sizes.regular, marginTop: "7%" }} />
        <View style={{
          marginTop: '7%',
          borderBottomWidth: 1,
          height: 45, width: 200
        }}>
          <TextInput
            style={{ flex: 1, padding: 7 }}
            placeholder="Enter the referral code . . ."
            keyboardType="default"
            value={code}
            onChangeText={code => setCode(code)}
            onSubmitEditing={process}
            returnKeyType="done"
            returnKeyLabel="Done"
          />
        </View>
        <FullButton
          btnStyle={{ width: 170, borderRadius: 5, marginTop: "6%" }}
          bgColor={Colors.theme}
          text={I18n.t("redeem1")}
          textColor={Colors.white}
          onPress={process}
        />
        <FullButton
          btnStyle={{ width: 170, borderRadius: 5, marginTop: "3%" }}
          bgColor={Colors.white}
          text={I18n.t("skip")}
          textColor={Colors.text}
          onPress={() => {
            Navigation.navigate("SignUp");
          }}
        />
      </View>
    </View>
  );
};

export default Referral;
