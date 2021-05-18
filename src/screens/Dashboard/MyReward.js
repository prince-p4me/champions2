import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import Header from '../../components/Header';
import { TextRegular, TextThin } from '../../components/TextView';
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
import Sizes from '../../utility/Sizes';
import Images from '../../utility/Image';
import I18n from '../../services/i18n';
import styles from '../../utility/Style';

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
      {pointInfo.product_name ?
        <View style={{ width: "100%", paddingTop: 10, paddingHorizontal: 3 }}>
          <TextRegular
            text={'Redeemed ' + pointInfo.points}
            style={{ textAlign: "center", fontSize: Sizes.semiLarge }}
          />
          <TextRegular text={"for " + pointInfo.product_name}
            style={{ textAlign: "center", fontSize: Sizes.regular, marginTop: 3 }}
            numberOfLines={2} />
        </View> :
        <TextRegular
          text={'Points Won'}
          style={{ textAlign: "center", fontSize: Sizes.semiLarge, marginTop: 10 }}
        />}
      {!pointInfo.product_name && <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
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
        <TextRegular
          text={pointInfo.points}
          style={{ textAlign: align, fontSize: Sizes.regular, marginTop: 5 }}
        />
      </View>
      }
      <TextThin
        numberOfLines={3}
        text={pointInfo.date}
        style={{
          textAlign: "center",
          fontSize: Sizes.regular,
          marginTop: 20,
        }}
      />
    </View>
  );
};

const MyDashboard = () => {
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

  const ButtonBar = () => {
    return (
      <View style={styles1.buttons}>
        <TouchableOpacity
          style={[
            styles1.button,
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
            styles1.button,
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
    )
  }

  console.log({ ListTransaction: transactionList });
  return (
    <View style={{ flex: 1, backgroundColor: Color.lightGreen }}>
      <Header title={I18n.t("rewardpoint")} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <RewardPointlayout />
        <QRCodeContainer bgColor={Color.lightGreen} />
        <FlatList
          columnWrapperStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          data={transactionList}
          numColumns={2}
          renderItem={({ item, index }) => <PointWonLayout item={item} />}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={(<View style={{ height: 50 }}></View>)}
          ListHeaderComponent={(<ButtonBar />)}
        />
      </ScrollView>
    </View>
  );
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(MyReward);
export default MyDashboard;

const styles1 = StyleSheet.create({
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
