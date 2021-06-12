import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import globalStyles from '../../utility/Style';
import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      Navigation.navigate('Landing');
    }, 2000);
  }, []);

  const fixedUri = Image.resolveAssetSource(Images.splash);
  return (
    <ImageBackground
      source={fixedUri}
      resizeMode="cover"
      style={globalStyles.container}></ImageBackground>
  );
};
export default SplashScreen;

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
