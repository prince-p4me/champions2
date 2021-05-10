import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';

// import globalStyles from '../../utility/Style';
// import Images from '../../utility/Image';
import Constant from '../utility/Constant';
// import * as Navigation from '../../navigation/navigation';
import Color from '../utility/Color';
// import I18n from '../../services/i18n';
import FullButton from '../components/FullButton';
// import {useSelector, useDispatch} from 'react-redux';
// import LanguageModal from '../../components/LanguageModal';
// import Language from '../../assets/language/language.json';
// import ProfilePicModal from '../../components/ProfilePicModal';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

async function signIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    //   this.setState({ userInfo });
    console.log({userInfo: userInfo});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}
const SocialLogin = props => {
  return (
    <View style={styles.firstSection}>
      <FullButton
        onPress={() => {
          signIn();
        }}
        bgColor={Color.semiGold}
        text={'Google SignIn'}></FullButton>

      <FullButton
        onPress={() => {}}
        text={'Facebook Login'}
        textColor={Color.white}
        bgColor={Color.blue}></FullButton>
    </View>
  );
};
export default SocialLogin;

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
