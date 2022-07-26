import React from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Images from '../../utility/Image';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import * as Navigation from '../../navigation/navigation';
import Header from '../../components/Header';
import * as Actions from '../../redux/action';
import Constant from '../../utility/Constant';
import axios from "axios";
import { store } from '../../redux/store';
import { showResponse } from '../../utility/Index';

const onSuccess = e => {
  // let scanInfo = {};
  // scanInfo = e.data;
  // scanInfo.isSuccess = true;
  // Actions.setSuccessModal(true);
  // Constant.scanData = e.data;
  // Navigation.navigate('Home', {data: e.data});
  const data = e.data.split(',');
  let headers = {
    // "Accept": 'application/json',÷
    'Content-Type': 'application/json; charset=UTF-8',
  };
  let obj = {
    qr_id: data[0],
    points: data[1],
    user_id: store.getState().getUser.id
  };
  store.dispatch(Actions.setLoading(true));
  axios.post(Constant.API_URL + "scan_qr_ios.php", obj, { headers })
    .then(response => {
      console.log('Success:', response);
      store.dispatch(Actions.setLoading(false));
      showResponse(response.data);
      if (response && response.data && response.data.status && response.data.message) {
        store.dispatch(Actions.setSuccessPoints(obj.points));
        store.dispatch(Actions.setSuccessModal(true));
        store.dispatch(Actions.getHomeData());
      }
      Navigation.goBack();
    })
    .catch(error => {
      store.dispatch(Actions.setLoading(false));
      // dispatch(Actions.setLoading(false));
      showResponse({ message: "Something went wrong" });
      Navigation.goBack();
      console.error('Error:', error);
    });
};

const ScanQrCode = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title={'Scan QR Code'} dashboard={false} back={true} />

      {/* <TouchableOpacity onPress={() => Navigation.goBack()}
      >
        <Image
          source={Images.back}
          resizeMode="contain"></Image>
      </TouchableOpacity> */}

      <QRCodeScanner
        style={{ flex: 1 }}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onRead={onSuccess}
        cameraStyle={{ height: Dimensions.get('window').height - 60 }}
        topViewStyle={{ flex: 0 }}
        bottomViewStyle={{ flex: 0 }}
      />
    </View>
  );
};

export default ScanQrCode;
