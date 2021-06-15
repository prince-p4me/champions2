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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: '',
      isSuccess: false,
      soundsList: [],
      scanPoints: false,
      isFirstUser: true
    };
    this.props.navigation.addListener('focus', () => {
      // do something
      console.log('rendered again and checking the props');
      this.checkProps();
    });
  }

  componentDidMount() {
    DeviceEventEmitter.addListener(Constant.WELCOME, (e) => {
      setTimeout(() => {
        this.setState({ isFirstUser: true }, () => {
          console.log("isFirstUser", this.state.isFirstUser);
        });
      }, 1500);
    })
  }

  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners();
  }

  checkProps = () => {
    if (this.props.route.params && this.props.route.params.data) {
      let { data } = this.props.route.params;
      console.log('scan data', data);
      console.log('executing data');
      data = data.split(',');
      console.log('scan data array', data);
      let obj = { qr_id: data[0], points: data[1] };
      this.setState(
        {
          points: obj.points,
          scanPoints: true,
          // isSuccess: successType,
        },
        () => {
          this.props.scanQr(obj);
          // playSampleSound(this.state.soundsList[1]);
          // playSampleSound(this.state.soundsList[1]);
        },
      );
    } else {
      // alert(language);
      this.props.getBanners();
    }

    // if (this.props.isFirstUser) {

    //   Toast.showWithGravity(
    //     'Congratulations you have earned 50 points!!',
    //     Toast.LONG,
    //     Toast.BOTTOM,
    //   );

    //   setTimeout(() => {
    //     this.props.setFirstUser(false);
    //   }, 5000);
    // }
  };

  TokenBox = () => {
    let { token, list, language } = this.props;
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

  updateLanguage = language => {
    setTimeout(() => {
      I18n.locale = language;
      // forceUpdate();
    }, 100);
  };

  RenderLink = (img, title, subtitle, link) => {
    const { isRtl } = this.props;
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

  renderBottomLinks = () => {
    return (
      <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 7 }}>
        {this.RenderLink(
          Imagess.transactionlink,
          'transaction',
          'transactiontext',
          'MyDashboard',
        )}
        {this.RenderLink(Imagess.help247, 'support', 'supporttext', 'Help')}
        {this.RenderLink(
          Imagess.feedbacklink,
          'feedback',
          'feedbacktext',
          'SendFeedback',
        )}
      </View>
    );
  };

  render() {
    let { offerDetail, list, isRtl, isSuccess, language } = this.props;
    let { points, isFirstUser } = this.state;
    this.updateLanguage(language);

    console.log('isFirstUser', isFirstUser);

    console.log('issuccess==', isSuccess);
    return (
      <View style={styles.containerDashboard}>
        <SuccessModal
          visible={isSuccess}
          points={points}
          offerDetail={offerDetail}
          scanPoints={this.state.scanPoints}
        />
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.isFirstUser}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}
          style={{ flex: 1 }}>
          <SafeAreaView style={{ backgroundColor: "red" }} />
          <TouchableOpacity
            onPress={() => {
              console.log("closing modal");
              this.setState({ isFirstUser: false })
            }}
            style={[{
              position: 'absolute',
              top: 90,
              zIndex: 100,
            }, isRtl ? { left: 20 } : { right: 20 }]}>
            <Image source={Imagess.close} style={{
              width: 24,
              height: 24,
              tintColor: Colors.white,
              resizeMode: 'contain',
            }}></Image>
          </TouchableOpacity>
          <Image source={Images.welcome} resizeMode="contain"
            style={{ width: '90%', height: "100%", marginHorizontal: "5%" }} />
        </Modal>
        {/* <WelcomeModal visible={true}
          close={() => this.setState({ isFirstUser: false })} /> */}
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
          {this.renderBottomLinks()}
          <View style={{ height: 50 }}></View>
        </ScrollView>
        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  list: state.getBanners,
  visible: state.isSuccess,
  isRtl: state.isRtl,
  isSuccess: state.isSuccess,
  token: state.getFcmToken,
  offerDetail: state.getOfferDetail,
  language: state.getLanguage,
  isFirstUser: state.isFirstUser,
});

const mapDispatchToProps = dispatch => {
  return {
    scanQr: data => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
    setFirstUser: () => dispatch(Actions.setFirstUser(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
