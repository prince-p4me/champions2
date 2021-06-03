import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Colors from '../utility/Color';
import { TextRegular } from './TextView';

const TextDevider = props => {
  return (
    <View style={{
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
      marginTop: "5%"
    }}>
      <View style={{
        backgroundColor: Colors.darkBGgray,
        flex: 1, height: 1,
      }}></View>
      <TextRegular text={props.text} style={{ marginHorizontal: 10 }}></TextRegular>
      <View style={{
        backgroundColor: Colors.darkBGgray,
        flex: 1, height: 1,
      }}></View>
    </View>
  )
}

export default TextDevider;