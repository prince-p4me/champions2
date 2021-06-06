/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { store } from './src/redux/store';
import * as Navigation from './src/navigation/navigation';
import React from "react";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const user = store.getState().getUser;
  // console.log('Message handled in the background!', remoteMessage);
  // handleNavigation(remoteMessage?.data);
  console.log('data', remoteMessage?.data);
  let routeName = user && user.id ? 'Home' : 'Landing';
  let id = null;
  if (remoteMessage.data) {
    switch (remoteMessage.data.type) {
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
    Navigation.navigate(routeName, id && { id });
  }
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
