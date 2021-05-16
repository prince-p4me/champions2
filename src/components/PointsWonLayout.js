import React, {Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Image, FlatList, Dimensions} from 'react-native';
import {TextBold, TextRegular, TextSemiBold, TextThin} from './TextView';
import i18n from '../services/i18n';
import Color from '../utility/Color';

import star from '../assets/imgs/star.png';
import Images from '../utility/Image';
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from '../utility/Sizes';
import styles from '../utility/Style';
import About from '../assets/imgs/user.jpeg';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PointWonLayout = item => {
  const align = isRtl ? 'right' : 'left';
  const isRtl = useSelector(state => state.isRtl);

  let pointInfo = item.item;
  return (
    <View style={styles.pointwoncontainer}>
      <Image
        source={Images.star3}
        style={{
          height: 50,
          width: 50,
          alignSelf: 'center',
          tintColor: Color.darkBGgray,
        }}></Image>
      <TextRegular
        text={pointInfo.product_name != '' ? 'Redeemed' : 'Points Won'}
        style={{textAlign: align, fontSize: Sizes.semiLarge, marginTop: 10}}
      />
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        {pointInfo.product_name == '' && (
          <Image
            source={Images.star}
            style={{
              height: 13,
              width: 13,
              alignSelf: 'center',
              marginTop: 3,
              marginRight: 5,
              tintColor: Color.darkBGgray,
            }}
            resizeMode="contain"></Image>
        )}

        <TextRegular
          text={pointInfo.points}
          style={{textAlign: align, fontSize: Sizes.regular, marginTop: 5}}
        />
      </View>

      <TextThin
        numberOfLines={3}
        text={
          pointInfo.product_name != '' ? pointInfo.product_name : pointInfo.date
        }
        style={{
          textAlign: align,
          fontSize: Sizes.regular,
          marginTop: 20,
        }}
      />
    </View>
  );
};
const PointsWonLayout = ({route}) => {
  const transactionList = useSelector(state => state.getTransactionByCategory);
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const data = useSelector(state => state.getPoints);
  let {height} = Dimensions.get('window');

  return (
    <View style={{height: height / 3 + 10}}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-between',
          // marginBottom: 100,
          // paddingBottom: 100,
        }}
        data={transactionList}
        numColumns={2}
        renderItem={({item}) => {
          return <PointWonLayout item={item} />;
        }}
      />
    </View>
  );
};

export default PointsWonLayout;
