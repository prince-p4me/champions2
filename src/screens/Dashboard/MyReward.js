import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { TextRegular } from '../../components/TextView';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../services/i18n';

import RewardPointlayout from '../../components/RewardPointlayout';
import PointsWonLayout from '../../components/PointsWonLayout';
import QRCodeContainer from '../../components/QRCodeContainer';
import * as Actions from '../../redux/action';

// import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../utility/Color';
import Constant from '../../utility/Constant';
import I18n from '../../services/i18n';

const MyDashboard = ({ route, navigation, props }) => {
  const [transactionType, setTransactionType] = useState('QR Scan');
  const transactionList = useSelector(state => state.getTransactionByCategory);
  const user = useSelector(state => state.getUser);
  const dispatch = useDispatch();

  function getTransaction(type) {
    let obj = {
      user_id: user.id,
      type: type,
    };
    dispatch(Actions.getTransactionCategory(obj));
  }
  useEffect(() => {
    getTransaction('QR Scan');
  }, []);

  console.log({ ListTransaction: transactionList });
  return (
    <View style={{ flex: 1, backgroundColor: Color.lightGreen }}>
      <Header title={I18n.t("my_rewards")} dashboard={false} back={true} help={true} />
      <RewardPointlayout />

      <QRCodeContainer bgColor={Color.lightGreen} />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType == 'QR Scan' && {
              borderColor: Color.parrot,
            },
          ]}
          onPress={() => {
            setTransactionType('QR Scan');
            getTransaction('QR Scan');
          }}>
          <TextRegular
            text={i18n.t('EarnedWon')}
            style={{ textAlign: 'center' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType == 'Redeemed' && {
              borderColor: Color.parrot,
            },
          ]}
          onPress={() => {
            setTransactionType('Redeemed');
            getTransaction('Redeemed');
          }}>
          <TextRegular text={i18n.t('redeem')} style={{ textAlign: 'center' }} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {/* <PointsWonLayout />
            <PointsWonLayout /> */}

        <PointsWonLayout />
        {/* <PointsWonLayout /> */}
      </View>
    </View>
  );
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(MyReward);
export default MyDashboard;

const styles = StyleSheet.create({
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
