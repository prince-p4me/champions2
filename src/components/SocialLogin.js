import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Images from '../utility/Image';
import Constant from '../utility/Constant';
import styles from '../utility/Style';
import Color from '../utility/Color';
import FullButton from '../components/FullButton';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, Profile, AccessToken } from 'react-native-fbsdk-next';

import { useSelector, useDispatch } from 'react-redux';

import * as Actions from '../redux/action';

const SocialLogin = props => {
  const { typeScreen } = props;
  console.log("typeScreen", typeScreen);
  // let typeScreen = 'signup';
  const dispatch = useDispatch();

  async function signIn(loginType) {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo: userInfo });

      logginUser(userInfo, 'google', loginType);
    } catch (error) {
      console.log('error');
      console.log({ error: error });
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

  function fbLogin(loginType) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
            result.grantedPermissions.toString(),
          );

          const currentProfile = Profile.getCurrentProfile().then(function (
            currentProfile,
          ) {
            if (currentProfile) {
              console.log({ currentProfile: currentProfile });
              console.log(
                'The current logged user is: ' +
                currentProfile.name +
                '. His profile id is: ' +
                currentProfile.userID,
              );
              // logginUser(currentProfile);
              logginUser(currentProfile, 'facebook', loginType);
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  function logginUser(userInfo, type, loginType) {
    // userInfo.loginFrom = 'social';
    // userInfo.type=type;
    let userInfoModify = {};
    if (type == 'facebook') {
      userInfoModify = {
        social_id: userInfo.userID,
        name: userInfo.name,
        email: userInfo.email,
        loginFrom: 'social', type
      };
    } else {
      userInfoModify = {
        social_id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        profile_photo: userInfo.user.photo,
        loginFrom: 'social', type
      };
    }

    dispatch(Actions.signUp({ userInfoModify }));
    /*if (typeScreen == 'login') {
    console.log({ userInfoModify: userInfoModify });
      dispatch(Actions.doLogin({ userInfoModify }));
    } else {
      dispatch(Actions.signUp({ userInfoModify }));
    }*/
  }

  return (
    <View style={{
      flex: 6, width: "100%",
      paddingHorizontal: 28,
      alignItems: "center",
      justifyContent: "space-around",
    }}>
      <TouchableOpacity style={[styles.cardView, {
        height: 45,
        width: Constant.width - 56
      }]} onPress={() => signIn()}>
        <Image source={Images.google}
          style={{ width: '100%', height: "100%", resizeMode: "cover" }}
          resizeMode="contain"></Image>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cardView, {
        height: 45,
        width: Constant.width - 56
      }]} onPress={() => fbLogin()}>
        <Image source={Images.fb}
          style={{ width: '100%', height: "100%", resizeMode: "cover" }}
          resizeMode="contain"></Image>
      </TouchableOpacity>
    </View>
  );
};
export default SocialLogin;