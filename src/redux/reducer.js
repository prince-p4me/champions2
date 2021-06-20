import * as Types from './types';
let user = {
  status: 1,
  message: 'Login Successfully!!',
  id: '23',
  name: 'Prince Kumar',
  email: '',
  mobile: '8285724681',
  birth_date: '',
  aadhaar_number: '',
  aadhaar_photo: '',
  profile_photo: '',
};

let points = {
  total_earned: '0',
  total_redeemed: '0',
  balance: 0,
};

export const getBanners = (state = [], action) => {
  switch (action.type) {
    case Types.BANNERS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const getPoints = (state = points, action) => {
  switch (action.type) {
    case Types.POINTS:
      return action.payload;
    default:
      return state;
  }
};

export const getOffers = (state = [], action) => {
  switch (action.type) {
    case Types.OFFERS:
      return action.payload;
    default:
      return state;
  }
};

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case Types.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const isSuccess = (state = false, action) => {
  switch (action.type) {
    case Types.IS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const isRtl = (state = false, action) => {
  switch (action.type) {
    case Types.IS_RTL:
      return action.payload;
    default:
      return state;
  }
};

export const getLanguage = (state = 'en', action) => {
  switch (action.type) {
    case Types.LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

export const getUser = (state = {}, action) => {
  switch (action.type) {
    case Types.USER:
      return action.payload;
    default:
      return state;
  }
};

export const isFirstUser = (state = false, action) => {
  switch (action.type) {
    case Types.FIRST_LOGIN:
      return action.payload;
    default:
      return state;
  }
};

export const getAddressList = (state = [], action) => {
  switch (action.type) {
    case Types.ADDRESS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const getReviews = (state = [], action) => {
  switch (action.type) {
    case Types.REVIEWS:
      return action.payload;
    default:
      return state;
  }
};

export const getRecipes = (state = [], action) => {
  switch (action.type) {
    case Types.RECIPES:
      return action.payload;
    default:
      return state;
  }
};

export const getWinners = (state = [], action) => {
  switch (action.type) {
    case Types.WINNERS:
      return action.payload;
    default:
      return state;
  }
};

export const getTransactionByCategory = (state = [], action) => {
  switch (action.type) {
    case Types.TRANSACTION_CATEGORY:
      return action.payload;
    default:
      return [];
  }
};

export const getOfferDetail = (state = {}, action) => {
  switch (action.type) {
    case Types.OFFER_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
export const getReceipeDetail = (state = {}, action) => {
  switch (action.type) {
    case Types.GET_RECEIPE_DETAIL:
      return action.payload;
    default:
      return state;
  }
};

export const getNotification = (state = [], action) => {
  switch (action.type) {
    case Types.NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
};

export const getTransaction = (state = [], action) => {
  switch (action.type) {
    case Types.TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
};

export const getFcmToken = (state = null, action) => {
  switch (action.type) {
    case Types.FCM_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const getAddressLatLng = (state = null, action) => {
  switch (action.type) {
    case Types.ADDRESS_LAT_LNG:
      return action.payload;
    default:
      return state;
  }
};

export const getAboutUs = (state = null, action) => {
  switch (action.type) {
    case Types.SET_ABOUT_US:
      return action.payload;
    default:
      return state;
  }
};

export const getTancC = (state = null, action) => {
  switch (action.type) {
    case Types.SET_TANDC:
      return action.payload;
    default:
      return state;
  }
};

export const getCount = (state = 0, action) => {
  switch (action.type) {
    case Types.NOTIFICATIONS_COUNT:
      return action.payload;
    default:
      return state;
  }
};

export const getRefferCode = (state = null, action) => {
  switch (action.type) {
    case Types.REFFER_CODE:
      return action.payload;
    default:
      return state;
  }
};

export const getPrivacyPolicy = (state = null, action) => {
  switch (action.type) {
    case Types.SET_PRIVACY_POLICY:
      return action.payload;
    default:
      return state;
  }
};

export const getStates = (state = [], action) => {
  let statelist = [
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Arunachal Pradesh' },
    { id: 3, name: 'Assam' },
    { id: 4, name: 'Bihar' },
    { id: 5, name: 'Chattisgarh' },
    { id: 6, name: 'Goa' },
    { id: 7, name: 'New Delhi' },
    { id: 8, name: 'Gujrat' },
    { id: 9, name: 'Haryana' },
    { id: 10, name: 'Himachal Pradesh' },
    { id: 11, name: 'Jammu and Kashmir' },
    { id: 12, name: 'JharKand' },
    { id: 13, name: 'Karnatka' },
    { id: 14, name: 'Kerla' },
    { id: 15, name: 'Madhya Pradesh' },
    { id: 16, name: 'Maharashtra' },
    { id: 17, name: 'Manipur' },
    { id: 18, name: 'Mizoram' },
    { id: 19, name: 'Nagaland' },
  ];
  switch (action.type) {
    case Types.STATE_LIST:
      return statelist;
    default:
      return statelist;
  }
};
