import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack';
import { navigationRef, isReadyRef } from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Loader from './src/components/Loader';
import { LogBox, StatusBar, Platform } from 'react-native';
import Color from './src/utility/Color';
import { request, PERMISSIONS } from 'react-native-permissions';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

// import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCw0q516IzpNPo-A8zFy714rCxh06DIlc8',
  authDomain: '190017235730.firebaseapp.com',
  databaseURL: 'https://190017235730.firebaseio.com',
  projectId: '190017235730',
  storageBucket: '190017235730.appspot.com',
  messagingSenderId: '190017235730',
  appId: '1:190017235730:ios:546987123daf418684e1cb',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const App = () => {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    // messaging().onTokenRefresh(fcmToken => {
    //   console.log('token==' + fcmToken);
    //   // Process your token as required
    // });

    // async function requestUserPermission() {
    //   console.log('receiverrr');
    //   const fcmToken = await messaging().getToken();

    //   console.log('token==' + fcmToken);
    //   if (fcmToken) {
    //     console.log('reciverddd');
    //     // user has a device token
    //   } else {
    //     console.log('not receiverd');
    //     // user doesn't have a device token yet
    //   }
    // }
    // requestUserPermission();

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '190017235730-gi6fvvnrdotf203a29vvd70e43g0h5rv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId:
      //   'com.googleusercontent.apps.886343695448-sbeg3ej91lprv8vv92hl1j0kfbepmj4t', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });

    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);
      const enabled = (authStatus === messaging.AuthorizationStatus.AUTHORIZED) ||
        (authStatus === messaging.AuthorizationStatus.PROVISIONAL);

      if (enabled) {
        const token = await messaging().getToken();
        console.log("token", token);
      }
    }

    requestUserPermission();

    async function requestLocationPermission() {
      const granted = await request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if (granted) {
        console.log('Permission granted');
      } else {
        Alert.alert("ALert!", 'Permission Not Granted.');
      }
    }
    requestLocationPermission();

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    // return unsubscribe;

    return () => {
      isReadyRef.current = false;
      // unsubscribe;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <StatusBar
              backgroundColor={Color.theme}
              barStyle="light-content"></StatusBar>
            <StackNavigator />
            <Loader />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
