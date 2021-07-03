import React from 'react';
import { View } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { navigate } from '../navigation/navigation';
import Color from '../utility/Color';
import Constant from '../utility/Constant';

const SliderImg = (props) => {
  const { slideImgs } = props;
  return (
    <View style={{ marginBottom: 10, paddingHorizontal: 0 }}>
      <FlatListSlider data={slideImgs ? slideImgs : []}
        height={260}
        timer={2000}
        onPress={index => {
          // console.log(JSON.stringify(index));
          // bannerClicked(banners[index]);
          navigate("OfferAll");
        }}
        // contentContainerStyle={{ paddingHorizontal: 2 }}
        indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
        indicatorActiveColor={Color.semiGold}
        indicatorInActiveColor={Color.white}
        indicatorActiveWidth={30}
        animation
      />
    </View>
  );
};

export default SliderImg;
