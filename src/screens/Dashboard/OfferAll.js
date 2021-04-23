import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import styles from '../../utility/Style';
import { useSelector } from 'react-redux';
import SliderImg from '../../components/SliderImg';
import OfferLayout from '../../components/OfferLayout';

const OfferAll = props => {
  const list = useSelector(state => state.getBanners);

  return (
    <View style={styles.containerDashboard}>
      <Header title={'All Offer'} dashboard={false} back={true} help={true} />
      <ScrollView>
        {(list && list.length) ? <SliderImg slideImgs={list} /> : <View />}

        <OfferLayout />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
};

export default OfferAll