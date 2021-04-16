import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Color from '../utility/Color';
import Sizes from '../utility/Sizes';
import { TextBold, TextRegular } from './TextView';

const FullButton = props => {
  const { onPress, text, textColor, textStyle, bgColor, btnStyle } = props;

  return (
    <TouchableOpacity style={[styles.button,
    bgColor && { backgroundColor: bgColor },
    btnStyle && btnStyle
    ]} activeOpacity={.7}
      onPress={() => onPress()}>
      <TextBold text={text}
        style={[
          {
            color: (textColor ? textColor : Color.theme),
            fontSize: Sizes.medium
          },
          textStyle && textStyle
        ]} />
    </TouchableOpacity>
  )
}

export default FullButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Color.white,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 45
  }
})