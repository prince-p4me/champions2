import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import GlobalStyles from '../../utility/Style';
import * as Navigation from '../../navigation/navigation';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../utility/Color';
import i18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';
import FullButton from '../../components/FullButton';
import { TextBold, TextRegular } from '../../components/TextView';
import LinkButton from './LinkButton';
import * as Actions from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Images from '../../utility/Image';

import Geolocation from '@react-native-community/geolocation';
import { showResponse } from '../../utility/Index';
import { useFocusEffect } from '@react-navigation/native';

const OtpScreen = props => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  let [counter, setCounter] = useState(59);

  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);

  const { mobile, login: isLogin, name, confirmation } = props.route.params;
  const address = useSelector(state => state.getAddressLatLng);
  const token = useSelector(state => state.getFcmToken);

  console.log(address);
  console.log('mobile', mobile);
  console.log('isLogin', isLogin);
  console.log('name', name);
  console.log('confirmation', confirmation);

  useEffect(() => {
    const interval = setInterval(() => {
      counter--;
      setCounter(counter);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(info => {
        setLat(info.coords.latitude);
        setLong(info.coords.longitude);
        dispatch(Actions.getAddressLatLng(info.coords));
      });
    }, [])
  );

  const confirmFcmOtp = async obj => {
    try {
      await confirmation.confirm(code);
      dispatch(Actions.confirmFcmOTP(obj));
    } catch (error) {
      showResponse({ message: 'Invalid code' });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>

      <TouchableOpacity onPress={() => Navigation.goBack()}>
        <Image
          source={Images.back}
          style={{ tintColor: Colors.text, margin: 20 }}
          resizeMode="contain"></Image>
      </TouchableOpacity>

      <TextBold
        text={i18n.t('otplongtext')}
        style={{ textAlign: 'center', fontSize: Sizes.extraDouble }}
      />

      <TextRegular
        text={i18n
          .t(isLogin ? 'otplongtext2' : 'otplongtext3')
          .replace('071*****88', mobile.mobile ? mobile.mobile : mobile)}
        style={{ textAlign: 'center', fontSize: Sizes.regular, marginTop: 30 }}
      />

      <OTPInputView
        pinCount={4}
        style={{ width: '80%', height: 200, marginLeft: 40 }}
        autoFocusOnLoad
        placeholderCharacter="*"
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => setCode(code)}
      />
      <View style={{ width: '100%', paddingHorizontal: '10%' }}>
        <FullButton
          onPress={() => {
            // Navigation.navigate('SignUp');
            if (address && address.full_address) {
              let obj = {
                mobile: isLogin ? mobile : mobile.mobile,
                name: isLogin ? name : mobile.name,
                otp: code,
                loginType: 0,
                device_id: token,
              };
              if (isLogin) {
                obj.loginType = 1;
                // dispatch(Actions.checkFirstTime(true));
                // dispatch(Actions.setFirstUser(true));
              } else {
                // dispatch(Actions.setFirstUser(true));
              }
              // dispatch(Actions.setFirstUser(false));
              dispatch(Actions.verifyOtp({ ...obj, ...address }));
              setCode("");
            }

            // confirmFcmOtp(obj);
          }}
          text={i18n.t(isLogin ? 'login' : 'signup2')}
          textColor={Colors.white}
          bgColor={Colors.theme}
        />
      </View>
      <View style={{ height: 30 }}></View>
      {counter <= 0 && (
        <LinkButton
          text={i18n.t('didntrecive')}
          btnText={i18n.t('click')}
          onPress={() => {
            let obj = {
              mobile: isLogin ? mobile : mobile.mobile,
              name,
            };
            dispatch(Actions.resendOtp(isLogin ? obj : mobile));
            // dispatch(Actions.sendFcmOTP(obj));
            setCounter(59);
          }}
        />
      )}

      {counter > 0 && (
        <TextRegular
          text={i18n.t('resend') + counter + 's'}
          style={{
            textAlign: 'center',
            fontSize: Sizes.regular,
            color: Colors.theme,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.bgGray,
    color: Colors.darkBGgray,
    fontSize: Sizes.double,
    // borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.theme,
  },
});
export default OtpScreen;
