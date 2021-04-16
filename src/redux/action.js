import * as Types from './types';

export function doLogin(payload) {
  return {
    type: Types.DO_LOGIN,
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

export function scanQr(payload) {
  return {
    type: Types.SCAN_QR,
    payload,
  };
}

export function setRtl(payload) {
  return {
    type: Types.IS_RTL,
    payload
  }
}

export function setSuccessModal(payload) {
  return {
    type: Types.IS_SUCCESS,
    payload
  }
}

export function setLanguage(payload) {
  return {
    type: Types.LANGUAGE,
    payload
  }
}

export function verifyOtp(payload) {
  return {
    type: Types.VERIFY_OTP,
    payload
  }
}

export function logOut(payload) {
  return {
    type: Types.LOG_OUT,
    payload
  }
}

export function signUp(payload) {
  return {
    type: Types.SIGN_UP,
    payload
  }
}

// add another actions further
