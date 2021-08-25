import React from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';

import Images from '../../utility/Image';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// import * as Navigation from '../../navigation/navigation';
import Header from '../../components/Header';
import * as Actions from '../../redux/action';
import Constant from '../../utility/Constant';
import { useDispatch ,useSelector } from 'react-redux';
import { showResponse } from '../../utility/Index';


const ScanQrCode = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);

  console.log({user19:user});
  
  const onSuccess = e => {
    // let scanInfo = {};
    // scanInfo = e.data;
    // scanInfo.isSuccess = true;
    let data = e.data.split(',');
    console.log('scan data array', data);



    let obj = { qr_id: data[0], points: data[1],user_id:user.id };


    console.log({userData:obj});
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    dispatch(Actions.setLoading(true));
    fetch((Constant.API_URL + 'scan_qr.php'), {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(response => {
        dispatch(Actions.setLoading(false));
        console.log("response received", response);
        showResponse(response);
        if (response && response.status) {
          navigation.navigate({
            name: 'Home',
            params: { isSuccess: true, points: obj.points },
            merge: true,
          });
        } else navigation.goBack();
      })
      .catch(err => {
        dispatch(Actions.setLoading(false));
        console.log(err);
        showResponse({ message: "Error in reading QR Code" });
        navigation.goBack();
      });
  };
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
