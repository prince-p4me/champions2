import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import globalStyles from '../../utility/Style';
import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import Color from '../../utility/Color';
import I18n from '../../services/i18n';
import FullButton from '../../components/FullButton';
import { useSelector, useDispatch } from 'react-redux';
import LanguageModal from '../../components/LanguageModal';
import Language from '../../assets/language/language.json';
import ProfilePicModal from '../../components/ProfilePicModal';

const LandingScreen = props => {
  let language = useSelector(state => state.getLanguage);
  const forceUpdate = useReducer(bool => !bool)[1];
  let [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);
  const fixedUri = Image.resolveAssetSource(Images.bgGreen);
  return (
    <ImageBackground
      source={fixedUri}
      resizeMode="cover"
      style={globalStyles.container}>
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>

      <View style={styles.firstSection}>
        <Image
          source={Images.champLogo}
          style={{ width: '100%', height: '30%' }}
          resizeMode="contain"></Image>
        <View style={styles.btnContainer}>
          <FullButton
            onPress={() => Navigation.navigate('SignIn')}
            text={I18n.t('login')}></FullButton>

          <FullButton
            onPress={() => Navigation.navigate('SignUp')}
            text={I18n.t('signup')}
            textColor={Color.white}
            bgColor={Color.semiGold}></FullButton>
        </View>
      </View>
      <Image
        source={Images.saina}
        style={{ flex: 5 }}
        resizeMode="contain"></Image>
    </ImageBackground>
  );
};
export default LandingScreen;

const styles = StyleSheet.create({
  firstSection: {
    width: Constant.width,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '18%',
  },
  btnContainer: {
    height: '50%',
    width: '100%',
    paddingVertical: '5%',
    // backgroundColor: "red",
    justifyContent: 'space-around',
  },
});
