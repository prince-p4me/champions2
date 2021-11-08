import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack';
import { navigationRef, isReadyRef } from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Geocoder from 'react-native-geocoding';

import Loader from './src/components/Loader';
import { LogBox, StatusBar, Platform } from 'react-native';
import Color from './src/utility/Color';
import Constant from './src/utility/Constant';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import firebase from '@react-native-firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp(Constant.firebaseConfig);
}

const App = () => {
  LogBox.ignoreAllLogs(true);


  // XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  //   GLOBAL.originalXMLHttpRequest :
  //   GLOBAL.XMLHttpRequest;

  // fetch logger
  // global._fetch = fetch;
  // global.fetch = function (uri, options, ...args) {
  //   return global._fetch(uri, options, ...args).then((response) => {
  //     console.log('Fetch', { request: { uri, options, ...args }, response });
  //     return response;
  //   });
  // };

  useEffect(() => {
    Geocoder.init(Constant.MAP_KEY); // initiating geocoding

    //Background/Quit events
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log("link", link);
        // if (link.url === 'https://invertase.io/offer') {
        //   // ...set initial route as offers screen
        // }
      });

    const handleDynamicLink = link => {
      console.log("link1", link);
      // Handle dynamic link inside your own application
      // if (link.url === 'https://invertase.io/offer') {
      //   // ...navigate to your offers screen
      // }
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      isReadyRef.current = false;
      unsubscribe();
      // unsubscribe;
    };
  }, []);

  // async function registerAppWithFCM() {
  //   await messaging().registerDeviceForRemoteMessages();
  // }

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
