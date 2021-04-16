import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import I18n from '../../services/i18n';
import Colors from '../../utility/Color';
import Sizes from '../../utility/Sizes';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';
const languages = ['English', 'Hindi', 'Punjabi', 'Bangla', 'Urdu'];
const langTypes = ['en', 'hn', 'pu', 'ba', 'ur'];
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';

const ChangeLanguage = props => {
  const [langLabel, setLangLabel] = useState('English');
  const dropdownInput = useRef(null);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.getLanguage);

  useEffect(() => {
    console.log('language 1 is ', language);
    let index = langTypes.indexOf(language);
    console.log('language 2 is ', languages[index]);
    setLangLabel(languages[index]);
    // setLangLabel(languages[index]);
  }, [language]);

  return (
    <TouchableOpacity
      style={styles.dropdownContainer}
      onPress={() => {
        dropdownInput.current.show();
      }}>
      <ModalDropdown
        dropdownStyle={{ width: '50%' }}
        dropdownTextStyle={{ fontSize: Sizes.medium, color: Colors.black }}
        textStyle={{ fontSize: Sizes.medium, color: Colors.black }}
        ref={dropdownInput}
        options={languages}
        style={{ width: 60 }}
        onSelect={(index) => {
          let langIndex = languages.findIndex(
            (lang) => lang === languages[index],
          );
          // setLanguage(langTypes[langIndex]);
          dispatch(Actions.setLanguage(langTypes[langIndex]));
          dispatch(Actions.setRtl(langTypes[langIndex] == 'ur'));
          I18n.locale = langTypes[langIndex];
          console.log('language changed ', language);
          // console.log('restarting');
          setTimeout(() => {
            RNRestart.Restart();
          }, 2500);

          if (langTypes[langIndex] == 'ur') {
            Toast.showWithGravity(
              'Restart the App to apply RTL',
              Toast.SHORT,
              Toast.BOTTOM,
            );
          }
        }}
        defaultValue={langLabel}
      />
      <Icon
        name="chevron-down"
        size={20}
        color={Colors.black}
        style={{ marginStart: 25 }}
      />
    </TouchableOpacity>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 35,
    borderColor: Colors.black,
    borderWidth: 1,
    paddingStart: 17,
    paddingEnd: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
