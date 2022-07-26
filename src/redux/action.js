import * as Types from './types';

export function doLogin(payload) {
  return {
    type: Types.DO_LOGIN,
    payload,
  };
}

export function updateLocation(payload) {
  return {
    type: Types.UPDATE_LOCATION,
    payload,
  };
}

export function getVideos(payload) {
  return {
    type: Types.GET_VIDEOS,
    payload,
  };
}

export function help(payload) {
  return {
    type: Types.HELP,
    payload,
  };
}

export function sendFeedback(payload) {
  return {
    type: Types.SEND_FEEDBACK,
    payload,
  };
}

export function sendRecipeReview(payload) {
  return {
    type: Types.SEND_FEEDBACK,
    payload,
  };
}

export function sendQuery(payload) {
  return {
    type: Types.SEND_QUERY,
    payload,
  };
}

export function resendOtp(payload) {
  return {
    type: Types.RESEND_OTP,
    payload,
  };
}

export function getBanners(payload) {
  return {
    type: Types.GET_BANNERS,
    payload,
  };
}

export function getHomeData(payload) {
  return {
    type: Types.GET_HOME_DATA,
    payload,
  };
}


export function fetchYtVideos(payload) {
  return {
    type: Types.GET_YOUTUBE_LIST,
    payload,
  };
}

export function getOffers(payload) {
  return {
    type: Types.GET_OFFERS,
    payload,
  };
}

export function getPoints(payload) {
  return {
    type: Types.GET_POINTS,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: Types.SET_LOADING,
    payload,
  };
}

export function scanQr(payload) {
  return {
    type: Types.SCAN_QR,
    payload,
  };
}

export function setRtl(payload) {
  return {
    type: Types.IS_RTL,
    payload,
  };
}

export function setSuccessModal(payload) {
  return {
    type: Types.IS_SUCCESS,
    payload,
  };
}

export function setSuccessPoints(payload) {
  return {
    type: Types.SUCCESS_POINTS,
    payload,
  };
}

export function setLanguage(payload) {
  return {
    type: Types.LANGUAGE,
    payload,
  };
}

export function uploadImage(payload) {
  return {
    type: Types.UPLOAD_IMAGE,
    payload,
  };
}
export function uploadAdharImage(payload) {
  return {
    type: Types.UPLOAD_ADHAR_IMAGE,
    payload,
  };
}

export function updateProfile(payload) {
  return {
    type: Types.UPDATE_PROFILE,
    payload,
  };
}

export function verifyOtp(payload) {
  return {
    type: Types.VERIFY_OTP,
    payload,
  };
}

export function logOut(payload) {
  return {
    type: Types.LOG_OUT,
    payload,
  };
}

export function signUp(payload) {
  return {
    type: Types.SIGN_UP,
    payload,
  };
}

export function getAddressList(payload) {
  return {
    type: Types.GET_ADDRESS_LIST,
    payload,
  };
}

export function getReviews(payload) {
  return {
    type: Types.GET_REVIEWS,
    payload,
  };
}

export function getRecipes(payload) {
  return {
    type: Types.GET_RECIPES,
    payload,
  };
}

export function getWinners(payload) {
  return {
    type: Types.GET_WINNERS,
    payload,
  };
}

export function redeemOffer(payload) {
  return {
    type: Types.REDEEM_OFFER,
    payload,
  };
}

export function getTransactionCategory(payload) {
  return {
    type: Types.TRANSACTION_CATEGORY_SAGA,
    payload,
  };
}

export function updateUser(payload) {
  return {
    type: Types.USER,
    payload,
  };
}

export function setFirstUser(payload) {
  return {
    type: Types.FIRST_LOGIN,
    payload,
  };
}

export function setAddressLatLng(payload) {
  return {
    type: Types.ADDRESS_LAT_LNG,
    payload,
  };
};

export function getOfferDetail(payload) {
  return {
    type: Types.GET_OFFER_DETAIL,
    payload,
  };
}
export function getReceipeDetail(payload) {
  return {
    type: Types.GET_RECEIPE_DETAIL,
    payload,
  };
}

export function sendFcmOTP(payload) {
  return {
    type: Types.SEND_FCM_OTP,
    payload,
  };
}

export function confirmFcmOTP(payload) {
  return {
    type: Types.CONFIRM_FCM_OTP,
    payload,
  };
}

export function AddAdress(payload) {
  return {
    type: Types.ADD_ADDRESS,
    payload,
  };
}

export function DeleteAddress(payload) {
  return {
    type: Types.DELETE_ADDRESS,
    payload,
  };
}

export function getNotification(payload) {
  return {
    type: Types.GET_NOTIFICATIONS,
    payload,
  };
}

export function getTransaction(payload) {
  return {
    type: Types.GET_TRANSACTIONS,
    payload,
  };
}

export function setFcmToken(payload) {
  return {
    type: Types.FCM_TOKEN,
    payload,
  };
}

export function setCount(payload) {
  return {
    type: Types.NOTIFICATIONS_COUNT,
    payload,
  };
}

export function setConfig(payload) {
  return {
    type: Types.CONFIGS,
    payload
  }
}

export function setRefferCode(payload) {
  return {
    type: Types.REFFER_CODE,
    payload,
  };
}

export function getAddressLatLng(payload) {
  return {
    type: Types.GET_ADDRESS_LAT_LNG,
    payload,
  };
}

export function getAboutUs(payload) {
  return {
    type: Types.SET_ABOUT_US,
    payload,
  };
}

export function getContents(payload) {
  return {
    type: Types.GET_CONTENT,
    payload,
  };
}

export function getTancC(payload) {
  return {
    type: Types.SET_TANDC,
    payload,
  };
}

export function getProfile(payload) {
  return {
    type: Types.GET_PROFILE,
    payload,
  };
}

// add another actions further
