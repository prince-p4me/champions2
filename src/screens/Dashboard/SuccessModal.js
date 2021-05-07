import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import congrat from '../../assets/imgs/amazon.png';
import Images from '../../utility/Image';
import {TextMedium, TextSemiBold} from '../../components/TextView';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';
import Sizes from '../../utility/Sizes';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import * as Actions from '../../redux/action';
import Constant from '../../utility/Constant';

import * as Navigation from '../../navigation/navigation';

const SuccessModal = props => {
  const {visible, close, points, offerDetail} = props;
  const isRtl = useSelector(state => state.isRtl);
  const dispatch = useDispatch();

  console.log({offerDetail: offerDetail});
  const renderRefer = () => {
    return (
      <>
        <TextMedium
          text={i18n.t('earn_point')}
          style={[styles.congratsEarn, {color: Colors.text}]}
        />

        <TouchableOpacity
          style={styles.dashButton}
          onPress={async () => {
            await Clipboard.getString('https://10Xchampions/8768732/');
            Toast.showWithGravity(
              'Copied successfully . . .',
              Toast.LONG,
              Toast.BOTTOM,
            );
          }}>
          <View style={{flex: 1}}>
            <TextMedium
              text="https://10Xchampions/8768732/"
              style={[styles.congratsLink, {color: Colors.darkBGgray}]}
            />
          </View>
          <View style={styles.copySection}>
            <TextMedium
              text={i18n.t('copy')}
              style={[styles.congratsLink, {color: 'blue'}]}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Modal isVisible={visible} style={{margin: 0}}>
      <SafeAreaView style={{backgroundColor: Colors.parrot}} />
      <View style={{flex: 1, backgroundColor: Colors.bgColor}}>
        <View style={styles.firstSection}>
          <TouchableOpacity
            onPress={() => dispatch(Actions.setSuccessModal(false))}
            style={[styles.closeBtn, isRtl ? {left: 20} : {right: 20}]}>
            <Image source={Images.close} style={styles.closeImage}></Image>
          </TouchableOpacity>
          <ImageBackground
            source={
              offerDetail && offerDetail.image
                ? {uri: Constant.IMAGE_URL + offerDetail.image}
                : Images.gift
            }
            resizeMode="contain"
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              height: 150,
              marginTop: 40,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                position: 'absolute',
                bottom: -70,
              }}>
              <TextMedium text={i18n.t('congrat')} style={styles.congrats} />
              <TextMedium text={i18n.t('won_points')} style={styles.congrats} />
              <View style={[styles.congratsText, styles.congratTxt]}>
                <TextSemiBold
                  text={points}
                  style={[styles.congrats, {fontSize: Sizes.double}]}
                />
                <View style={{width: 5}}></View>
                <Image source={Images.star} style={styles.starImage}></Image>
              </View>
            </View>
          </ImageBackground>
          <View style={{flex: 1, width: '80%', justifyContent: 'center'}}>
            <FullButton
              text={i18n.t('go_redeem')}
              btnStyle={[styles.outlineBtn, {position: 'absolute', bottom: 60}]}
              textStyle={styles.outlineBtnText}
              onPress={() => {
                console.log('going to redeem history');
                // close();
                dispatch(Actions.setSuccessModal(false));
              }}></FullButton>
          </View>
        </View>
        <View style={styles.secondSection}>
          {renderRefer()}

          <View style={{width: '60%'}}>
            <FullButton
              text={i18n.t('go_reward')}
              bgColor={Colors.theme}
              textStyle={styles.outlineBtnText}
              onPress={() => {
                console.log('going to redeem history');
                // close();
                dispatch(Actions.setSuccessModal(false));
                Navigation.navigate('MyReward');
              }}></FullButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeImage: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  starImage: {
    width: 20,
    height: 20,
    tintColor: Colors.semiGold,
    resizeMode: 'contain',
  },
  congratImage: {
    width: 100,
    height: 150,
    // borderRadius: 15,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
  },
  firstSection: {
    backgroundColor: Colors.green,
    flex: 3,
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  secondSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  copySection: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderStartWidth: 1,
    borderColor: Colors.darkBGgray,
  },
  dashButton: {
    flexDirection: 'row',
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 25,
    borderColor: Colors.darkBGgray,
    overflow: 'hidden',
    alignItems: 'center',
  },
  congratsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 0,
    // marginBottom: -20,
  },
  congrats: {
    textAlign: 'center',
    fontSize: Sizes.double,
    color: Colors.white,
    marginTop: 0,
  },
  congratsLink: {
    textAlign: 'center',
    fontSize: Sizes.semiLarge,
    color: Colors.white,
  },
  congratsEarn: {
    textAlign: 'center',
    fontSize: Sizes.semiLarge,
    color: Colors.white,
  },
  congratTxt: {
    // marginVertical: 0,
    marginTop: 0,
  },
  outlineBtn: {
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  outlineBtnText: {
    color: Colors.white,
    fontSize: Sizes.regular,
    fontWeight: '400',
  },
});

export default SuccessModal;
