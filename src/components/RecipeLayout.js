import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { TextMedium, TextRegular, TextBold } from './TextView';
import Color from '../utility/Color';
import { Icon } from 'react-native-elements'
import Sizes from '../utility/Sizes';
import I18n from '../services/i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Navigation from '../navigation/navigation';
import Constant from '../utility/Constant';

const RecipeLayout = props => {
  const { hideTitle, horizontal } = props;
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'left' : 'right';
  const data = useSelector(state => state.getRecipes);

  const renderItem = item => {
    const text = item?.description.replace(/<\/?[^>]+>/ig, " ");
    return (
      <View style={[styles.offercontainer, horizontal && { width: Constant.width - 28 }]}>
        <View style={{ width: 130 }}>
          <Image source={{ uri: Constant.IMAGE_URL + item.logo }}
            style={styles.img}
            resizeMode="cover"></Image>
        </View>
        <View style={styles.secondSection}>
          <View style={{ flex: 1, alignItems: "flex-start", flexWrap: "wrap" }}>
            <TextMedium
              text={item.title}
              style={[{ fontSize: Sizes.semiLarge }, isRtl && { textAlign: "left" }]}
            />
            <TextRegular text={text.slice(0, 80) + " . . ."}
              style={[{ fontSize: Sizes.regular }, isRtl && { textAlign: "left" }]}
            />
          </View>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.readBtn}
              onPress={() => Navigation.navigate("RecipieDetail", { item })}>
              <TextRegular text={I18n.t('readmore')}
                style={{ color: Color.white, fontSize: Sizes.medium, textTransform: "uppercase" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      {!hideTitle && <View style={styles.title}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextBold
            text={I18n.t('recipe')}
            style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
          />
          <Icon
            name="star"
            size={20} />
        </View>
        <TouchableOpacity onPress={() => Navigation.navigate('RecipieAll')}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TextRegular text={I18n.t('Seeall')} />
            <Icon
              name={'keyboard-arrow-' + (isRtl ? 'left' : 'right')}
              size={30} />
          </View>
        </TouchableOpacity>
      </View>}
      <FlatList data={data}
        horizontal={horizontal}
        contentContainerStyle={{ flexGrow: 1, }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => renderItem(item)}
      />
    </View>
  );
};

export default RecipeLayout;

const styles = StyleSheet.create({
  readBtn: {
    alignSelf: 'flex-end',
    backgroundColor: Color.theme,
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    // marginTop: 20,
    alignSelf: "flex-end"
  },
  img: {
    width: 130,
    height: 120,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  secondSection: {
    flexDirection: "column",
    flex: 1,
    paddingTop: 15,
    // alignItems: "flex-start",
    paddingStart: 10,
    // justifyContent: "space-between"
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    fontSize: Sizes.regular,
    color: Color.parrot,
    marginEnd: 5
  },
  offercontainer: {
    backgroundColor: Color.white,
    // height: 120,
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 20,
    shadowColor: Color.bgGray,
    borderTopStartRadius: 7,
    borderBottomStartRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgBox: {
    height: 70, width: 100,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  redeem: {
    height: 30, width: 120,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 3,
    alignSelf: "flex-end"
  }
})