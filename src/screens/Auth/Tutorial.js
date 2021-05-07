import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import globalStyles from '../../utility/Style';
import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import Color from '../../utility/Color';
import I18n from '../../services/i18n';
import FullButton from '../../components/FullButton';
import { useSelector, useDispatch } from 'react-redux';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { TextBold, TextLite, TextThin } from '../../components/TextView';
import Sizes from '../../utility/Sizes';

const Tutorial = props => {
  let language = useSelector(state => state.getLanguage);
  const [index, setIndex] = useState(1);

  const images = [
    {
      banner: Images.congrats2,
      desc: "Banners"
    },
    {
      banner: Images.congrat,
      desc: "Banners"
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ flex: 1 }}>
        <FlatListSlider data={images}
          height={"100%"}
          // timer={10000}
          local
          imageKey={'banner'}
          resizeMode={"contain"}
          index={index}
          autoscroll={false}
          onPress={index => {
            // console.log(JSON.stringify(index));
            // bannerClicked(banners[index]);
          }}
          contentContainerStyle={{ paddingHorizontal: 2, }}
          indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
          indicatorActiveColor={Color.parrot}
          indicatorInActiveColor={Color.darkBGgray}
          indicatorActiveWidth={6}
          animation
        />
      </View>
      <View style={{ flex: 1, }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
          <TextBold text={"Scan QR Code"} style={{ fontSize: Sizes.extraLarge }} />
          <TextLite text="Scan and won prizes with rewarded points" />
        </View>
        <View style={{
          flex: 1, alignItems: "center",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
          <FullButton bgColor={Color.theme}
            textColor={Color.white}
            text="Next"
            onPress={() => {
              setIndex(2);
            }}
          />
          <TouchableOpacity style={{ padding: 14, }} activeOpacity={.7}
            onPress={() => alert("skipping it")}>
            <TextLite text="Skip" />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView />
    </View>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Color.white,
    alignItems: "center"
  },
  firstSection: {
    width: Constant.width,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '18%',
  },
  btnContainer: {
    height: '50%',
    width: '100%',
    paddingVertical: '5%',
    // backgroundColor: "red",
    justifyContent: 'space-around',
  },
});
