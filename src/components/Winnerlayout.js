import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { TextBold, TextLite, TextRegular, TextSemiBold, TextThin } from './TextView';
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
        <Image source={{ uri: Constant.IMAGE_URL + item.profile_pic }} style={{
          height: 40, width: 40, marginTop: -10,
          borderRadius: 100, resizeMode: "cover"
        }}></Image>
        <TextSemiBold text={item.name} numberOfLines={2}
          style={{ textAlign: "center", fontSize: Sizes.medium, marginTop: 5 }}
        />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Image source={{ uri: Constant.IMAGE_URL + item.product_image }} style={{ height: 17, width: 17, alignSelf: 'center' }}
            resizeMode="contain"></Image>
          <TextLite text={item.product_name}
            style={{ fontSize: Sizes.regular, marginTop: 3 }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <TextThin text={item.redeemed_on + " " + I18n.t("points")}
            style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5, color: Color.semiGold }}
          />
          <Image source={Images.star} style={{ height: 20, width: 20, alignSelf: 'center', tintColor: Color.semiGold }}
            resizeMode="contain"></Image>
        </View>
      </View>
    )
  }

  if (data && data.length) {
    return (
      <View style={{ backgroundColor: Color.white, marginBottom: 15, paddingBottom: 10 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TextBold
            text={I18n.t('allwinner')}
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
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            paddingHorizontal: 7
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => renderItem(item)}
        />
      </View>
    );
  } else {
    return <View />
  }
};

export default Winnerlayout;
