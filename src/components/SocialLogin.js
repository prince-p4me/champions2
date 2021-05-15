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
import {LoginManager, Profile, AccessToken} from 'react-native-fbsdk-next';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId:
//     'com.googleusercontent.apps.886343695448-sbeg3ej91lprv8vv92hl1j0kfbepmj4t', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   // iosClientId:
//   //   'com.googleusercontent.apps.886343695448-sbeg3ej91lprv8vv92hl1j0kfbepmj4t', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
// });
async function signIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
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

function fbLogin() {
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
        );

        const result2 = AccessToken.getCurrentAccessToken().then(function (
          token,
        ) {
          if (token) {
            console.log({token: token});
          }
        });
        console.log(result2?.accessToken);

        const currentProfile = Profile.getCurrentProfile().then(function (
          currentProfile,
        ) {
          if (currentProfile) {
            console.log({currentProfile: currentProfile});
            console.log(
              'The current logged user is: ' +
                currentProfile.name +
                '. His profile id is: ' +
                currentProfile.userID,
            );
          }
        });
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
}
const SocialLogin = props => {
  return (
    <View style={styles.firstSection}>
      {/* <FullButton
        onPress={() => {
          signIn();
        }}
        bgColor={Color.semiGold}
        text={'Google SignIn'}></FullButton> */}

      <FullButton
        onPress={() => {
          fbLogin();
        }}
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
