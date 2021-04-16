import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, Image
  , Button
} from 'react-native';
import Header from '../../components/Header';
import { TextBold, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
import styles from '../../utility/Style';
import SliderImg from '../../components/SliderImg';
import RecipeLayout from '../../components/RecipeLayout';
import * as Actions from '../../redux/action';

import { connect } from 'react-redux'

class RecipieAll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: ""
    }

  }



  render() {
    let { visible, list } = this.props;
    let { points } = this.state;
    return (
      <View style={styles.containerDashboard}>

        <Header title={'All Recipes'} dashboard={false} back={true} />



        <RecipeLayout />
        <RecipeLayout />
        <RecipeLayout />
        <RecipeLayout />
        <RecipeLayout />
        <RecipeLayout />

      </View>
    );
  }
};


const mapStateToProps = (state) => ({
  list: state.getBanners,
  visible: state.isSuccess
})

const mapDispatchToProps = (dispatch) => {
  return {
    scanQr: (data) => dispatch(Actions.scanQr(data)),
    getBanners: () => dispatch(Actions.getBanners()),
    getPoints: () => dispatch(Actions.getPoints()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipieAll)