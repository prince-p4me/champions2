import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import globalStyles from '../../utility/Style';
import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import Color from '../../utility/Color';
import I18n from '../../services/i18n';
import FullButton from '../../components/FullButton';
import {useSelector, useDispatch} from 'react-redux';
import LanguageModal from '../../components/LanguageModal';
import Language from '../../assets/language/language.json';
import ProfilePicModal from '../../components/ProfilePicModal';
import SocialLogin from '../../components/SocialLogin';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LandingScreen = props => {
  let language = useSelector(state => state.getLanguage);
  const forceUpdate = useReducer(bool => !bool)[1];
  let [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '407190131380-uj4qa5ptfcdj68cftohb0d3jb4cqi17s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);
  const fixedUri = Image.resolveAssetSource(Images.bgGreen);
  return (
    <ImageBackground
      source={fixedUri}
      resizeMode="cover"
      style={globalStyles.container}>
      <SafeAreaView style={{backgroundColor: Colors.theme}}></SafeAreaView>

      <View style={styles.firstSection}>
        <Image
          source={Images.champLogo}
          style={{width: '100%', height: '30%'}}
          resizeMode="contain"></Image>
        <View style={styles.btnContainer}>
          <FullButton
            onPress={() => Navigation.navigate('SignIn')}
            text={I18n.t('login')}></FullButton>

          <FullButton
            onPress={() => Navigation.navigate('SignUp')}
            text={I18n.t('signup')}
            textColor={Color.white}
            bgColor={Color.semiGold}></FullButton>
          {/* <SocialLogin /> */}
        </View>
      </View>
      <Image
        source={Images.saina}
        style={{flex: 5}}
        resizeMode="contain"></Image>
    </ImageBackground>
  );
};
export default LandingScreen;

const styles = StyleSheet.create({
  firstSection: {
    width: Constant.width,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '18%',
  },
  btnContainer: {
    height: '50%',
    width: '100%',
    paddingVertical: '5%',
    // backgroundColor: "red",
    justifyContent: 'space-around',
  },
});
