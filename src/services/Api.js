import Constants from '../utility/Constant';
import { store } from "../redux/store";
import { BackHandler } from "react-native";
import { showResponse } from "../utility/Index";

async function callApi(urlString, body, methodType) {
  console.log('-----------AXIOS  Api request is----------- ');
  console.log('url string ' + urlString);
  console.log('methodType ' + methodType);
  console.log('body ' + JSON.stringify(body));
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = {
    method: methodType,
    headers
  };
  if (methodType == 'POST' || methodType == 'PUT') {
    options.body = {};
    if (body) {
      options.body = JSON.stringify(body);
    }
  }
  console.log("options", options);
  try {
    const response = await fetch(urlString, options);
    const jsonResposne = await response.json();
    console.log('result :--', JSON.stringify(jsonResposne));
    if (jsonResposne && jsonResposne.status && jsonResposne.status == 100) {
      Toast.showWithGravity("Your account has been suspended . . .", Toast.SHORT, Toast.BOTTOM);
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
    user_id: state.getUser.id
  };
  console.log('----------Points Api Call ------------------');
  return callApi(Constants.API_URL + 'points.php', obj, 'POST');
}

export function getOffers(body) {
  const state = store.getState();
  let obj = {
    user_id: state.getUser.id
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
  body.user_id = state.getUser.id
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