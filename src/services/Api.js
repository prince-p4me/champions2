import Constants from '../utility/Constant';
import { store } from '../redux/store';
import { BackHandler, Alert } from 'react-native';
import { showResponse } from '../utility/Index';
import auth from '@react-native-firebase/auth';
import axios from "axios";
import { setLoading } from '../redux/action';
import Geocoder from 'react-native-geocoding';

async function callApi(urlString, body, methodType) {
  console.log('-----------AXIOS  Api request is----------- ');
  console.log('url string ' + urlString);
  console.log('methodType ' + methodType);
  // console.log('body ' + JSON.stringify(body));
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: methodType,
    headers,
  };
  if (methodType == 'POST' || methodType == 'PUT') {
    options.body = {};
    if (body) {
      options.body = JSON.stringify(body);
    }
  }
  console.log('options', options);
  try {
    console.log("Starting api");
    const response = await fetch(urlString, options);
    console.log({ response });
    const jsonResposne = await response.json();

    // let jsonResposne = await axios({
    //   method: methodType, //you can set what request you want to be
    //   url: urlString,
    //   data: (methodType != "GET" && body) ? JSON.stringify(body) : null,
    //   headers: headers,
    // });
    // console.log('result :--', JSON.stringify(jsonResposne));
    // if (jsonResposne.data) {
    //   jsonResposne.data.status = jsonResposne.status;
    // }
    if (jsonResposne && jsonResposne.status && jsonResposne.status == 100) {
      Toast.showWithGravity(
        'Your account has been suspended . . .',
        Toast.SHORT,
        Toast.BOTTOM,
      );
      setTimeout(() => {
        BackHandler.exitApp();
      }, 1000);
    } else {
      return jsonResposne;
    }
  } catch (error) {
    console.log('error :--', JSON.stringify(error));
    store.dispatch(setLoading(false));
    return error;
  }
}

export function loginApi(body) {
  console.log('----------Login Api Call ------------------');
  return callApi(Constants.API_URL + 'user_login.php', body, 'POST');
}

export function signUp(body) {
  body.os_type = "iOS";
  console.log('----------Sign up Api Call ------------------');
  return callApi(Constants.API_URL + 'user_signup.php', body, 'POST');
}

export function getPoints(body) {
  const state = store.getState();
  let obj = {
    user_id: state.getUser.id,
  };
  console.log('----------Points Api Call ------------------');
  return callApi(Constants.API_URL + 'points.php', obj, 'POST');
}

export function getOffers(body) {
  const state = store.getState();
  let obj = {
    user_id: state.getUser.id,
  };
  console.log('----------Points Api Call ------------------');
  return callApi(Constants.API_URL + 'offer_list.php', obj, 'POST');
}

export function resendOtp(body) {
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'user_resend_otp.php', body, 'POST');
}

export function getBanners(body) {
  console.log('----------getBanners Api Call ------------------');
  return callApi(Constants.API_URL + 'banner_list.php', body, 'GET');
}

export function scanQr(body) {
  const state = store.getState();
  body.user_id = state.getUser.id;
  console.log('----------scanQr Api Call ------------------');
  return callApi(Constants.API_URL + 'scan_qr.php', body, 'POST')
    .then(data => {
      console.log("scanning success", data);
      return data;
    }).catch(err => {
      console.log("error in scanning", err);
      return err;
    });
}

export function verifyOtp(body) {
  body.os_type = "iOS";
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'user_otp_verify.php', body, 'POST');
}

export function help(body) {
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'user_call_request.php', body, 'POST');
}

export function sendQuery(body) {
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'user_query.php', body, 'POST');
}

export function uploadApi(body) {
  console.log('----------Upload Api Call ------------------');
  return callApi(Constants.API_URL + 'user_photo_update.php', body, 'POST');
}

export function updateProfileApi(body) {
  console.log('----------updateProfileApi Call ------------------');
  return callApi(Constants.API_URL + 'user_profile_update.php', body, 'POST');
}

export function getAddressList() {
  const state = store.getState();
  let obj = {
    user_id: state.getUser.id,
  };
  console.log('----------Address Api Call ------------------');
  return callApi(Constants.API_URL + 'user_address_list.php', obj, 'POST');
}

export function redeemOffer(body) {
  const state = store.getState();
  body.user_id = state.getUser.id;
  console.log('----------redeemOffer Api Call ------------------');
  return callApi(Constants.API_URL + 'redeem_offer.php', body, 'POST');
}

export function getAppReviews(body) {
  console.log('----------getAppReviews Api Call ------------------');
  return callApi(Constants.API_URL + 'app_feedback_list.php', body, 'GET');
}

export function getRecipes(body) {
  console.log('----------getRecipe Api Call ------------------');
  return callApi(Constants.API_URL + 'recipe_list.php', body, 'GET');
}

export function getWinners(body) {
  console.log('----------getWinners Api Call ------------------');
  return callApi(Constants.API_URL + 'winner_list.php', body, 'GET');
}

export function sendRecipeReview(body) {
  console.log('----------Send RecipeReview Api Call ------------------');
  return callApi(Constants.API_URL + 'recipe_review_add.php', body, 'POST');
}

export function getTransactionByCategory(body) {
  console.log('----------Get Transaction Category Api Call ------------------');
  return callApi(
    Constants.API_URL + 'transaction_by_category.php',
    body,
    'POST',
  );
}

export function addAdress(body) {
  console.log('----------Add Api Call ------------------');
  return callApi(Constants.API_URL + 'user_address_add.php', body, 'POST');
}

export function updateAddress(body) {
  console.log('----------Update Api Call ------------------');
  return callApi(Constants.API_URL + 'user_address_update.php', body, 'POST');
}

export function deleteAddress(body) {
  console.log('----------Delete Api Call ------------------');
  return callApi(Constants.API_URL + 'user_address_delete.php', body, 'POST');
}

export function getNotification() {
  const state = store.getState();
  console.log('----------getNotification Api Call ------------------');
  return callApi(
    Constants.API_URL + 'user_notification.php',
    { user_id: state.getUser.id },
    'POST',
  );
}

export function getTransaction() {
  const state = store.getState();
  console.log('----------getTransaction Api Call ------------------');
  return callApi(
    Constants.API_URL + 'user_transaction_list.php',
    { user_id: state.getUser.id },
    'POST',
  );
}

export function getOfferDetail(data) {
  const state = store.getState();
  data.user_id = state.getUser.id;
  console.log('----------getOfferDetail Api Call ------------------');
  return callApi(Constants.API_URL + 'offer_details.php', data, 'POST');
}

export function confirmFcmOTP(data) {
  console.log('----------confirmFcmOTP Api Call ------------------');
  return callApi(Constants.API_URL + 'user_otp_verify.php', data, 'POST');
}

export async function sendFcmOTP(mobile) {
  console.log('mobile', mobile);
  try {
    const confirmation = await auth().signInWithPhoneNumber('+91' + mobile);
    return confirmation;
  } catch (error) {
    console.log('error', error);
    Alert.alert('Error', error);
  }
}

export function getReceipeDetail(data) {
  console.log('----------getRecipeDetail Api Call ------------------');
  return callApi(Constants.API_URL + 'recipe_details.php', data, 'POST');
}

export function getAddressLatLng(data) {
  console.log('----------getAddressLatLng Api Call ------------------');
  const config = store.getState().getConfig;
  console.log("map key:--", config?.googleApiKey)
  let url =
    Constants.ADDRESS_URL +
    '' +
    data.latitude +
    ',' +
    data.longitude +
    '&key=' +
    config?.googleApiKey;

  console.log(url);
  return callApi(url, null, 'GET');
}

export function getContent() {
  console.log('----------getContent Api Call ------------------');
  return callApi(Constants.API_URL + 'content.php', {}, 'GET');
}

export function getVideos() {
  console.log('----------getVideos Api Call ------------------');
  return callApi(Constants.API_URL + 'videos.php', {}, 'GET');
}

export function getYoutubeVideo() {
  console.log('----------getYTVideos Api Call ------------------');
  return callApi(Constants.API_URL + 'videos.php', {}, 'GET');
}


export function sendFeedback(data) {
  console.log('----------sendFeedback Api Call ------------------');
  return callApi(Constants.API_URL + 'user_app_feedback.php', data, 'POST');
}

export function fetchAddress(data) {
  console.log('----------fetchAddress Api Call ------------------');
  return Geocoder.from(data.latitude, data.longitude);
}

export function updateLocation() {
  console.log('----------updateLocation Api Call ------------------');
  const address = store.getState().getAddressLatLng;
  let data = { ...address };
  data.user_id = store.getState().getUser.id;
  return callApi(Constants.API_URL + 'location_update.php', data, 'POST');
}