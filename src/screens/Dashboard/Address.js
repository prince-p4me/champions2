import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  I18nManager,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import styles1 from '../../utility/Style';
import Loader from '../../components/Loader';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import {
  TextRegular,
  TextBold,
  TextSemiBold,
  TextMedium,
  TextThin,
} from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from '../Auth/LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from '../Auth/ChangeLanguage';
import {useSelector, useDispatch} from 'react-redux';
import BottomTile from '../../components/BottomTile';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Address = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);
  let userAddress;
  dispatch(Actions.getAddressList(user.id));

  const getAddress = () => {
    let userAddress2 = [
      {
        id: '26',
        type: 'Work',
        hf_number: '52',
        address: 'Rohini West',
        landmark: 'Buddha Road',
        state: 'Lucknow',
        pincode: '225302',
        created_at: '2021-04-22 11:25:40',
      },
    ];
    if (userAddress2 && userAddress2.length) {
      userAddress2.map((item, index) => (
        <View>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="home" color={Colors.parrot} size={30}></Icon>
            </View>
            <View style={styles.inputBox}>
              <TextThin
                text={item.type + 'Address '}
                style={{fontSize: Sizes.regular}}
              />
              <TextRegular
                numberOfLines={2}
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
                style={{fontSize: Sizes.medium, marginTop: 10}}
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
              style={{padding: 10, marginStart: 15, paddingEnd: 0}}
              onPress={() => alert('editing')}>
              <TextRegular
                text="Edit"
                style={{
                  color: Colors.parrot,
                  fontSize: Sizes.regular,
                }}></TextRegular>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10, marginStart: 15}}
              onPress={() => alert('deleting')}>
              <Icon name="trash" color="red" size={18}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      ));
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={I18n.t('address')}
        dashboard={false}
        back={true}
        help={true}
      />
      <ScrollView
        contentContainerStyle={[
          styles1.container,
          {paddingTop: 25, backgroundColor: Colors.white},
        ]}>
        <View style={styles.container}>
          {userAddress && userAddress.length > 0 && getAddress()}

          {!userAddress && (
            <View>
              <TextRegular
                numberOfLines={2}
                text={'No Data Found'}
                style={{fontSize: Sizes.medium, marginTop: 10}}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <BottomTile
        title={I18n.t('addnewaddress')}
        onPress={() => {
          Navigation.navigate('AddEditAddress');
        }}
      />
      <SafeAreaView style={{backgroundColor: Colors.parrot}}></SafeAreaView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: Colors.bgGray,
  },
  row: {
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
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
