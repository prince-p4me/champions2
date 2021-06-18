import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import Header from '../../components/Header';
import {
  TextBold,
  TextLite,
  TextSemiBold,
  TextThin,
} from '../../components/TextView';
import {useSelector, useDispatch} from 'react-redux';
import i18n from '../../services/i18n';

import RewardPointlayout from '../../components/RewardPointlayout';
import * as Actions from '../../redux/action';

// import { NavigationEvents } from 'react-navigation';
import Color from '../../utility/Color';
import Constant from '../../utility/Constant';
import I18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';
import Images from '../../utility/Image';
import star from '../../assets/imgs/star.png';

const MyDashboard = ({route, navigation, props}) => {
  const data = useSelector(state => state.getTransaction);
  const user = useSelector(state => state.getUser);
  const dispatch = useDispatch();
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';

  function getTransaction(type) {
    let obj = {
      user_id: user.id,
      type: type,
    };
    dispatch(Actions.getTransaction(obj));
  }

  useEffect(() => {
    getTransaction();
  }, []);

  const renderItem = item => {
    // let date = item.created_at.split(' ');
    let date = item.created_at;
    let time = date?.split('-');
    time = time[0] + ':' + time[1] + ' ' + time[2];

    console.log({item});
    return (
      <View style={styles.tncBox}>
        <View style={{width: 100, height: '100%'}}>
          <Image
            source={Images.transaction}
            style={{resizeMode: 'cover', height: '100%', width: '100%'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 5,
            paddingStart: 10,
            alignItems: 'flex-start',
          }}>
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            {/* <TextLite text={date[0]} style={{fontSize: Sizes.regular}} /> */}
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextSemiBold
              text={item.point_source}
              style={{fontSize: Sizes.semiLarge, color: Color.theme}}
            />
            <TextThin text={time} style={{fontSize: Sizes.regular}} />
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginBottom: 17}}>
            {item.point_source == 'Redeemed' && (
              <TextSemiBold
                text="-"
                style={{
                  fontSize: Sizes.large,
                  color: Color.semiGold,
                }}
              />
            )}
            <TextSemiBold
              text={item.point_earned + ' ' + I18n.t('points')}
              style={{fontSize: Sizes.semiLarge, color: Color.semiGold}}
            />
            <Image
              source={Images.star3}
              style={{tintColor: Color.semiGold, width: 15, height: 15}}
            />
          </View>
          {/* <TextLite text={"Scan of rice packet"} style={{ fontSize: Sizes.regular }} /> */}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={I18n.t('my_dashboard')}
        dashboard={false}
        back={true}
        help={true}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => renderItem(item)}
          ListFooterComponent={<View style={{height: 50}}></View>}
          ListHeaderComponent={
            <View style={{width: '100%'}}>
              <View style={[styles.pointContainer]}>
                <TextBold
                  text={i18n.t('my_points')}
                  style={{textAlign: align, fontSize: Sizes.semiLarge}}
                />
                <Image source={star} style={styles.starIcon}></Image>
              </View>
              <RewardPointlayout bgColor={Color.theme} />
              <View style={[styles.pointContainer]}>
                <TextBold
                  text={i18n.t('transactions')}
                  style={{textAlign: align, fontSize: Sizes.semiLarge}}
                />
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(MyReward);
export default MyDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGreen,
    paddingHorizontal: 5,
  },
  tncBox: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginStart: 5,
    resizeMode: 'contain',
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginStart: 5,
    marginBottom: 10,
  },
  buttons: {
    margin: 10,
    width: Constant.width - 20,
    backgroundColor: Color.white,
    flexDirection: 'row',
    height: 60,
  },
  button: {
    width: (Constant.width - 20) / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderColor: Color.white,
  },
});
