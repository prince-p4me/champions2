import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Image, Text,
  Linking,
  SafeAreaView,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import {
  TextMedium,
  TextRegular,
  TextSemiBold,
} from '../../components/TextView';
import axios from "axios";

import styles from '../../utility/Style';
import Imagess from '../../utility/Image';
import SliderImg from '../../components/SliderImg';
import I18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';

import PointsContainer from '../../components/PointsContainer';
import QRCodeContainer from '../../components/QRCodeContainer';
import Winnerlayout from '../../components/Winnerlayout';
import OfferLayout from '../../components/OfferLayout';
import RecipeLayout from '../../components/RecipeLayout';
import * as Actions from '../../redux/action';

import SuccessModal from './SuccessModal';
import { connect } from 'react-redux';
import * as Navigation from '../../navigation/navigation';
import ReviewLayout from '../../components/ReviewLayout';

import { request, PERMISSIONS } from 'react-native-permissions';
import MenuContainer from '../../components/MenuContainer';

import Color from '../../utility/Color';
import WelcomeModal from './Welcome';
import Constant from '../../utility/Constant';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import YoutubeSection from '../../components/YoutubeSection';
import * as ApiService from "../../services/Api";
import { showResponse, showToast } from '../../utility/Index';

const HomeScreen = props => {
  const [points, setPoints] = useState('');
  const [scanPoints, setScanPoints] = useState(false);
  const isLoading = useSelector(state => state.isLoading);

  const [youtbelist, setYoutTubelist] = useState([]);

  const dispatch = useDispatch();

  const list = useSelector(state => state.getBanners);
  const isSuccess = useSelector(state => state.isSuccess);
  const isRtl = useSelector(state => state.isRtl);
  const offerDetail = useSelector(state => state.getOfferDetail);
  const language = useSelector(state => state.getLanguage);
  const user = useSelector(state => state.getUser);
  const forceUpdate = React.useReducer(bool => !bool)[1];
  // const youtubelist = useSelector(state => state.getYtVideos);

  // useEffect(() => {
  //   fetch(
  //     Constant.API_URL + "videos.php")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log({ json });
  //       setYoutTubelist(json.data);
  //     })
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);

  useFocusEffect(
    React.useCallback(() => {
      checkProps();
      DeviceEventEmitter.emit(Constant.FETCH_COUNT);
      // fetchLocation();
    }, [])
  );

  const fetchLocation = () => {
    console.log("fetching address");
    Geolocation.getCurrentPosition(info => {
      dispatch(Actions.getAddressLatLng(info.coords));
    });
  }

  const checkProps = () => {
    if (Constant.scanData) {
      let headers = {
        // "Accept": 'application/json',÷
        'Content-Type': 'application/json; charset=UTF-8',
      };
      console.log('scan data', Constant.scanData);
      console.log('executing data');
      let data = Constant.scanData.split(',');
      console.log('scan data array', data);
      let obj = {
        qr_id: data[0],
        points: data[1],
        user_id: user.id
      };
      setPoints(obj.points);
      setScanPoints(true);

      dispatch(Actions.setLoading(true));

      scanQrCode(obj, headers)
      // fetch(Constant.API_URL + "scan_qr.php", {
      //   method: 'POST', // or 'PUT'
      //   headers: new Headers({ 'Content-Type': 'text/plain; charset=UTF-8' }),
      //   body: JSON.stringify(obj),
      // })
      //   .then(data => {
      //     console.log("data received", data);
      //     return data.json();
      //   })
      //   .then(response => {
      // console.log('Success:', response);
      // dispatch(Actions.setLoading(false));
      // showResponse(response);
      // if (response.status && response.message) {
      //   dispatch(Actions.setSuccessModal(true));
      //   dispatch(Actions.getHomeData());
      // }
      //   })
      //   .catch((error) => {
      // dispatch(Actions.setLoading(false));
      // console.error('Error:', error);
      //   }).finally(() => {
      //     dispatch(Actions.setLoading(false));
      //   });
    } else {
      dispatch(Actions.getHomeData());
    }
    setTimeout(() => {
      dispatch(Actions.setLoading(false));
    }, 6000);
  };


  function scanQrCode(obj, headers) {
    axios.post(Constant.API_URL + "scan_qr.php", obj, { headers })
      .then(response => {
        console.log('Success:', response);
        // dispatch(Actions.setLoading(false));
        // showResponse(response.data);
        // if (response.data && response.data.status && response.data.message) {
        //   dispatch(Actions.setSuccessModal(true));
        //   dispatch(Actions.getHomeData());
        // }
      })
      .catch(error => {
        // dispatch(Actions.setLoading(false));
        console.error('Error:', error);
      });
  }

  const TokenBox = () => {
    let { token, list, language } = props;
    return (
      <TextInput
        multiline={true}
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 10,
          padding: 7,
        }}
        placeholder="token"
        keyboardType="phone-pad"
        value={token}
        maxLength={10}
      />
    );
  };

  const RenderLink = (img, title, subtitle, link) => {
    return (
      <TouchableOpacity
        style={{ width: '100%', flexDirection: 'row', marginBottom: 15 }}
        onPress={() =>
          Navigation.navigate(link, link == 'Help' && { isAuth: true })
        }>
        <Image
          source={img}
          style={{ width: 55, height: 55, marginEnd: 15 }}></Image>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: Color.border,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TextSemiBold
            text={I18n.t(title)}
            style={[
              {
                fontSize: Sizes.regular,
                marginBottom: 7,
              },
              isRtl && { textAlign: 'left' },
            ]}
          />
          <TextRegular
            text={I18n.t(subtitle)}
            style={[
              {
                fontSize: Sizes.regular,
              },
              isRtl && { textAlign: 'left' },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderBottomLinks = () => {
    return (
      <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 7 }}>
        {RenderLink(
          Imagess.transactionlink,
          'transaction',
          'transactiontext',
          'MyDashboard',
        )}
        {RenderLink(Imagess.help247, 'support', 'supporttext', 'Help')}
        {RenderLink(
          Imagess.feedbacklink,
          'feedback',
          'feedbacktext',
          'SendFeedback',
        )}
      </View>
    );
  };

  const renderQrCode = () => {
    return (
      <View style={{
        width: "100%", padding: 10,
        paddingVertical: 20,
        flexDirection: "row",
        backgroundColor: Color.white
      }}>
        <TouchableOpacity activeOpacity={.7} style={{ flex: 7, paddingHorizontal: 10 }}
          onPress={() => {
            Navigation.navigate('Scan');
            // checkProps();
          }}>
          <Image source={Imagess.scan2} style={{ height: 50, width: "100%", resizeMode: "cover", borderRadius: 5 }}></Image>
          <TextMedium text={I18n.t("scancode")} style={{ color: Color.theme, fontSize: Sizes.regular, marginTop: 3, }} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.7} style={{ flex: 3 }}
          onPress={() => {
            Linking.openURL(Constant.productCatalogue);
          }}>
          <Image source={Imagess.download} style={{ height: 50, width: "100%", resizeMode: "contain" }} />
          <TextSemiBold text={I18n.t("scancode2")} style={{ color: Color.theme, fontSize: Sizes.medium, marginTop: 3, textAlign: "center" }} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.containerDashboard}>
      {!isLoading ?
        <>
          <SuccessModal
            visible={isSuccess}
            offerDetail={offerDetail}
          />
          <WelcomeModal />
        </> : null}
      <Header title={'Home'} dashboard={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 5 }}
        showsVerticalScrollIndicator={false}>
        {list && list.length ? <SliderImg slideImgs={list} /> : <View />}
        {/* <View style={{ height: 20 }} /> */}
        {/* <QRCodeContainer /> */}
        {renderQrCode()}
        <YoutubeSection type={'horizontal'} />
        <PointsContainer />
        <MenuContainer />
        <Winnerlayout />
        <OfferLayout home={true} />
        <RecipeLayout horizontal={true} />
        <ReviewLayout />
        {renderBottomLinks()}
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
}

export default HomeScreen;
