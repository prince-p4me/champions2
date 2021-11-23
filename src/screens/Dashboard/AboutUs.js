import React, { useState, useEffect } from 'react';
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
import { TextRegular, TextBold, TextLite } from '../../components/TextView';
import I18n from '../../services/i18n';
import Header from '../../components/Header';
import Sizes from '../../utility/Sizes';
import Font from '../../utility/Font';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';
import HTML from 'react-native-render-html';
import Constant from '../../utility/Constant';

const AboutUs = props => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.getContent);
  const imgUrl = Constant.IMAGE_URL + data?.abt_image;
  console.log("image url", imgUrl);

  useEffect(() => {
    dispatch(Actions.getContents());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
      <Header title={I18n.t('about')} dashboard={false} back={true} />
      <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
        {data.abt_image && <Image source={{ uri: imgUrl }} style={{
          width: "100%", height: 150,
        }} resizeMode="contain" />}

        <HTML source={{ html: data?.about }} contentWidth={Constant.width} />
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
