import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { TextBold, TextRegular, TextSemiBold, TextThin } from './TextView';
import Color from '../utility/Color'

import Images from '../utility/Image'
import Sizes from "../utility/Sizes"
import Constant from '../utility/Constant';
import I18n from '../services/i18n';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ReviewLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getReviews);

  const renderItem = item => {
    return (
      <View style={styles.reviewBox}>
        <View style={styles.imgBox}>
          <Image source={item.profile_photo ? { uri: Constant.IMAGE_URL + item.profile_photo } : Images.avatar}
            style={{ width: 80, height: 100, resizeMode: "contain" }} />
        </View>
        <View style={{ flex: 1, padding: 10, alignItems: "flex-start" }}>
          <TextSemiBold text={item.name ? item.name : "N/A"} style={{ fontSize: Sizes.medium, marginBottom: 5 }} />
          <TextRegular text={item.feedback} numberOfLines={3} style={{ fontSize: Sizes.regular }} />
          <StarRating
            disabled={true}
            emptyStar={'star'}
            fullStar={'star'}
            halfStar={'star-half'}
            iconSet={"FontAwesome"}
            maxStars={5}
            rating={parseFloat(item.star_rate)}
            emptyStarColor={Color.border}
            starSize={20}
            containerStyle={{ width: 120, marginTop: 15 }}
            fullStarColor={Color.orange}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ width: "100%", alignItems: "flex-start", paddingBottom: 10 }}>
        <TextBold text={I18n.t('reviews')}
          style={{ fontSize: Sizes.semiLarge, marginStart: 10 }}
        />
      </View>
      <FlatList data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1, alignItems: "center",
          justifyContent: "center",
          paddingEnd: 10
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    width: Constant.width - 20,
    marginStart: 10, height: 120,
    backgroundColor: Color.white,
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBox: {
    width: 100, height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ReviewLayout;
