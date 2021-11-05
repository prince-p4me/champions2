import React, {useRef, useState, useEffect} from 'react';
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';

import styles from '../../utility/Style';

import {TextThin, TextSemiBold, TextBold} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import Color from '../../utility/Color';
import i18n from '../../services/i18n';

import {useSelector} from 'react-redux';

import star from '../../assets/imgs/star.png';

import logo from '../../assets/imgs/10xlogo.png';
import Redeem from '../../assets/imgs/Redeem.png';
import Balance from '../../assets/imgs/Balance.png';

import earned from '../../assets/imgs/earned.png';

import {color} from 'react-native-reanimated';
import QRCodeContainer from '../../components/QRCodeContainer';

import * as Actions from '../../redux/action';

const MyRewards = ({route, navigation}) => {
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
  const {data} = route.params;
  const [transactionType, setTransactionType] = useState('earned');

  console.log({data: route});
  const user = useSelector(state => state.getUser);
  console.log('user', user);
  const transactionList = useSelector(state => state.getTransactionByCategory);

  const getTransaction = type => {
    let obj = {
      user_id: user.id,
      type: type,
    };
    dispatch(Actions.getTransactionCategory(obj));
  };
  const renderItem = item => {
    return (
      <View style={{borderRadius: 10, backgroundColor: Color.lightgrey}}>
        <Image source={star} style={styles.pointIcon}></Image>
        <TextSemiBold
          text={transactionType == 'earned' ? 'Points Won' : 'Redeem'}
          style={{textAlign: align, fontSize: Sizes.large}}
        />
        <TextThin
          text={item.points}
          style={{textAlign: align, fontSize: Sizes.large}}
        />
        <TextThin
          text={transactionType == 'earned' ? item.date : item.product_name}
          style={{textAlign: align, fontSize: Sizes.large}}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Reward Points'}
        dashboard={false}
        back={true}
        help={true}
      />

      <View style={[styles.pointContainer]}>
        <TextBold
          text={i18n.t('my_points')}
          style={{textAlign: align, fontSize: Sizes.large}}
        />

        <Image source={star} style={styles.starIcon}></Image>
      </View>

      <View
        style={[styles.pointTypesContainer, {backgroundColor: Color.theme}]}>
        <View style={styles.pointTypeCol}>
          <Image source={earned} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.total_earned}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
            }}
          />
          <TextThin
            text={i18n.t('earned_won')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
        <View style={styles.pointTypeColMiddle}>
          <Image source={Redeem} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.total_redeemed}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
          <TextThin
            text={i18n.t('redeem')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
        <View style={styles.pointTypeCol}>
          <Image source={Balance} style={styles.pointIcon}></Image>
          <TextSemiBold
            text={data.balance}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
            }}
          />
          <TextThin
            text={i18n.t('balance')}
            style={{
              textAlign: align,
              fontSize: Sizes.semiLarge,
              color: Color.white,
              fontWeight: 'bold',
              //   marginTop: 5,
            }}
          />
        </View>
      </View>

      <QRCodeContainer />

      <View style={{paddingHorizontal: 10}}>
        <View style={styles.pointTypeCol}>
          <TouchableOpacity
            onPress={() => {
              setTransactionType('earned');
              getTransaction('QR Scan');
            }}>
            <View>
              <TextThin
                text={i18n.t('earned_won')}
                style={{
                  textAlign: align,
                  fontSize: Sizes.semiLarge,
                  color: Color.black,
                  fontWeight: 'bold',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.pointTypeCol}>
          <TouchableOpacity
            onPress={() => {
              setTransactionType('redeemed');
              getTransaction('Redeemed');
            }}>
            <TextThin
              text={i18n.t('redeem')}
              style={{
                textAlign: align,
                fontSize: Sizes.semiLarge,
                color: Color.black,
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactionList}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          // keyExtractor={(item, index) => item.date}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({item, index}) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default MyRewards;
