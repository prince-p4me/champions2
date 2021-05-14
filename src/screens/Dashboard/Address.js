import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  I18nManager,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import * as Actions from '../../redux/action';

import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';

import { TextRegular, TextThin } from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import { useSelector, useDispatch } from 'react-redux';
import BottomTile from '../../components/BottomTile';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Address = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);
  let list = useSelector(state => state.getAddressList);

  useEffect(() => {
    dispatch(Actions.getAddressList());
  }, []);

  const getAddress = item => {
    return (
      <View style={styles.box}>
        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Icon name="home" color={Colors.parrot} size={30}></Icon>
          </View>
          <View style={styles.inputBox}>
            <TextThin
              text={item.type + ' Address '}
              style={{ fontSize: Sizes.regular }}
            />
            <TextRegular numberOfLines={3}
              text={
                item.hf_number +
                ' ' +
                item.address +
                ' ' +
                item.landmark +
                ' ' +
                item.state +
                ' ' +
                item.pincode
              }
              style={{ fontSize: Sizes.medium, marginTop: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingEnd: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{ padding: 10, marginStart: 15, paddingEnd: 0 }}
            onPress={() => {
              Navigation.navigate('AddEditAddress', { item });
            }}>
            <TextRegular
              text="Edit"
              style={{
                color: Colors.parrot,
                fontSize: Sizes.regular,
              }}></TextRegular>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, marginStart: 15 }}
            onPress={() => {
              let info = {
                address_id: item.id,
              };
              dispatch(Actions.DeleteAddress(info));
            }}>
            <Icon name="trash" color="red" size={18}></Icon>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.t('address')}
        back={true}
        help={true}
      />
      <FlatList
        data={list}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => getAddress(item)}
        keyExtractor={({ item, index }) => index}
        ListEmptyComponent={
          <View>
            <TextRegular
              numberOfLines={2}
              text={'No Data Found'}
              style={{ fontSize: Sizes.medium, marginTop: 10 }}
            />
          </View>
        }
      />
      <BottomTile
        title={I18n.t('addnewaddress')}
        onPress={() => {
          Navigation.navigate('AddEditAddress', {});
        }}
      />
      <SafeAreaView style={{ backgroundColor: Colors.parrot }}></SafeAreaView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: Colors.white
  },
  box: {
    borderColor: Colors.bgGray,
    width: '100%',
    minHeight: 80,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    color: Colors.text,
  },
});
