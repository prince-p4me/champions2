import { delay, call, takeLatest, put } from 'redux-saga/effects';
import * as Navigation from '../navigation/navigation';
import * as Apiservice from '../services/Api';
import * as Actions from './action';
import * as Types from './types';
import { BackHandler } from 'react-native';
import Constant from '../utility/Constant';
import { store } from './store';
import { showResponse } from '../utility/Index';

function* getPoints({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.getPoints, { mobile: payload }); //calling Api
    yield put({ type: Types.POINTS, payload: response }); //hide loading
    yield put({ type: Types.SET_LOADING, payload: false });
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* verifyOtp({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.verifyOtp, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    showResponse(response);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      yield put({ type: Types.USER, payload: response }); //hide loading
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* help({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.help, payload); //calling Api

    console.log('response in help saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      Navigation.goBack();
      showResponse({ message: 'Query has been sent successfully . . .' });
      // yield put({ type: Types.USER, payload: response }); //hide loading
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* resendOtp({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.resendOtp, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    showResponse(response);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getBanners({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true });
    let response = yield call(Apiservice.getBanners); //calling Api
    if (response && response.data) {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].image = Constant.IMAGE_URL + response.data[i].image;
      }
    }
    // console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.BANNERS_LIST, payload: response.data }); //hide loading
    yield put({ type: Types.SET_LOADING, payload: false });
    store.dispatch(Actions.getPoints());
    store.dispatch(Actions.getOffers());
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false });
  }
}

function* login({ type, payload }) {
  try {
    //yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.loginApi, { mobile: payload }); //calling Api
    showResponse(response);
    if (response && response.status) {
      if (response.status == 10) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
        Navigation.navigate('Otp', {
          mobile: payload,
          name: response.name,
          login: true,
        });
      }
    }

    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* signUp({ type, payload }) {
  try {
    //yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.signUp, payload); //calling Api
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response.status == 10) {
      yield put({ type: Types.USER, payload: response }); //set user
    } else {
      Navigation.navigate('Otp', {
        mobile: payload,
        name: response.name,
        login: false,
      });
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* logOut({ type, payload }) {
  try {
    //yield put({ type: Types.SET_LOADING, payload: true });
    yield put({ type: Types.USER, payload: {} });
    yield put({ type: Types.SET_LOADING, payload: false });
    showResponse({ message: 'Logged out successfully . . .' });
    setTimeout(() => {
      BackHandler.exitApp();
    }, 1000);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false });
  }
}

function* scanQr({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.scanQr, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status) {
      store.dispatch(Actions.getPoints());
      store.dispatch(Actions.getOffers());
      store.dispatch(Actions.setSuccessModal(true));
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* sendQuery({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.sendQuery, payload); //calling Api

    console.log('response in sendQuery saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status) {
      // store.dispatch(Actions.getPoints());
      // store.dispatch(Actions.setSuccessModal(true));
      Navigation.goBack();
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* uploadImage({ type, payload }) {
  try {
    let payload2 = {
      user_id: payload.id,
      profile_photo: payload.profile_photo,
    };
    let response = yield call(Apiservice.uploadApi, payload2); //calling Api
    if (response && response.status) {
      payload.profile_photo = response.profile_photo;
      try {
        let response = yield call(Apiservice.updateProfileApi, payload); //calling Api
        showResponse(response);
        yield put({ type: Types.USER, payload: payload });
        if (response && response.status) {
        }
      } catch (error) {
        console.log('upload error login', JSON.stringify(error));
      }
    }
  } catch (error) { }
}

function* updateProfile({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading
    let response = yield call(Apiservice.updateProfileApi, payload); //calling Api
    showResponse(response);
    yield put({ type: Types.USER, payload: payload });
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  } catch (error) {
    console.log('upload error login', JSON.stringify(error));
  }
}

function* uploadAdharImage({ type, payload }) {
  try {
    let payload2 = {
      user_id: payload.user_id,
      aadhaar_photo: payload.aadhaar_photo,
    };
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading

    let response = yield call(Apiservice.uploadApi, payload2); //calling Api
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status) {
      payload.aadhaar_photo = response.profile_photo;
      yield put({ type: Types.USER, payload: payload });
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getAddressList({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading

    let response = yield call(Apiservice.getAddressList, payload); //calling Api

    console.log({ response: response });
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading

    showResponse(response);
    if (response && response.status) {
      yield put({ type: Types.ADDRESS_LIST, payload: response.data });
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getOffers({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //hide loading

    let response = yield call(Apiservice.getOffers, payload); //calling Api

    console.log({ response: response });
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading

    showResponse(response);
    if (response && response.status) {
      yield put({ type: Types.OFFERS, payload: response.data });
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* redeemOffer({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.redeemOffer, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    store.dispatch(Actions.setSuccessModal(true));
    if (response && response.status) {
      Navigation.goBack();
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

// Watcher
export default function* watcher() {
  // Take Last Action Only
  yield takeLatest(Types.DO_LOGIN, login);
  yield takeLatest(Types.RESEND_OTP, resendOtp);
  yield takeLatest(Types.GET_BANNERS, getBanners);
  yield takeLatest(Types.VERIFY_OTP, verifyOtp);
  yield takeLatest(Types.LOG_OUT, logOut);
  yield takeLatest(Types.SIGN_UP, signUp);
  yield takeLatest(Types.GET_POINTS, getPoints);
  yield takeLatest(Types.SCAN_QR, scanQr);
  yield takeLatest(Types.HELP, help);
  yield takeLatest(Types.SEND_QUERY, sendQuery);
  yield takeLatest(Types.UPLOAD_IMAGE, uploadImage);
  yield takeLatest(Types.UPLOAD_ADHAR_IMAGE, uploadAdharImage);
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile);
  yield takeLatest(Types.GET_ADDRESS_LIST, getAddressList);
  yield takeLatest(Types.GET_OFFERS, getOffers);
  yield takeLatest(Types.REDEEM_OFFER, redeemOffer);
}
