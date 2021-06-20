import React, { useEffect } from 'react';
import { View, StyleSheet, Share, Image } from 'react-native';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextBold,
  TextLite,
  TextRegular,
  TextSemiBold,
  TextThin,
} from '../../components/TextView';
import i18n from '../../services/i18n';

import * as Actions from '../../redux/action';

// import { NavigationEvents } from 'react-navigation';
import Color from '../../utility/Color';
import I18n from '../../services/i18n';
import style from '../../utility/Style';
import Sizes from '../../utility/Sizes';
import Images from '../../utility/Image';
import star from '../../assets/imgs/star.png';
import FullButton from '../../components/FullButton';
import Constant from '../../utility/Constant';
// import firebase from 'react-native-firebase';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Reffer = () => {
  const user = useSelector(state => state.getUser);
  const dispatch = useDispatch();
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';

  useEffect(() => {
    async function generateLink() {
      const link = await dynamicLinks().buildLink({
        link: Constant.iosApp,
        domainUriPrefix: 'https://eminence.page.link',
      });

      console.log(link);
    }
    generateLink();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey, 10X Champions is an application to get some rewards points. Doing shopping with Grmfoodkraft Pvt. Ltd.  You'll get a QR code after scanning that QR code some Reward Points are saved in your wallet and you can Redeem interesting offers from the application\n\n\nClick here & install 10X Champions - \n iOS :- " +
          Constant.iosApp + ("\nAndroid :- " + Constant.android + user.referral_code) + "\n\nUse my referral code:-" + user.referral_code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('user shared with activity type of result.activityType');
        } else {
          console.log('user shared the content');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('user cancelled the share action');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={I18n.t('refer2')}
        dashboard={false}
        back={true}
        help={true}
      />
      <View style={styles.container}>
        <View style={styles.box1}>
          <TextBold
            text={I18n.t('earn') + ' 50'}
            style={{ fontSize: Sizes.extraDouble2x, textAlign: align }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <TextBold
              text={I18n.t('points')}
              style={{ fontSize: Sizes.extraDouble2x }}
            />
            <Image
              source={Images.star3}
              style={{ width: 35, height: 35, tintColor: Color.semiGold }}
            />
          </View>
          <TextThin
            text={I18n.t('referearnlongtext')}
            style={{ fontSize: Sizes.semiLarge, textAlign: align }}
          />
          <FullButton
            bgColor={Color.theme}
            text={I18n.t('invite')}
            textColor={Color.white}
            btnStyle={{ marginTop: 150 }}
            onPress={onShare}
          />
        </View>
        {/* <View style={[style.cardView, styles.box2]}>

        </View> */}
      </View>
    </View>
  );
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(MyReward);
export default Reffer;

const styles = StyleSheet.create({
  box1: {
    flex: 5.2,
    paddingHorizontal: 18,
    paddingVertical: 30,
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: Color.lightGreen,
    paddingHorizontal: 5,
  },
  box2: {
    flex: 4.8,
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
