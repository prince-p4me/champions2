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
import { TextMedium, TextSemiBold } from '../../components/TextView';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';
import Sizes from '../../utility/Sizes';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import * as Actions from '../../redux/action';
import Constant from '../../utility/Constant';

import * as Navigation from '../../navigation/navigation';

const Welcome = props => {
  const isFirstUser = useSelector(state => state.isFirstUser);
  const isRtl = useSelector(state => state.isRtl);
  const dispatch = useDispatch();

  return (
    <Modal isVisible={isFirstUser} style={{ margin: 0 }}>
      <SafeAreaView style={{ backgroundColor: "transparent" }} />
      <View style={{ flex: 1, backgroundColor: "transparent", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => dispatch(Actions.setFirstUser(false))}
          style={[styles.closeBtn, isRtl ? { left: 20 } : { right: 20 }]}>
          <Image source={Images.close} style={styles.closeImage}></Image>
        </TouchableOpacity>
        <Image source={Images.welcome} resizeMode="contain"
          style={{ width: '90%', height: "100%" }} />
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
    backgroundColor: Colors.theme,
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
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 25,
    borderColor: Colors.darkBGgray,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 20,
    // marginBottom: -20,
    // marginVertical: 10,
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

export default Welcome;
