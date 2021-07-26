import { Dimensions } from 'react-native';
const baseUrl = 'http://10xchampions.grmrice.com/';
// const baseUrl = 'http://drive13.in/10X/';

const mapUrl = 'https://maps.googleapis.com/';
// const MAP_KEY = 'AIzaSyAHACClfTrDU533R962fSyxAWiFJUXFmwI';
const MAP_KEY = 'AIzaSyBFAIKLbqht_ZPBjwmIkILZbVlc9WbY6as';
export default Constants = {
  API_URL: baseUrl + 'api/',
  IMAGE_URL: baseUrl + 'images/',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  CHANNEL_NAME: "high-priority",
  GOOGLE_CLIENT_ID:
    '190017235730-4rl8813tiqet5j6msfpbhq6n4eupilpf.apps.googleusercontent.com',
  // firebaseConfig: {
  //   authDomain: '510954134533.firebaseapp.com',
  //   databaseURL: 'https://510954134533.firebaseio.com',
  //   projectId: '510954134533',
  //   storageBucket: '510954134533.appspot.com',
  //   messagingSenderId: '510954134533',
  //   appId: '1:510954134533:ios:d58ab92296d305f1ef506c',
  // },
  firebaseConfig: {
    apiKey: "AIzaSyDvCAjbeJ_tJC-29M3uJ0Ja142RWxQm2F0",
    authDomain: "xchamp-b52b1.firebaseapp.com",
    databaseURL: "https://xchamp-b52b1-default-rtdb.firebaseio.com",
    projectId: "xchamp-b52b1",
    storageBucket: "xchamp-b52b1.appspot.com",
    messagingSenderId: "510954134533",
    appId: "1:510954134533:web:1e679fcda9c513d5ef506c",
    measurementId: "G-G52P1CWRFG"
  },
  ADDRESS_URL: mapUrl + 'maps/api/geocode/json?latlng=',
  MAP_KEY: MAP_KEY,
  iosApp: 'https://apps.apple.com/eg/app/10x-champions/id1562137449',
  android: "https://play.google.com/store/apps/details?id=com.eminence.a10xchampion&referrer=",
  WELCOME: 'WELCOME',
  COUNT: "COUNT",
  FETCH_COUNT: "FETCH_COUNT",
  productCatalogue: "http://10xchampions.grmrice.com/foodkraft-catalogue.pdf"
};
