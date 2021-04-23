import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { TextBold, TextRegular, TextSemiBold, TextThin } from './TextView';
import Color from '../utility/Color'

import Images from '../utility/Image'
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import Constant from '../utility/Constant';
import { Icon } from 'react-native-elements';
import I18n from '../services/i18n';
import { navigate } from '../navigation/navigation';


const Winnerlayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getWinners);

  const renderItem = item => {
    return (
      <View style={styles.winnercontainer}>
        <Image source={{ uri: Constant.IMAGE_URL + item.profile_pic }} style={{ height: 60, width: 60, borderRadius: 100, alignSelf: 'center' }}></Image>
        <TextSemiBold text={item.name}
          style={{ textAlign: align, fontSize: Sizes.medium, marginTop: 10 }}
        />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Image source={{ uri: Constant.IMAGE_URL + item.product_image }} style={{ height: 17, width: 17, alignSelf: 'center' }}
            resizeMode="contain"></Image>
          <TextThin text={item.product_name}
            style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5 }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <TextThin text={item.product_name}
            style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5, color: Color.semiGold }}
          />
          <Image source={Images.star} style={{ height: 20, width: 20, alignSelf: 'center', tintColor: Color.semiGold }}
            resizeMode="contain"></Image>
        </View>
      </View>
    )
  }

  return (
    <>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <TextBold
          text={I18n.t('alloffer')}
          style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
        />
        <TouchableOpacity onPress={() => navigate('WinnerAll')}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
              size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList data={data}
        horizontal={true}
        contentContainerStyle={{
          flexGrow: 1, alignItems: "center",
          justifyContent: "center"
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => renderItem(item)}
      />
    </>
  );
};

export default Winnerlayout;
