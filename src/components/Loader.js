import React, { Component, useEffect } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from '../utility/Constant';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../redux/action';

const Loader = () => {
  const loading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(Actions.setLoading(false));
    }, 5000);
    return () => {
      if (timer) {
        clearTimeout(timer);
        console.log("cleared", timer);
      }
    }
  }, []);

  return (
    <Spinner
      size="large"
      visible={loading}
      color={Constants.color}
      textContent={'Please wait . . .'}
      textStyle={{ color: 'white', fontWeight: 'bold' }}
    />
  );
};

export default Loader;