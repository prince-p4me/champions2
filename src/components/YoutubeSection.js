import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList, Text, SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../services/i18n';

import YoutubeIframe, { getYoutubeMeta } from "react-native-youtube-iframe";
import Images from '../utility/Image';
import Colors from '../utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import { TextBold, TextRegular } from './TextView';
import { Icon } from 'react-native-elements';
import Sizes from '../utility/Sizes';
import { ImageBackground } from 'react-native';
import Constant from '../utility/Constant';

const VideoModal = ({ videoId, onClose }) => {
  const playerRef = React.useRef(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000dd",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity style={{ flex: 1, justifyContent: "center" }}
      // onPress={onClose}
      >
        <YoutubeIframe
          ref={playerRef}
          play={true}
          videoId={videoId}
          height={300}
          // onReady={onPlayerReady}
          onChangeState={(state) => {
            if (state === "ended") {
              // setCompleted(true);
              closeModal();
            }
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const VideoItem = ({ videoId, onPress }) => {
  const [videoMeta, setVideoMeta] = useState(null);
  useEffect(() => {
    getYoutubeMeta(videoId).then(data => {
      setVideoMeta(data);
    });
  }, [videoId]);

  if (videoMeta) {
    return (
      <TouchableOpacity
        onPress={() => onPress(videoId)}
        activeOpacity={.7}
        style={{ flex: 1, height: 200, paddingRight: 12 }}>
        <ImageBackground
          source={{ uri: videoMeta.thumbnail_url }}
          style={{
            width: Constant.width - 12, height: 200,
            alignItems: "center", justifyContent: "center"
          }} resizeMode="cover">

          <Image source={Images.youtube} style={{
            width: 110, height: 80
          }} resizeMode="contain"></Image>
        </ImageBackground>

      </TouchableOpacity>
    );
  }
  return null;
};

const YoutubeSection = props => {
  console.log({ youtbelisting: props });
  const DATA = ['a1CFxcTP3yQ', 'ym5dAu9gTPE'];
  const [modalVisible, showModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const isRtl = useSelector(state => state.isRtl);

  const onVideoPress = useCallback((videoId) => {
    showModal(true);
    setSelectedVideo(videoId);
  }, []);

  const closeModal = useCallback(() => showModal(false), []);


  return (
    <View style={{ padding: 12 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <TextBold
          text={I18n.t('all_video')}
          style={{ fontSize: Sizes.semiLarge, marginBottom: 8 }}
        />
        <TouchableOpacity onPress={() => Navigation.navigate('OfferAll')}
          style={{ display: "none" }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.list}
        // data={DATA}
        horizontal={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VideoItem
            videoId={item.video_url}
            onPress={onVideoPress}
          />
        )}
      />
      <Modal
        style={{ margin: 0 }}
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
        onBackdropPress={closeModal}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor="black"
        backdropOpacity={.7}
      // onSwipeMove={closeModal}
      >
        <SafeAreaView style={{ backgroundColor: "black" }} />
        <TouchableOpacity
          onPress={closeModal}
          style={[{
            position: 'absolute',
            top: 50,
            zIndex: 100,
          }, isRtl ? { left: 20 } : { right: 20 }]}>
          <Image source={Images.close} style={{
            width: 24,
            height: 24,
            tintColor: Colors.white,
            resizeMode: 'contain',
          }}></Image>
        </TouchableOpacity>
        <VideoModal videoId={selectedVideo} onClose={closeModal} />
      </Modal>
    </View>
  )
}

export default YoutubeSection;