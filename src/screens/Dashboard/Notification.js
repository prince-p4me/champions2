import React, { useEffect } from 'react';
import { View, StyleSheet, Share, Image } from 'react-native';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { TextBold, TextLite, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
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
import Style from '../../utility/Style';

const Notification = () => {
  const user = useSelector(state => state.getUser);
  const dispatch = useDispatch();
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';
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

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.t("notification")} dashboard={false} back={true} help={true} />
      <View style={styles.container}>
        <View style={[Style.cardView, styles.notif]}>
          <View style={styles.imgBox}>
            <Image source={Images.notif} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
          </View>
          <View style={{ flex: 1, height: "100%", padding: 8, justifyContent: "center" }}>
            <TextRegular text={"Congratulations!! 500 points credited."} style={{ fontSize: Sizes.regular }} />
            <TextThin text={I18n.t("clicknotif")} style={{ fontSize: Sizes.regular, marginTop: 3 }} />
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <TextThin text={"03-JAN-2021"} style={{ fontSize: Sizes.small, marginBottom: -20 }} />
            </View>
          </View>
        </View>
      </View>
    </View >
  );
  // }
};

export default Notification;

const styles = StyleSheet.create({
  imgBox: {
    width: 80, height: 80,
    backgroundColor: "red",
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Color.border
  },
  container: {
    flex: 1, backgroundColor: Color.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 15
  },
  notif: {
    width: "100%", height: 90,
    backgroundColor: Color.white,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center"
  }
});
