import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import {TextRegular, TextBold, TextLite} from '../../components/TextView';
import I18n from '../../services/i18n';
import Header from '../../components/Header';
import Sizes from '../../utility/Sizes';
import Font from '../../utility/Font';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../redux/action';
import HTML from 'react-native-render-html';
import Constant from '../../utility/Constant';

const AboutUs = props => {
  const dispatch = useDispatch();
  const aboutUs = useSelector(state => state.getAboutUs);
  console.log('About us');
  console.log(aboutUs);

  useEffect(() => {
    dispatch(Actions.getAboutUs(null));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightGreen}}>
      <Header title={I18n.t('about')} dashboard={false} back={true} />
      <ScrollView contentContainerStyle={{flex: 1, padding: 16}}>
        <HTML source={{html: aboutUs}} contentWidth={Constant.width} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  normalText: {
    fontSize: Sizes.regular,
    fontFamily: Font.light,
    marginTop: 15,
  },
  boldInlineText: {
    fontSize: Sizes.medium,
    fontFamily: Font.semiBold,
    marginStart: 5,
  },
  header: {
    fontSize: Sizes.semiLarge,
    fontFamily: Font.bold,
    marginTop: 25,
  },
});

export default AboutUs;
