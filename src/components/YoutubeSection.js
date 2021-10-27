import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList, Text, SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal';

import YoutubeIframe, { getYoutubeMeta } from "react-native-youtube-iframe";
import Images from '../utility/Image';
import Colors from '../utility/Color';
import { useSelector, useDispatch } from 'react-redux';

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
        onPress={onClose}
      >
        {/* <Text onPress={onClose} style={{ textAlign: "right" }}>
          Close
        </Text> */}
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
        style={{ flex: 1, height: 200, paddingHorizontal: 6 }}>
        <Image
          source={{ uri: videoMeta.thumbnail_url }}
          style={{
            width: videoMeta.thumbnail_width,
            height: 200,
            resizeMode: "cover"
          }}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

const YoutubeSection = props => {
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
      <FlatList
        data={DATA}
        horizontal={true}
        renderItem={({ item }) => (
          <VideoItem
            videoId={item}
            onPress={onVideoPress}
          />
        )}
        keyExtractor={item => item}
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