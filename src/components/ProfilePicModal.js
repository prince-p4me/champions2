import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  // Modal
} from 'react-native';
import Modal from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import gallery from '../assets/imgs/gallery.png';
import I18n from '../services/i18n';
import {TextMedium} from './TextView';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfilePicModal = props => {
  const {visible, onPress} = props;

  return (
    <Modal isVisible={visible} style={{margin: 30}}>
      <View style={{flex: 1 / 8, backgroundColor: '#FFF'}}>
        <View style={[styles.imageAlign]}>
          <View style={[styles.columnSpacing]}>
            <TouchableOpacity onPress={() => onPress('camera')}>
              <Icon1 name="camera" size={30} color="#000" />
              <TextMedium text={I18n.t('camera')} />
            </TouchableOpacity>
          </View>
          <View style={[styles.columnSpacing]}>
            <TouchableOpacity onPress={() => onPress('gallery')}>
              <Image source={gallery} style={styles.galleryIcon}></Image>
              <TextMedium text={I18n.t('gallery')} style={{marginStart: 60}} />
            </TouchableOpacity>
          </View>
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
    margin: 20,
  },
  galleryIcon: {
    width: 30,
    height: 30,
    marginStart: 60,
  },
  columnSpacing: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default ProfilePicModal;
