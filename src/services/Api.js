import Constants from '../utility/Constant';
import { store } from '../redux/store';
import { BackHandler, Alert } from 'react-native';
import { showResponse } from '../utility/Index';
import auth from '@react-native-firebase/auth';

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
    const response = await fetch(urlString, options);
    const jsonResposne = await response.json();
    console.log('result :--', JSON.stringify(jsonResposne));
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
    return error;
  }
}

export function loginApi(body) {
  console.log('----------Login Api Call ------------------');
  return callApi(Constants.API_URL + 'user_login.php', body, 'POST');
}

export function signUp(body) {
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
  return callApi(Constants.API_URL + 'scan_qr.php', body, 'POST');
}

export function verifyOtp(body) {
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'user_otp_verify.php', body, 'POST');
}

export function help(body) {
  console.log('----------resendOtp Api Call ------------------');
  return callApi(Constants.API_URL + 'help.php', body, 'POST');
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
  console.log("mobile", mobile);
  try {
    const confirmation = await auth().signInWithPhoneNumber("+91" + mobile);
    return confirmation;
  } catch (error) {
    console.log("error", error);
    Alert.alert("Error", error)
  }
}

export function getReceipeDetail(data) {
  console.log('----------getRecipeDetail Api Call ------------------');
  return callApi(Constants.API_URL + 'recipe_details.php', data, 'POST');
}
