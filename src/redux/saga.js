import { all, call, takeLatest, put } from 'redux-saga/effects';
import * as Navigation from '../navigation/navigation';
import * as Apiservice from '../services/Api';
import * as Actions from './action';
import * as Types from './types';
import { BackHandler } from 'react-native';
import Constant from '../utility/Constant';
import { store } from './store';
import { getFormattedAdress, showResponse } from '../utility/Index';
import I18n from '../services/i18n';
import { DeviceEventEmitter } from "react-native";




const getHomepageData = () => {
  store.dispatch(Actions.getPoints());
  store.dispatch(Actions.getOffers());
  store.dispatch(Actions.getRecipes());
  store.dispatch(Actions.getWinners());
  store.dispatch(Actions.getReviews());
  store.dispatch(Actions.getNotification());
  // store.dispatch(Actions.fetchYtVideos());
};


const getAddress = () => {
  store.dispatch(Actions.getAddressList());
};

function* getPoints({ type, payload }) {
  try {

    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.getPoints, { mobile: payload }); //calling Api
    console.log({ response });
    yield put({ type: Types.POINTS, payload: response }); //hide loading
    yield put({ type: Types.SET_LOADING, payload: false });
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* verifyOtp({ type, payload }) {
  try {
    const code = store.getState().getRefferCode;
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    if (payload.loginType != 1 && code && code.length) {
      payload.referral_by = code;
    }
    let response = yield call(Apiservice.verifyOtp, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    showResponse(response);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading

    // Navigation.navigate('Tutorial', {
    //   userInfo: response,
    // });

    if (response && response.status) {
      if (payload.loginType == 1) {
        // Navigation.navigate('Tutorial', {
        //   userInfo: response,
        // });
        yield put({ type: Types.USER, payload: response });
      } else {
        Navigation.navigate('Tutorial', {
          userInfo: response,
        });
        yield put({ type: Types.REFFER_CODE, payload: null });
        yield put({ type: Types.FIRST_LOGIN, payload: true });
      }
      // yield put({ type: Types.FIRST_LOGIN, payload: true });
      // DeviceEventEmitter.emit(Constant.WELCOME);
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

function* sendRecipeReview({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.sendRecipeReview, payload); //calling Api
    console.log('response in Receipe View', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      Navigation.goBack();
      // showResponse({message: 'Receipe Review submitted . . .'});
      // yield put({ type: Types.USER, payload: response }); //hide loading
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* sendFeedback({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.sendFeedback, payload); //calling Api
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      Navigation.goBack();
      showResponse({ message: 'Feedback submitted . . .' });
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

function* getHomeData({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true });
    let res = yield all([
      call(Apiservice.getBanners),
      call(Apiservice.getPoints),
      call(Apiservice.getOffers),
      call(Apiservice.getRecipes),
      call(Apiservice.getWinners),
      call(Apiservice.getNotification),
      call(Apiservice.getYoutubeVideo),
    ]); //calling Api
    debugger
    if (res && res[0]['data']) {
      for (let i = 0; i < res[0]['data'].length; i++) {
        res[0]['data'][i].image = Constant.IMAGE_URL + res[0]['data'][i].image;
      }
    }
    if (res && res[5]['data']) {
      let data = [
        {
          title: I18n.t('Today'),
          data: [],
          today: true,
        },
        {
          title: I18n.t('Earlier'),
          data: [],
          today: false,
        },
      ];
      for (let i = 0; i < res[5]['data'].length; i++) {
        let isToday =
          res[5]['data'][i].created_at.split(' ')[0].split('-')[0] ==
          new Date().getDate();
        data[isToday ? 0 : 1].data.push(res[5]['data'][i]);
      }
      for (let i = 0; i < data.length; i++) {
        if (!data[i].data.length) {
          data.splice(i, 1);
          i--;
        }
      }
      yield put({ type: Types.NOTIFICATIONS, payload: res[5]['data'] }); //set notification
    }
    console.log('response in getHomeData saga', res);
    yield put({ type: Types.BANNERS_LIST, payload: res[0]['data'] ? res[0]['data'] : [] }); //set banner
    yield put({ type: Types.POINTS, payload: res[1] }); //set points
    yield put({ type: Types.OFFERS, payload: res[2]['data'] ? res[2]['data'] : [] }); //set offers
    yield put({ type: Types.RECIPES, payload: res[3]['data'] ? res[3]['data'] : [] }); //set recipies
    yield put({ type: Types.WINNERS, payload: res[4]['data'] ? res[4]['data'] : [] }); //set winners
    yield put({ type: Types.YOUTUBE_LIST, payload: res[6]['data'] ? res[6]['data'] : [] }); //set winners
    yield put({ type: Types.SET_LOADING, payload: false });

  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false });
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
    yield put({ type: Types.BANNERS_LIST, payload: response.data }); //hide loading
    yield put({ type: Types.SET_LOADING, payload: false });

  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false });
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
    showResponse(response);
    if (response && response.status) {
      yield put({ type: Types.GET_HOME_DATA }); //getting home page data
      yield put({ type: Types.IS_SUCCESS, payload: true }); //setSuccessModal true
    } else yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
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
        let response2 = yield call(Apiservice.updateProfileApi, payload); //calling Api
        showResponse(response2);

        if (response2 && response.status) {
          yield put({ type: Types.USER, payload: payload });
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
    payload.id = payload?.user_id;
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
    } else {
      yield put({ type: Types.ADDRESS_LIST, payload: [] });
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

    if (response && response.status) {
      yield put({ type: Types.OFFERS, payload: response.data });
    } else showResponse(response);
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

    if (response && response.status) {
      yield put({ type: Types.GET_HOME_DATA }); //getting home page data

      yield put({ type: Types.GET_OFFER_DETAIL, payload }); //hide loading
      yield put({ type: Types.IS_SUCCESS, payload: true });
    } else Navigation.goBack();
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getAppReviews({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.getAppReviews, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      yield put({ type: Types.REVIEWS, payload: response.data }); //hide loading
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getRecipes({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.getRecipes, payload); //calling Api

    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      yield put({ type: Types.RECIPES, payload: response.data }); //hide loading
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getWinners({ type, payload }) {
  try {
    let response = yield call(Apiservice.getWinners, payload); //calling Api
    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      yield put({ type: Types.WINNERS, payload: response.data }); //hide loading
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getTransactionCategory({ type, payload }) {
  if (payload.user_id) {
    try {
      let response = yield call(Apiservice.getTransactionByCategory, payload); //calling Api
      console.log('response in saga', JSON.stringify(response));
      yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
      if (response && response.status) {
        yield put({ type: Types.TRANSACTION_CATEGORY, payload: response.data }); //hide loading
      } else showResponse(response);
    } catch (error) {
      console.log(error);
      yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    }
  }
}

function* addAdress({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading

    let response;
    if (payload.address_id && payload.address_id != '') {
      response = yield call(Apiservice.updateAddress, payload);
    } else {
      response = yield call(Apiservice.addAdress, payload);
      response = yield call(Apiservice.updateAddress, payload); //calling Api
    }
    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      getAddress();
      Navigation.goBack();
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* deleteAddress({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading
    let response = yield call(Apiservice.deleteAddress, payload); //calling Api
    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      getAddress();
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getNotification({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.getNotification, payload); //calling Api
    console.log('response in getNotification saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status) {
      let data = [
        {
          title: I18n.t('Today'),
          data: [],
          today: true,
        },
        {
          title: I18n.t('Earlier'),
          data: [],
          today: false,
        },
      ];
      for (let i = 0; i < response.data.length; i++) {
        let isToday =
          response.data[i].created_at.split(' ')[0].split('-')[0] ==
          new Date().getDate();
        data[isToday ? 0 : 1].data.push(response.data[i]);
      }
      for (let i = 0; i < data.length; i++) {
        if (!data[i].data.length) {
          data.splice(i, 1);
          i--;
        }
      }
      // data.splice(0, 1);
      yield put({ type: Types.NOTIFICATIONS, payload: data }); //set data
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getTransaction({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.getTransaction, payload); //calling Api
    console.log('response in getTransaction saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status) {
      yield put({ type: Types.TRANSACTIONS, payload: response.data }); //set data
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getOfferDetail({ type, payload }) {
  try {
    if (payload?.offer_id) {
      yield put({ type: Types.SET_LOADING, payload: true }); //show loading
      let response = yield call(Apiservice.getOfferDetail, payload); //calling Api
      console.log('response in getTransaction saga', JSON.stringify(response));
      yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
      showResponse(response);
      if (response && response.status) {
        yield put({ type: Types.OFFER_DETAIL, payload: response.data[0] }); //set data
      }
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getReceipeDetail({ type, payload }) {
  try {
    if (payload?.recipe_id) {
      yield put({ type: Types.SET_LOADING, payload: true }); //show loading
      let ReceipeInfo = {
        recipe_id: payload?.recipe_id,
      };
      let response = yield call(Apiservice.getReceipeDetail, ReceipeInfo); //calling Api
      console.log(
        'response in getResponse detail saga',
        JSON.stringify(response),
      );
      yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
      showResponse(response);
      if (response && response.status) {
        yield put({ type: Types.GET_RECEIPE_DETAIL, payload: response.data[0] }); //set data
      }
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* signUp({ type, payload }) {
  try {
    let token = store.getState().getFcmToken;
    let data = payload.userInfoModify ? payload.userInfoModify : payload;
    data.device_id = token ? token : 'N/A';
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading
    let response = yield call(Apiservice.signUp, data);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      if (response.status == 10) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
        if (payload?.userInfoModify?.loginFrom == 'social') {
          yield put({ type: Types.USER, payload: response });
        } else {
          // store.dispatch(Actions.sendFcmOTP({
          //   mobile: payload.mobile,
          //   name: response.name,
          //   login: false,
          //   device_id: token
          // }));
          Navigation.navigate('Otp', {
            mobile: payload,
            name: response.name,
            login: false,
          });
        }
      }
    } else {
      showResponse(response);
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* login({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    const response = yield call(Apiservice.loginApi, { mobile: payload });
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      if (response.status == 10 && response.id) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
        // store.dispatch(Actions.sendFcmOTP({
        //   mobile: payload,
        //   name: response.name,
        //   login: true
        // }));
        Navigation.navigate('Otp', {
          mobile: payload,
          name: response.name,
          login: true,
        });
      }
    }
    showResponse(response);
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* sendFcmOTP({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    const confirmation = yield call(Apiservice.sendFcmOTP, payload.mobile); //calling Api
    console.log('response in sendFcmOTP saga', JSON.stringify(confirmation));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse({ message: 'Otp sent successfully . . .' });
    if (confirmation) {
      payload.confirmation = confirmation;
      Navigation.navigate('Otp', payload);
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* confirmFcmOTP({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    let response = yield call(Apiservice.confirmFcmOTP, payload); //calling Api
    console.log('response in confirmFcmOTP saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    showResponse(response);
    if (response && response.status && response.id) {
      yield put({ type: Types.USER, payload: response }); //set user
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* getAddressLatLng({ type, payload }) {
  try {
    let response = yield call(Apiservice.fetchAddress, payload); //calling Api
    console.log("getAddressLatLng saga", response);
    if (response && response?.results && response?.results[0]) {
      yield put({
        type: Types.ADDRESS_LAT_LNG,
        payload: getFormattedAdress(response?.results[0], payload),
      });
      yield put({ type: Types.UPDATE_LOCATION });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateLocation({ type, payload }) {
  try {
    const response = yield call(Apiservice.updateLocation);
    yield put({ type: Types.SET_LOADING, payload: false });
    // showResponse(response);
    console.log("update location saga response", response);
  } catch (error) {
    console.log(error);
  }
}

function* getAboutUs({ type, payload }) {
  try {
    console.log('init payload');
    let response = yield call(Apiservice.getContent, payload); //calling Api
    if (response && response?.status && response?.status == 1) {
      yield put({
        type: Types.SET_ABOUT_US,
        payload: response?.about,
      }); //set user
    }
  } catch (error) {
    console.log(error);
  }
}

function* getTancC({ type, payload }) {
  try {
    console.log('init payload');
    let response = yield call(Apiservice.getContent, payload); //calling Api
    if (response && response?.status && response?.status == 1) {
      yield put({
        type: Types.SET_TANDC,
        payload: response?.term_condition,
      }); //set user
    }
  } catch (error) {
    console.log(error);
  }
}

function* getVideos({ type, payload }) {
  try {
    console.log('init payload');
    let response = yield call(Apiservice.getVideos, payload); //calling Api
    if (response && response?.status && response?.status == 1) {
      yield put({
        type: Types.SET_VIDEOS,
        payload: response?.data,
      }); //set user
    }
  } catch (error) {
    console.log(error);
  }
}

function* getPrivacyPolicy({ type, payload }) {
  try {
    console.log('init payload');
    let response = yield call(Apiservice.getContent, payload); //calling Api
    if (response && response?.status && response?.status == 1) {
      yield put({
        type: Types.SET_PRIVACY_POLICY,
        payload: response?.privacy_policy,
      }); //set user
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchYtVideos({ type, payload }) {
  try {
    // yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    let response = yield call(Apiservice.getYoutubeVideo, payload); //calling Api
    console.log('response in saga', JSON.stringify(response));
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      yield put({ type: Types.YOUTUBE_LIST, payload: response.data }); //hide loading
    } else showResponse(response);
  } catch (error) {
    console.log(error);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

// Watcher
export default function* watcher() {
  // Take Last Action Only
  yield takeLatest(Types.SET_TANDC, getTancC);
  yield takeLatest(Types.GET_HOME_DATA, getHomeData);
  yield takeLatest(Types.SET_PRIVACY_POLICY, getPrivacyPolicy);
  yield takeLatest(Types.SET_ABOUT_US, getAboutUs);
  yield takeLatest(Types.SEND_FCM_OTP, sendFcmOTP);
  yield takeLatest(Types.CONFIRM_FCM_OTP, confirmFcmOTP);
  yield takeLatest(Types.DO_LOGIN, login);
  yield takeLatest(Types.RESEND_OTP, resendOtp);
  yield takeLatest(Types.GET_BANNERS, getBanners);
  yield takeLatest(Types.VERIFY_OTP, verifyOtp);
  yield takeLatest(Types.LOG_OUT, logOut);
  yield takeLatest(Types.SIGN_UP, signUp);
  yield takeLatest(Types.GET_POINTS, getPoints);
  yield takeLatest(Types.SCAN_QR, scanQr);
  yield takeLatest(Types.HELP, help);
  yield takeLatest(Types.SEND_FEEDBACK, sendRecipeReview);
  yield takeLatest(Types.SEND_QUERY, sendQuery);
  yield takeLatest(Types.UPLOAD_IMAGE, uploadImage);
  yield takeLatest(Types.UPLOAD_ADHAR_IMAGE, uploadAdharImage);
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile);
  yield takeLatest(Types.GET_ADDRESS_LIST, getAddressList);
  yield takeLatest(Types.GET_OFFERS, getOffers);
  yield takeLatest(Types.REDEEM_OFFER, redeemOffer);
  yield takeLatest(Types.GET_REVIEWS, getAppReviews);
  yield takeLatest(Types.GET_RECIPES, getRecipes);
  yield takeLatest(Types.GET_WINNERS, getWinners);
  yield takeLatest(Types.TRANSACTION_CATEGORY, getTransactionCategory);
  yield takeLatest(Types.ADD_ADDRESS, addAdress);
  yield takeLatest(Types.DELETE_ADDRESS, deleteAddress);
  yield takeLatest(Types.GET_NOTIFICATIONS, getNotification);
  yield takeLatest(Types.GET_TRANSACTIONS, getTransaction);
  yield takeLatest(Types.GET_OFFER_DETAIL, getOfferDetail);
  yield takeLatest(Types.GET_RECEIPE_DETAIL, getReceipeDetail);
  yield takeLatest(Types.GET_ADDRESS_LAT_LNG, getAddressLatLng);
  yield takeLatest(Types.SEND_FEEDBACK, sendFeedback);
  yield takeLatest(Types.UPDATE_LOCATION, updateLocation);
  yield takeLatest(Types.GET_VIDEOS, getVideos);
  yield takeLatest(Types.GET_YOUTUBE_LIST, fetchYtVideos);
}
