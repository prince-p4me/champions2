import React, {Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Image, Text} from 'react-native';
import {TextMedium, TextRegular, TextThin} from './TextView';
import Color from '../utility/Color';

import star from '../assets/imgs/star.png';
import Images from '../utility/Image';
import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from '../utility/Sizes';
import styles from '../utility/Style';
import FullButton from './FullButton';
import About from '../assets/imgs/user.jpeg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import I18n from '../services/i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RecipeLayout = () => {
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const data = useSelector(state => state.getPoints);

  return (
    <View>
      <View style={styles.offercontainer}>
        <View style={{width: 150}}>
          <Image
            source={Images.dish}
            style={{
              width: 130,
              height: 120,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            resizeMode="cover"></Image>
        </View>
        <View>
          <TextMedium
            text="Veg Dum Briyani"
            style={{textAlign: align, fontSize: Sizes.semiLarge, color: '#000'}}
          />

          <TextRegular
            text="Very Tasty Briyani Very "
            style={{textAlign: align, fontSize: Sizes.regular, marginTop: 5}}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: Color.theme,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              marginLeft: 130,
              marginTop: 20,
            }}
            onPress={() => {
              // onPress()
            }}>
            <TextRegular
              text={I18n.t('readmore')}
              style={[
                {
                  color: Color.white,
                  fontSize: Sizes.medium,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecipeLayout;
