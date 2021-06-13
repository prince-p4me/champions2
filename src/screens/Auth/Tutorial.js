import React, {useEffect, useReducer, useState, useRef} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {
  TextBold,
  TextLite,
  TextSemiBold,
  TextThin,
} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import * as Actions from '../../redux/action';
import WelcomeModal from '../Dashboard/Welcome';
import Toast from 'react-native-simple-toast';

const Tutorial = ({route}) => {
  const {userInfo} = route.params;
  let [index, setIndex] = useState(1);
  const dispatch = useDispatch();

  const sliderScroll = useRef(null);
  const isFirstUser = useSelector(state => state.isFirstUser);

  useEffect(() => {
    dispatch(Actions.setFirstUser(false));
  }, []);
  // console.log({ userInfo28: userInfo });
  const images = [
    {
      banner: Images.intro,
      desc: 'Banners',
    },
    {
      banner: Images.intro2,
      desc: 'Banners',
    },
  ];
  return (
    <View style={[styles.container, {backgroundColor: Color.theme}]}>
      <SafeAreaView />
      {/* <WelcomeModal data={userInfo} visible={isFirstUser} /> */}
      <View style={{flex: 7}}>
        <FlatListSlider
          ref={sliderScroll}
          data={images}
          height={'87%'}
          timer={5000}
          local
          imageKey={'banner'}
          resizeMode={'contain'}
          index={index}
          autoscroll={true}
          onPress={index => {
            setIndex(index++);
          }}
          currentIndexCallback={index => {
            setIndex(index++);
            console.log('index is' + index);
          }}
          contentContainerStyle={{paddingHorizontal: 2}}
          indicatorContainerStyle={{position: 'absolute', bottom: 10}}
          indicatorActiveColor={Color.white}
          indicatorInActiveColor={Color.darkBGgray}
          indicatorActiveWidth={20}
          animation
          active
        />
      </View>
      <View style={{flex: 3}}>
        <View style={{width: '90%', alignItems: 'center', marginTop: 20}}>
          <TextBold
            text={I18n.t(index == 1 ? 'scan' : 'share')}
            style={{fontSize: Sizes.extraLarge, color: Color.white}}
          />
          <TextSemiBold
            text={I18n.t(index == 1 ? 'scantext' : 'sharetext')}
            style={{color: Color.white, textAlign: 'center', marginTop: 10}}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FullButton
            bgColor={Color.white}
            textColor={Color.theme}
            text={I18n.t('continue')}
            onPress={() => {
              dispatch(Actions.updateUser(userInfo));
              // dispatch(Actions.setFirstUser(true));

              setTimeout(() => {
                Toast.showWithGravity(
                  'Congratulations you have earned 50 points!!',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }, 1500);
            }}
          />

          {/* <TouchableOpacity
            style={{ padding: 14, marginBottom: 15 }}
            activeOpacity={0.7}
            onPress={() => {
              dispatch(Actions.updateUser(userInfo));
            }}>
            <TextLite text="Skip" />
          </TouchableOpacity> */}
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
