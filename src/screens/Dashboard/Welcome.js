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
import {TextMedium, TextSemiBold, TextBold} from '../../components/TextView';
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
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';

const WelcomeModal = props => {
  const {visible} = props;

  return (
    <Modal isVisible={visible} style={{margin: 0}}>
      <SafeAreaView style={{backgroundColor: Colors.parrot}} />
      <View style={[styles.bgColor, styles.viewContainer]}>
        <View style={{height: 30}}></View>
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
          <TextBold text={'50'} style={styles.congratsPoints}></TextBold>
          <Icon1 name="star" size={30} color={'#FFF'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: Colors.theme,
    flex: 1 / 3,
    // width: '50%',
    margin: 40,
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
    fontSize: Sizes.extraDouble2x,
    color: Colors.white,
    marginVertical: 24,
  },
});

export default WelcomeModal;
