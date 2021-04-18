import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { TextSemiBold, TextLite } from './TextView';
import I18n from '../services/i18n';
import Sizes from '../utility/Sizes';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import Color from '../utility/Color';

const LanguageModal = props => {
  const { visible, Language } = props;
  const isRtl = useSelector(state => state.isRtl);
  const { onPress, onChangeLanguage } = props;
  const align = isRtl ? 'right' : 'left';

  return (
    <Modal isVisible={visible} style={{ margin: 30 }}>
      <View style={{ flex: 1 / 1.7, backgroundColor: '#FFF' }}>
        <View style={[styles.title, { marginBottom: 0 }]}>
          <TextSemiBold
            text={I18n.t('sele_lang')}
            style={{ textAlign: align, fontSize: Sizes.large, color: '#000' }}
          />
        </View>
        <View style={styles.title}>
          <Icon1 name="search" size={30} color="#000" />
          <TextInput
            style={{ flex: 1, padding: 7 }}
            placeholder=""
            keyboardType="phone-pad"
            height={30}
            onChangeText={searchInput => {
              console.log('change text');
              onChangeLanguage(searchInput);
            }}></TextInput>
        </View>

        {Language &&
          Language.map((item, index) => (
            <TouchableOpacity key={index}
              style={[styles.item,
              index == 0 ? styles.itemBorderFirstItem : {},
              ]} onPress={() => onPress(item)}>
              <TextLite text={item.name}
                style={{
                  textAlign: align,
                  fontSize: Sizes.medium,
                  color: Color.text,
                }} />
            </TouchableOpacity>
          ))}

        <View style={[styles.closeBtn]}>
          <TouchableOpacity style={styles.close} onPress={() => onPress()}>
            <TextLite text={I18n.t('close')}
              style={{
                textAlign: align,
                fontSize: Sizes.medium,
                color: '#636363',
              }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  close: {
    width: 60, height: 40,
    marginEnd: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  closeBtn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  title: {
    margin: 17,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 18,
    marginEnd: 20,
    marginBottom: 18,
    paddingBottom: 20,
    borderColor: '#dbd9d6',
    borderBottomWidth: 1,
  },
  itemBorderFirstItem: {
    paddingTop: 20,
    borderColor: '#dbd9d6',
    borderTopWidth: 1,
  },
});

export default LanguageModal;