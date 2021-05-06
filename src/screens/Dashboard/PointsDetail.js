import React, {useRef, useState, useEffect} from 'react';
import {View, Image, FlatList} from 'react-native';
import Header from '../../components/Header';

import styles from '../../utility/Style';

import {TextThin, TextSemiBold, TextBold} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import Color from '../../utility/Color';
import i18n from '../../services/i18n';

import {useSelector} from 'react-redux';

import star from '../../assets/imgs/star.png';

import logo from '../../assets/imgs/10xlogo.png';
import Redeem from '../../assets/imgs/Redeem.png';
import Balance from '../../assets/imgs/Balance.png';

import earned from '../../assets/imgs/earned.png';

import {color} from 'react-native-reanimated';

const PointsDetail = ({route, navigation}) => {
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const {data} = route.params;

  console.log({data: route});
  const transactions = [
    {
      id: 1,
      transactionType: 'Won',
      points: '+500 Points',
      scanType: 'Scan Or QR',
    },
    {
      id: 2,
      transactionType: 'Redeemed',
      points: '-30 Points',
      scanType: '10x Champions Offer',
    },
  ];

  const renderItem = item => {
    return (
      <View style={[styles.pointTypesContainer]}>
        <View style={[styles.pointTypeCol, {backgroundColor: Color.theme}]}>
          <Image source={logo} style={styles.pointIcon}></Image>
        </View>

        <View style={styles.pointTypeCol}>
          <TextSemiBold
            text={item.points}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.black,
            }}
          />
          <TextSemiBold
            text={item.transactionType}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.black,
            }}
          />

          <TextSemiBold
            text={item.scanType}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.black,
            }}
          />
        </View>

        <View style={styles.pointTypeCol}>
          <TextSemiBold
            text={'04-05-2021'}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.black,
            }}
          />

          <TextSemiBold
            text={'09:52:28 AM'}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.black,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'My Dashboard'}
        dashboard={false}
        back={true}
        help={true}
      />

      <View style={[styles.pointContainer]}>
        <TextBold
          text={i18n.t('my_points')}
          style={{textAlign: align, fontSize: Sizes.large}}
        />

        <Image source={star} style={styles.starIcon}></Image>
      </View>

      <View
        style={[styles.pointTypesContainer, {backgroundColor: Color.theme}]}>
        <View style={styles.pointTypeCol}>
          <Image source={earned} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.total_earned}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
            }}
          />
          <TextThin
            text={i18n.t('earned_won')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
        <View style={styles.pointTypeColMiddle}>
          <Image source={Redeem} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.total_redeemed}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
          <TextThin
            text={i18n.t('redeem')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
        <View style={styles.pointTypeCol}>
          <Image source={Balance} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.balance}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
            }}
          />
          <TextThin
            text={i18n.t('balance')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <TextBold
          text={i18n.t('transactions')}
          style={{textAlign: align, fontSize: Sizes.large, marginBottom: 10}}
        />
        <FlatList
          data={transactions}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default PointsDetail;
