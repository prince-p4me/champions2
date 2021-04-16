import Sizes from '../../utility/Sizes';
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, I18nManager } from 'react-native';
import { TextRegular, TextSemiBold } from '../../components/TextView';

const LinkBUtton = props => {
  const { onPress, text, btnText } = props;
  return (
    <TouchableOpacity style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }} onPress={() => onPress()}>
      <TextSemiBold text={text} style={{
        fontSize: Sizes.regular,
        color: Colors.darkBGgray
      }}></TextSemiBold>
      <View style={{ width: 10 }}></View>
      <TextSemiBold text={btnText} style={{
        fontSize: Sizes.regular,
        color: Colors.green
      }}></TextSemiBold>
    </TouchableOpacity>
  )
}

export default LinkBUtton;