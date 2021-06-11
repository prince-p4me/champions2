import React, { useEffect, useReducer, useState, useRef } from 'react';
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
import * as Actions from '../../redux/action';

const Tutorial = ({ route }) => {
  // const { userInfo } = route.params;
  let [index, setIndex] = useState(1);
  const dispatch = useDispatch();

  const sliderScroll = useRef(null);

  // console.log({ userInfo28: userInfo });
  const images = [
    {
      banner: Images.congrats2,
      desc: 'Banners',
    },
    {
      banner: Images.congrat,
      desc: 'Banners',
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ flex: 6 }}>
        <FlatListSlider
          ref={sliderScroll}
          data={images}
          height={'100%'}
          // timer={10000}
          local
          imageKey={'banner'}
          resizeMode={'contain'}
          index={index}
          autoscroll={false}
          onPress={index => {
            // console.log(JSON.stringify(index));
            // bannerClicked(banners[index]);
            setIndex(index++);

            setTimeout(() => {
              console.log('index== 58' + index);
              if (index > 2) {
                dispatch(Actions.updateUser(userInfo));
              }
            }, 400);
          }}
          currentIndexCallback={index => {
            setIndex(index++);

            setTimeout(() => {
              // sliderScroll.scrollToIndex({
              //   index: index,
              //   animated: true,
              // });
              console.log('index== 58' + index);
              if (index > 2) {
                dispatch(Actions.updateUser(userInfo));
              }
            }, 400);
          }}
          contentContainerStyle={{ paddingHorizontal: 2 }}
          indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
          indicatorActiveColor={Color.parrot}
          indicatorInActiveColor={Color.darkBGgray}
          indicatorActiveWidth={6}
          animation
          active
        />
      </View>
      <View style={{ flex: 4 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextBold
            text={'Scan QR Code'}
            style={{ fontSize: Sizes.extraLarge }}
          />
          <TextLite text="Scan and won prizes with rewarded points" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <FullButton
            bgColor={Color.theme}
            textColor={Color.white}
            text="Next"
            onPress={() => {
              // bannerClicked(banners[index]);
              setIndex(index++);

              console.log(sliderScroll);
              setTimeout(() => {
                // sliderScroll.scrollToIndex({
                //   index: index,
                //   animated: true,
                // });
                if (index > 2) {
                  dispatch(Actions.updateUser(userInfo));
                }
              }, 400);
            }}
          /> */}

          <TouchableOpacity
            style={{ padding: 14, marginBottom: 15 }}
            activeOpacity={0.7}
            onPress={() => {
              dispatch(Actions.updateUser(userInfo));
            }}>
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
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
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
