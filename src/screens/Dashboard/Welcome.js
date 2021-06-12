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
import { TextMedium, TextSemiBold, TextBold } from '../../components/TextView';
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
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';

const WelcomeModal = () => {
  const isFirstUser = useSelector(state => state.isFirstUser);
  const isRtl = useSelector(state => state.isRtl);
  const dispatch = useDispatch();

  return (
    <Modal isVisible={isFirstUser} style={{ margin: 0 }}>
      <SafeAreaView />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(Actions.setFirstUser(false));
            // Navigation.navigate('Home');
          }}
          style={[styles.closeBtn, isRtl ? { left: 20 } : { right: 20 }]}>
          <Image source={Images.close} style={styles.closeImage}></Image>
        </TouchableOpacity>
        <View style={[styles.bgColor, styles.viewContainer]}>
          <View style={{ height: 30 }}></View>
          <TextMedium
            text={'Congratulations!!'}
            style={styles.congrats}></TextMedium>
          <TextMedium
            text={'You Have won 10x Champions'}
            style={styles.congratsText}></TextMedium>
          <TextMedium
            text={'Welcome Points'}
            style={styles.congratsText}></TextMedium>
          <View style={[styles.pointContainer]}>
            <TextMedium text={'50'} style={styles.congratsPoints} />
            <Icon1 name="star" size={50} color={Colors.white} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
  },
  closeImage: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  bgColor: {
    // backgroundColor: "rgb(211,138,65)",
    backgroundColor: "#f98404",
    flex: 1 / 3,
    // width: '50%',
    margin: 35,
    padding: 5
  },
  viewContainer: {
    borderRadius: 20,
  },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congrats: {
    textAlign: 'center',
    fontSize: Sizes.double,
    color: Colors.white,
    marginTop: 0,
    marginVertical: 20,
  },
  congratsText: {
    textAlign: 'center',
    fontSize: Sizes.large,
    color: Colors.white,
    marginVertical: 2,
  },
  congratsPoints: {
    textAlign: 'center',
    fontSize: 50,
    color: Colors.white,
    marginVertical: 24,
  },
});

export default WelcomeModal;
