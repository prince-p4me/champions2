import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import styles from '../../utility/Style';
import { useSelector, useDispatch } from 'react-redux';
import SliderImg from '../../components/SliderImg';
import * as Actions from '../../redux/action';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import RecipeLayout from '../../components/RecipeLayout';

const RecipieAll = props => {
  const list = useSelector(state => state.getBanners);

  return (
    <View style={styles.containerDashboard}>
      <Header title={I18n.t("recipe")} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 14 }} showsVerticalScrollIndicator={false}>
        <RecipeLayout hideTitle={true} />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
};

export default RecipieAll