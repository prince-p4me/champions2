import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { TextBold, TextLite, TextRegular, TextSemiBold, TextThin } from '../../components/TextView';
import moment from "moment"
import * as Actions from '../../redux/action';

// import { NavigationEvents } from 'react-navigation';
import Color from '../../utility/Color';
import I18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';
import Images from '../../utility/Image';
import * as Navigation from '../../navigation/navigation';

const Notification = () => {
  const data = useSelector(state => state.getNotification);
  const dispatch = useDispatch();
  const isRtl = useSelector(state => state.isRtl);
  const align = isRtl ? 'right' : 'left';

  useEffect(() => {
    dispatch(Actions.getNotification());
  }, []);

  const handleNavigation = data => {
    console.log('data', data);
    let routeName = 'Home';
    let id = null;
    if (data) {
      switch (data?.type?.toLowerCase()) {
        case 'winner':
          routeName = 'WinnerAll';
          break;

        case 'offer':
          routeName = 'OfferDetail';
          id = data.n_id;
          break;

        case 'recipe':
          routeName = 'RecipieDetail';
          id = data.n_id;
          break;

        case 'redeemed':
          routeName = 'MyReward';
          break;

        default:
          routeName = 'Home';
          break;
      }
    }
    Navigation.navigate(routeName, id && { id });
  };

  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.notif}
        onPress={() => handleNavigation(item)}>
        <View style={styles.imgBox}>
          <Image source={Images.notif} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
        </View>
        <View style={{ flex: 1, height: "100%", padding: 8, justifyContent: "center" }}>
          <TextRegular text={item.description} style={{ fontSize: Sizes.regular }}
            numberOfLines={3} />
          <TextThin text={item.type} style={{ fontSize: Sizes.regular, marginTop: 3 }} />
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TextThin text={item.created_at.split(" ")[0] + " | " + item.created_at.split(" ")[1]} style={{ fontSize: Sizes.small, marginBottom: -20 }} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.t("notification")} dashboard={false} back={true} help={true} />
      <View style={styles.container}>
        <SectionList contentContainerStyle={{
          flexGrow: 1
        }}
          sections={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => renderItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ width: "100%", alignItems: "flex-start", paddingVertical: 12 }}>
              <TextRegular text={title} style={{ fontSize: Sizes.regular }} />
            </View>
          )}
          keyExtractor={(item, index) => item + index}
          ListFooterComponent={(<View style={{ height: 50 }}></View>)}
          ListEmptyComponent={(<View style={{
            flex: 1, justifyContent: "center",
            alignItems: "center"
          }}>
            <TextRegular text="No data found" />
          </View>)} />
        {/* <FlatList data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => renderItem(item)}
          ListFooterComponent={(<View style={{ height: 50 }}></View>)}
          ListEmptyComponent={(<View style={{
            flex: 1, justifyContent: "center",
            alignItems: "center"
          }}>
            <TextRegular text="No data found" />
          </View>)}
        /> */}
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
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 8
  }
});
