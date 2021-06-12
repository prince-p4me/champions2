import React from "react";
import { TouchableOpacity } from "react-native";
import { TextRegular } from "./TextView";
import PropTypes from "prop-types";

const BottomTile = props => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={{
      width: "100%", height: 45,
      backgroundColor: Colors.theme,
      alignItems: "center",
      justifyContent: "center",
    }} activeOpacity={.7} onPress={() => onPress()}>
      <TextRegular text={title} style={{ color: Colors.white }} />
    </TouchableOpacity>
  )
}

const propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
}

BottomTile.propTypes = propTypes;

export default BottomTile;