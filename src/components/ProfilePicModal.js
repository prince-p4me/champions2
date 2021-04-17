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

const ProfilePicModal = props => {
  const {visible, Language} = props;
  return (
    <Modal isVisible={visible} style={{margin: 30}}>
      <View style={{flex: 1 / 8, backgroundColor: '#FFF'}}>
        <View style={[styles.imageAlign]}>
          <Icon1 name="camera" size={30} color="#000" />
          <Image source={gallery} style={styles.galleryIcon}></Image>
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
  },
  galleryIcon: {
    width: 30,
    height: 30,
    marginStart: 50,
  },
});

export default ProfilePicModal;
