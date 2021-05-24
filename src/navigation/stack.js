import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {I18nManager, Platform, Alert} from 'react-native';
import Home from '../screens/Dashboard/Home';
import Reffer from '../screens/Dashboard/Reffer';
import LoginScreen from '../screens/Auth/Login';
import OtpScreen from '../screens/Auth/Otp';
import SignUpScreen from '../screens/Auth/SignUp';
import LandingScreen from '../screens/Auth/Landing';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import ScanQrCode from '../screens/Dashboard/ScanQrCode';
import SuccessModal from '../screens/Dashboard/SuccessModal';
import Profilemain from '../screens/Dashboard/Profilemain';
import OfferAll from '../screens/Dashboard/OfferAll';
import WinnerAll from '../screens/Dashboard/WinnerAll';
import EditProfile from '../screens/Dashboard/EditProfile';
import MyReward from '../screens/Dashboard/MyReward';
import MyDashboard from '../screens/Dashboard/MyDashboard';
import Help from '../screens/Dashboard/Help';
import ContactUs from '../screens/Dashboard/ContactUs';
import SendQuery from '../screens/Dashboard/SendQuery';
import AboutUs from '../screens/Dashboard/AboutUs';
import Terms from '../screens/Dashboard/Terms';
import Privacy from '../screens/Dashboard/Privacy';
import Address from '../screens/Dashboard/Address';
import SendFeedback from '../screens/Dashboard/SendFeedback';
import AddEditAddress from '../screens/Dashboard/AddEditAddress';
import OfferDetail from '../screens/Dashboard/OfferDetail';
import RecipieAll from '../screens/Dashboard/RecipieAll';
import RecipieDetail from '../screens/Dashboard/RecipieDetail';
import PointsDetail from '../screens/Dashboard/PointsDetail';
import TutorialScreen from '../screens/Auth/Tutorial';
import Notification from '../screens/Dashboard/Notification';
import * as Actions from '../redux/action';
// import MyRewards from '../screens/Dashboard/MyRewards';
import {request, PERMISSIONS} from 'react-native-permissions';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import messaging from '@react-native-firebase/messaging';
import Constant from '../utility/Constant';

import * as Navigation from '../navigation/navigation';

import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';
import {showToast} from '../utility/Index';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);
  const isRtl = useSelector(state => state.isRtl);
  const language = useSelector(state => state.getLanguage);
  // const isRtl = true;

  useEffect(() => {
    console.log('isRtl is ', isRtl);
    console.log('language is ', language);
    // I18n.locale = language;
    dispatch(Actions.setRtl(isRtl));
    I18nManager.allowRTL(isRtl);
    I18nManager.forceRTL(isRtl);
    SplashScreen.hide();

    console.log('Splashscreen hidden');
    setAllConfigs();
  }, [language]);

  const setAllConfigs = () => {
    messaging().onTokenRefresh(fcmToken => {
      console.log('token==' + fcmToken);
      dispatch(Actions.setFcmToken(fcmToken));
      // Process your token as required
    });

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: Constant.GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId:
      //   'com.googleusercontent.apps.886343695448-sbeg3ej91lprv8vv92hl1j0kfbepmj4t', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });

    async function requestFCMPermission() {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const fcmToken = await messaging().getToken();
        console.log('token', fcmToken);
        dispatch(Actions.setFcmToken(fcmToken));
      }
    }

    requestFCMPermission();

    async function requestLocationPermission() {
      const granted = await request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if (granted) {
        console.log('Permission granted');
      } else {
        Alert.alert('ALert!', 'Permission Not Granted.');
      }
    }

    requestLocationPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
      handleNavigation(remoteMessage?.data);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      handleNavigation(remoteMessage?.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNavigation(remoteMessage?.data);
        }
        // setLoading(false);
      });

    // If App is in foreground mode
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showToast(remoteMessage?.notification?.body);
      // if (Platform?.OS == 'android') {
      //   PushNotification.localNotification({
      //     message: remoteMessage?.notification?.body,
      //     title: remoteMessage?.notification.title,
      //     bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
      //     smallIcon: remoteMessage?.notification?.android?.imageUrl,
      //   });
      // } else {
      //   PushNotificationIos.addNotificationRequest({
      //     id: remoteMessage?.data?.id,
      //     body: remoteMessage?.data?.body,
      //     title: remoteMessage?.data?.title,
      //   });
      // }
      showToast(remoteMessage?.notification?.body);
      // handleNavigation(remoteMessage?.data);
    });

    return unsubscribe;
  };

  const handleNavigation = data => {
    console.log('data', data);
    let routeName = user && user.id ? 'Home' : 'Landing';
    let id = null;
    if (data) {
      switch (data.type) {
        case 'winner':
          routeName = 'WinnerAll';
          break;

        case 'offer':
          routeName = 'OfferDetail';
          id = data.id;
          break;

        case 'recipe':
          routeName = 'RecipieDetail';
          id = data.id;
          break;

        default:
          routeName = 'Home';
          break;
      }
    }
    Navigation.navigate(routeName, id && {id});
  };

  console.log('rendered');
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user && user.id ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Scan" component={ScanQrCode} />
          <Stack.Screen name="OfferAll" component={OfferAll} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="WinnerAll" component={WinnerAll} />
          <Stack.Screen name="SendQuery" component={SendQuery} />
          <Stack.Screen name="Editprofile" component={EditProfile} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Profilemain" component={Profilemain} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="SendFeedback" component={SendFeedback} />
          <Stack.Screen name="OfferDetail" component={OfferDetail} />
          <Stack.Screen name="AddEditAddress" component={AddEditAddress} />
          <Stack.Screen name="RecipieAll" component={RecipieAll} />
          <Stack.Screen name="RecipieDetail" component={RecipieDetail} />
          <Stack.Screen name="PointsDetail" component={PointsDetail} />
          <Stack.Screen name="MyReward" component={MyReward} />
          <Stack.Screen name="MyDashboard" component={MyDashboard} />
          <Stack.Screen name="Reffer" component={Reffer} />
          <Stack.Screen name="Notification" component={Notification} />
        </>
      ) : (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
