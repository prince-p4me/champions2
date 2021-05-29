import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { TextMedium, TextRegular } from './TextView';
import PropTypes from 'prop-types';
import Sizes from '../utility/Sizes';
import Colors from '../utility/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

const InputBox = props => {
  const {
    rightButton,
    rightTick,
    rightPress,
    borderColor,
    onPress,
    iconColor,
    lable,
    keyboardType,
    returnKeyType,
    icon,
    value,
    onChangeText,
    placeholder,
    rightIcon,
    maxLength
  } = props;
  const isRtl = useSelector(state => state.isRtl);
  console.log("isRtl", isRtl);
  const size = icon == 'mobile-phone' ? 40 : 24;
  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}>
        {icon && (
          <View style={styles.iconBox}>
            <Icon
              name={icon}
              color={iconColor ? iconColor : Colors.parrot}
              size={size}></Icon>
          </View>
        )}
        <View style={[styles.inputBox, borderColor && { borderBottomColor: borderColor }]}>
          <TextRegular text={lable} style={{ fontSize: Sizes.regular }} />
          <View style={styles.input}>
            <TextRegular
              text={value ? value : placeholder ? placeholder : 'N/A'}
            />
          </View>
        </View>

        {rightTick && (
          <Icon
            name={icon}
            color={iconColor ? iconColor : Colors.parrot}
            size={size}></Icon>
        )}

        {rightIcon && (
          <View style={[{
            position: "absolute", bottom: 8
          }, isRtl ? { left: 5 } : { right: 5, }]}>
            <Icon name={rightIcon} color={Colors.text} size={size} />
          </View>
        )}

        {rightButton && (
          <TouchableOpacity
            style={{
              height: 45,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}
            onPress={onPress}>
            <TextMedium
              text={rightButton}
              style={{ color: Colors.parrot, fontSize: Sizes.regular }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconBox}>
          <Icon
            name={icon}
            color={iconColor ? iconColor : Colors.parrot}
            size={size}></Icon>
        </View>
      )}
      <View style={[styles.inputBox, borderColor && { borderBottomColor: borderColor }]}>
        <TextRegular text={lable} style={{ fontSize: Sizes.regular }} />
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.text}
          onChangeText={text => onChangeText(text)}
          keyboardType={keyboardType || 'default'}
          onSubmitEditing={props?.onSubmitEditing}
          returnKeyType={returnKeyType || 'next'}
          maxLength={maxLength || 1000}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: "center"
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.bgGray,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    color: Colors.text,
  },
});

const propTypes = {
  lable: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  icon: PropTypes.any,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'phone-pad', 'next']),
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onPress: PropTypes.func,
  iconColor: PropTypes.string,
  rightButton: PropTypes.string,
  rightPress: PropTypes.func,
  maxLength: PropTypes.number
};

InputBox.propTypes = propTypes;

export default InputBox;
