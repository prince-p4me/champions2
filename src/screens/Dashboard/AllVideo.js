import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import styles from '../../utility/Style';
import { useSelector } from 'react-redux';
import SliderImg from '../../components/SliderImg';
import OfferLayout from '../../components/OfferLayout';
import SuccessModal from './SuccessModal';
import YoutubeSection from '../../components/YoutubeSection';
import I18n from '../../services/i18n';

const AllVideo = props => {

  return (
    <View style={styles.containerDashboard}>

      <Header title={I18n.t('all_video')} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YoutubeSection type={'vertical'} />

        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
};

export default AllVideo;
