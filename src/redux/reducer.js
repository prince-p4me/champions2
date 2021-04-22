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

export const getOffers = (state = points, action) => {
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

export const getUserAddress = (state = {}, action) => {
  switch (action.type) {
    case Types.USER_ADDRESS_LIST:
      return action.payload;
    default:
      // return state;
      return [];
  }
};
