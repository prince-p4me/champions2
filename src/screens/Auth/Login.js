import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  I18nManager,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import styles from '../../utility/Style';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import {TextRegular, TextBold, TextSemiBold} from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from './LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from './ChangeLanguage';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const LoginScreen = () => {
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
    dispatch(Actions.doLogin(mobile));
  };

  return (
    <View
      style={[styles.container, {padding: 14, backgroundColor: Colors.white}]}>
      <SafeAreaView style={{backgroundColor: Colors.theme}}></SafeAreaView>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: 6,
          alignItems: 'center',
          paddingTop: 20,
          paddingHorizontal: 16,
        }}>
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
              style={{tintColor: '#000'}}
              resizeMode="contain"></Image>
          )}
        </TouchableOpacity>
        <TextBold
          text={I18n.t('login')}
          style={{textAlign: 'center', fontSize: Sizes.extraDouble}}
        />

        <TextRegular
          text={I18n.t('otplongtext2')}
          style={{textAlign: 'center', fontSize: Sizes.regular, marginTop: 30}}
        />

        <View style={styles.inputBox}>
          <View style={styles.dialCode}>
            <TextSemiBold text={isRtl ? '-91+' : '+91-'} />
          </View>
          <TextInput
            style={{flex: 1, padding: 7}}
            placeholder="Enter your 10 digits mobile number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={mobile => setMobile(mobile)}
            maxLength={10}
            onSubmitEditing={doLogin}></TextInput>
        </View>
        <FullButton
          btnStyle={{width: Constant.width - 64, marginTop: 50}}
          onPress={doLogin}
          text={I18n.t('Sendotp')}
          textColor={Colors.white}
          bgColor={Colors.theme}
        />
      </KeyboardAvoidingView>

      {/* <TextDevider text={I18n.t('loginwith')}></TextDevider> */}

      <View
        style={{
          flex: 5,
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <LinkButton
          text={I18n.t('doyouhaveac')}
          btnText={I18n.t('signup2')}
          onPress={() => Navigation.navigate('SignUp')}
        />
        <View style={{height: 40}}></View>
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
            style={{marginEnd: 7}}
          />

          <ChangeLanguage />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
