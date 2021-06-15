import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  // Modal,
  SafeAreaView,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Header from '../../components/Header';
import {
  TextRegular,
  TextSemiBold,
} from '../../components/TextView';
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

const HomeScreen = props => {
  const [points, setPoints] = useState('');
  const [scanPoints, setScanPoints] = useState(false);
  const [isFirstUser, setFirstUser] = useState(true);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  const list = useSelector(state => state.getBanners);
  const isSuccess = useSelector(state => state.isSuccess);
  const isRtl = useSelector(state => state.isRtl);
  const token = useSelector(state => state.getFcmToken);
  const offerDetail = useSelector(state => state.getOfferDetail);
  const language = useSelector(state => state.getLanguage);
  // const isFirstUser = useSelector(state => state.isFirstUser);
  const forceUpdate = React.useReducer(bool => !bool)[1];

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);

  useFocusEffect(
    React.useCallback(() => {
      checkProps();
    }, [])
  );

  const checkProps = () => {
    if (props.route.params && props.route.params.data) {
      let { data } = props.route.params;
      console.log('scan data', data);
      console.log('executing data');
      data = data.split(',');
      console.log('scan data array', data);
      let obj = { qr_id: data[0], points: data[1] };
      setPoints(obj.points);
      setScanPoints(true);
      dispatch(Actions.scanQr(obj))
    } else {
      dispatch(Actions.getBanners());
    }
  };

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

  return (
    <View style={styles.containerDashboard}>
      {!isLoading ?
        <>
          <SuccessModal
            visible={isSuccess}
            points={points}
            offerDetail={offerDetail}
            scanPoints={scanPoints}
          />
          <WelcomeModal />
        </> : null}
      <Header title={'Home'} dashboard={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}>
        {list && list.length ? <SliderImg slideImgs={list} /> : <View />}
        <Winnerlayout />
        <View style={{ height: 20 }} />
        <QRCodeContainer />
        <PointsContainer />
        <MenuContainer />
        <OfferLayout home={true} />
        <RecipeLayout horizontal={true} />
        <ReviewLayout />
        {renderBottomLinks()}
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}

export default HomeScreen;
