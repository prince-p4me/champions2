/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { store } from './src/redux/store';
import * as Navigation from './src/navigation/navigation';
import * as Actions from './src/redux/action';
import React from "react";

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   const user = store.getState().getUser;
//   let count = store.getState().getCount;
//   console.log('data', remoteMessage?.data);
//   let routeName = user && user.id ? 'Home' : 'Landing';
//   let id = null;
//   if (remoteMessage.data) {
//     switch (remoteMessage.data.type) {
//       case 'winner':
//         routeName = 'WinnerAll';
//         break;

//       case 'offer':
//         routeName = 'OfferDetail';
//         id = data.id;
//         break;

//       case 'recipe':
//         routeName = 'RecipieDetail';
//         id = data.id;
//         break;

//       default:
//         routeName = 'Home';
//         break;
//     }
//     dispatch(Actions.setCount(count + 1));
//     Navigation.navigate(routeName, id && { id });
//   }
// });

// function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     return null;
//   }
//   return <App />;
// }

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}
AppRegistry.registerComponent(appName, () => App);
