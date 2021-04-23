import React from 'react';
import {
  View,
} from 'react-native';
import Header from '../../components/Header';
import styles from '../../utility/Style';
import I18n from '../../services/i18n';
import RecipeLayout from '../../components/RecipeLayout';

const RecipieAll = () => {
  return (
    <View style={styles.containerDashboard}>
      <Header title={I18n.t("recipe")} dashboard={false} back={true} help={true} />
      <View style={{ flex: 1, paddingTop: 14 }}>
        <RecipeLayout hideTitle={true} />
        <View style={{ height: 50 }}></View>
      </View>
    </View>
  );
};

export default RecipieAll