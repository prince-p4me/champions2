import { Dimensions } from 'react-native';
// const baseUrl = 'http://10xchampions.grmrice.com/';
const baseUrl = 'http://drive13.in/10X/';
export default Constants = {
  API_URL: baseUrl + 'api/',
  IMAGE_URL: baseUrl + 'images/',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  GOOGLE_CLIENT_ID: '190017235730-gi6fvvnrdotf203a29vvd70e43g0h5rv.apps.googleusercontent.com',
  firebaseConfig: {
    apiKey: 'AIzaSyCw0q516IzpNPo-A8zFy714rCxh06DIlc8',
    authDomain: '190017235730.firebaseapp.com',
    databaseURL: 'https://190017235730.firebaseio.com',
    projectId: '190017235730',
    storageBucket: '190017235730.appspot.com',
    messagingSenderId: '190017235730',
    appId: '1:190017235730:ios:546987123daf418684e1cb',
  }
};
