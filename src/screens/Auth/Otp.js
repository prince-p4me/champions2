import React, {useState, useEffect} from 'react';
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
import {TextBold, TextRegular} from '../../components/TextView';
import LinkButton from './LinkButton';
import * as Actions from '../../redux/action';
import {useSelector, useDispatch} from 'react-redux';

import Images from '../../utility/Image';

import Geolocation from '@react-native-community/geolocation';

const OtpScreen = props => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  let [counter, setCounter] = useState(59);

  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);

  const {mobile, login: isLogin, name} = props.route.params;
  console.log('mobile', mobile);
  console.log('isLogin', isLogin);
  console.log('name', name);

  useEffect(() => {
    getLocationPermissions();
    const interval = setInterval(() => {
      counter--;
      setCounter(counter);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const getLocationPermissions = () => {
    Geolocation.getCurrentPosition(info => {
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });
  };

  return (
    <View>
      <SafeAreaView style={{backgroundColor: Colors.theme}}></SafeAreaView>

      <TouchableOpacity onPress={() => Navigation.goBack()}>
        <Image
          source={Images.back}
          style={{tintColor: '#000', margin: 20}}
          resizeMode="contain"></Image>
      </TouchableOpacity>

      <TextBold
        text={i18n.t('otplongtext')}
        style={{textAlign: 'center', fontSize: Sizes.extraDouble}}
      />

      <TextRegular
        text={i18n
          .t(isLogin ? 'otplongtext2' : 'otplongtext3')
          .replace('071*****88', mobile.mobile ? mobile.mobile : mobile)}
        style={{textAlign: 'center', fontSize: Sizes.regular, marginTop: 30}}
      />

      <OTPInputView
        style={{width: '80%', height: 200, marginLeft: 40}}
        pinCount={4}
        autoFocusOnLoad
        placeholderCharacter="*"
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => setCode(code)}
      />
      <View style={{width: '100%', paddingHorizontal: '10%'}}>
        <FullButton
          onPress={() => {
            // Navigation.navigate('SignUp');
            const obj = {
              mobile: isLogin ? mobile : mobile.mobile,
              name: isLogin ? name : mobile.name,
              otp: code,
              state: latitude + ',' + longitude,
            };
            dispatch(Actions.verifyOtp(obj));
          }}
          text={i18n.t(isLogin ? 'login' : 'signup2')}
          textColor={Colors.white}
          bgColor={Colors.theme}
        />
      </View>
      <View style={{height: 30}}></View>
      {counter <= 0 && (
        <LinkButton
          text={i18n.t('didntrecive')}
          btnText={i18n.t('click')}
          onPress={() => {
            let obj = {
              mobile,
            };
            dispatch(Actions.resendOtp(isLogin ? obj : mobile));
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
            Color: Colors.theme,
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
