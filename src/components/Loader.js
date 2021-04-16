import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from '../utility/Constant';
import { useSelector, useDispatch } from "react-redux";

const Loader = () => {
    const loading = useSelector(state => state.isLoading);

    return (
        <Spinner size="large"
            visible={loading}
            color={Constants.color}
            textContent={'Please wait . . .'}
            textStyle={{ color: "white", fontWeight: "bold" }}
        />
    )
}

export default Loader;