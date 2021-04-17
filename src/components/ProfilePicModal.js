import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  // Modal
} from 'react-native';
import Modal from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import gallery from '../assets/imgs/gallery.png';
import I18n from '../services/i18n';
import { TextMedium } from './TextView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../utility/Color';

const ProfilePicModal = props => {
  const { visible, onPress } = props;

  return (
    <Modal isVisible={visible} style={{ margin: 10 }} hasBackdrop={true}
      onBackdropPress={() => onPress()}>
      <View style={{ flex: 1 / 8, backgroundColor: '#FFF' }}>
        <View style={[styles.imageAlign]}>
          <TouchableOpacity style={styles.columnSpacing}
            onPress={() => onPress('camera')}>
            <Icon1 name="camera" size={30} color={Color.text} />
            <TextMedium text={I18n.t('camera')} style={{ color: Color.text }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.columnSpacing}
            onPress={() => onPress('gallery')}>
            <Icon1 name="image" size={30} color={Color.text} />
            <TextMedium text={I18n.t('gallery')} style={{ color: Color.text }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageAlign: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 20,
  },
  galleryIcon: {
    width: 30,
    height: 30,
    alignSelf: "center"
    // marginStart: 60,
  },
  columnSpacing: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default ProfilePicModal;
