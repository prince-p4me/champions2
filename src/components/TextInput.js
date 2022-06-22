import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { TextMedium, TextRegular } from './TextView';
import PropTypes from 'prop-types';
import Sizes from '../utility/Sizes';
import Colors from '../utility/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Images from '../utility/Image';

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
    maxLength,
    dropdownData,
    row
  } = props;
  const isRtl = useSelector(state => state.isRtl);
  // console.log("isRtl", isRtl);
  const size = icon == 'mobile-phone' ? 40 : 24;
  const dropdownInput = React.useRef(null);

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
              color={iconColor ? iconColor : Colors.theme}
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
            color={iconColor ? iconColor : Colors.theme}
            size={size}></Icon>
        )}

        {rightIcon && (
          <View style={[{
            position: "absolute", bottom: 8
          }, isRtl ? { left: 5 } : { right: 5, }]}>
            <Icon name={rightIcon} color={Colors.theme} size={size} />
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
              style={{ color: Colors.theme, fontSize: Sizes.regular }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[styles.container, row && { height: 70 }]}>
      {icon && (
        <View style={styles.iconBox}>
          <Icon
            name={icon}
            color={iconColor ? iconColor : Colors.theme}
            size={size}></Icon>
        </View>
      )}
      <View style={[styles.inputBox, borderColor && { borderBottomColor: borderColor }]}>
        <TextRegular text={lable} style={{ fontSize: Sizes.regular }} />
        {dropdownData ?
          <ModalDropdown
            dropdownStyle={{ width: '70%' }}
            dropdownTextStyle={{ fontSize: Sizes.medium, color: Colors.text }}
            textStyle={{ fontSize: Sizes.medium, color: Colors.text }}
            ref={dropdownInput}
            options={dropdownData}
            style={{ width: "100%", paddingVertical: 5 }}
            onSelect={(index) => {
              onChangeText(dropdownData[index]);
            }}
            defaultValue={value}
          /> :
          <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.border}
            onChangeText={text => onChangeText(text)}
            keyboardType={keyboardType || 'default'}
            onSubmitEditing={props?.onSubmitEditing}
            returnKeyType={returnKeyType || 'next'}
            maxLength={maxLength || 1000}
            numberOfLines={row}
            multiline={row ? true : false}
          />}
        {dropdownData && <Image source={Images.dropdown} style={[{
          width: 15, height: 15, tintColor: Colors.theme,
          position: "absolute", bottom: 5
        }, isRtl ? { left: 14 } : { right: 14 }]}></Image>}
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
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'phone-pad', 'next', 'number-pad']),
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onPress: PropTypes.func,
  iconColor: PropTypes.string,
  rightButton: PropTypes.string,
  rightPress: PropTypes.func,
  maxLength: PropTypes.number,
  row: PropTypes.number
};

InputBox.propTypes = propTypes;

export default InputBox;
