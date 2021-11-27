import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
  Linking,
  Alert
} from 'react-native';
import Colors from '../../utility/Color';
import styles from '../../utility/Style';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import {
  TextRegular,
  TextBold,
  TextSemiBold,
  TextLite,
} from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from './LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from './ChangeLanguage';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import SocialLogin from '../../components/SocialLogin';
import * as ApiService from "../../services/Api";
import { showResponse, showToast } from '../../utility/Index';
import Geolocation from '@react-native-community/geolocation';

import { PERMISSIONS, check, requestLocationAccuracy, RESULTS, request } from 'react-native-permissions'


const LoginScreen = () => {
  // const [mobile, setMobile] = useState('8802854433');
  // const [mobile, setMobile] = useState('8285724681');
  const [mobile, setMobile] = useState('');
  const dispatch = useDispatch();
  let language = useSelector(state => state.getLanguage);
  const isRtl = useSelector(state => state.isRtl);
  const forceUpdate = React.useReducer(bool => !bool)[1];

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);

  const doLogin = () => {
    if (!mobile || mobile.length < 10) {
      Toast.showWithGravity(
        'Enter valid mobile number',
        Toast.SHORT,
        Toast.BOTTOM,
      );
      Keyboard.dismiss();
      return;
    }
    // dispatch(Actions.doLogin(mobile));
    dispatch(Actions.setLoading(true));
    ApiService.loginApi({ mobile })
      .then((response) => {
        dispatch(Actions.setLoading(false));
        if (response && response.status) {
          if (response.status == 10 && response.id) {
            // yield put({ type: Types.USER, payload: response }); //set user
            dispatch(Actions.updateUser(response));
          } else {
            Navigation.navigate('Otp', {
              mobile,
              name: response.name,
              login: true,
            });
          }
        }
        showToast(response?.message);
      }).catch(err => {
        console.log("err", err);
        dispatch(Actions.setLoading(false));
      });
    setTimeout(() => {
      dispatch(Actions.setLoading(false));
    }, 6000);
  };

  const DATA = ['vFN3eNe0_Hs', 'a1CFxcTP3yQ', 'ym5dAu9gTPE'];

  const ListItem = ({ videoId }) => (
    <YouTube
      showinfo={false}
      controls={0}
      fullscreen='false'
      videoId={videoId} // The YouTube video ID
      play // control playback of video with true/false
      onReady={e => console.log("isReady")}
      onChangeState={e => console.log("onChange")}
      onChangeQuality={e => console.log("onQuality")}
      onError={e => console.log("onError")}
      style={{ alignSelf: 'stretch', height: 300, borderRadius: 10 }}
      modestbranding={true}

    />
  )

  return (
    <View style={[styles.container, { padding: 14, backgroundColor: Colors.white }]}>
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>
      <TouchableOpacity
        style={{
          width: 30,
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

      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: 6,
          alignItems: 'center',
          paddingTop: 20,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}>
        <TextBold
          text={I18n.t('login')}
          style={{ textAlign: 'center', fontSize: Sizes.extraDouble }}
        />

        <TextRegular
          text={I18n.t('otplongtext2')}
          style={{ textAlign: 'center', fontSize: Sizes.regular, marginTop: 20 }}
        />

        <View style={[styles.inputBox, { marginTop: '10%' }]}>
          <View style={styles.dialCode}>
            <TextSemiBold text={isRtl ? '-91+' : '+91-'} />
          </View>
          <TextInput
            style={{ flex: 1, padding: 7 }}
            placeholder="Enter your 10 digits mobile number"
            keyboardType="numeric"
            value={mobile}
            onChangeText={mobile => setMobile(mobile)}
            maxLength={10}
            onSubmitEditing={doLogin}></TextInput>
        </View>
        <FullButton
          btnStyle={{ width: Constant.width - 64, marginTop: '15%' }}
          onPress={doLogin}
          text={I18n.t('Sendotp')}
          textColor={Colors.white}
          bgColor={Colors.theme}
        />
      </KeyboardAvoidingView>

      {/* <TextDevider text={I18n.t('loginwith')}></TextDevider> */}

      <View style={{ flex: 4 }}>
        {/* <SocialLogin typeScreen={'login'} /> */}
        <View
          style={{
            height: 60,
            justifyContent: 'space-between',
            paddingVertical: 7,
          }}>
          <LinkButton
            text={I18n.t('doyouhaveac')}
            btnText={I18n.t('signup2')}
            onPress={() => Navigation.navigate('Referral')}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Navigation.navigate('Help', { auth: true })}>
            <Image
              source={Images.help}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                tintColor: 'blue',
              }}
            />
            <TextLite
              text="Help"
              style={{ fontSize: Sizes.regular, marginStart: 7 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }}></View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TextSemiBold
            text={I18n.t('chooselanguage')}
            style={{ marginEnd: 7 }}
          />

          <ChangeLanguage />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
