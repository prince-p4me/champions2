import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import * as Actions from '../../redux/action';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';

import {
  TextRegular,
  TextBold,
  TextSemiBold,
  TextMedium,
} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import {useSelector, useDispatch} from 'react-redux';
import BottomTile from '../../components/BottomTile';
import TextInput from '../../components/TextInput';
import Icon from 'react-native-vector-icons/dist/Entypo';
import StateModal from '../../components/StateModal';
import {showResponse} from '../../utility/Index';

const AddEditAddress = ({route}) => {
  const {item} = route.params;
  const [hf_number, setHouseno] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPin] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');
  const AllStates = useSelector(state => state.getStates);
  let [modalVisible, setModalVisible] = useState(false);
  let [statelist, setStateList] = useState(AllStates);
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);

  const selected = value => {
    return value == type
      ? {
          backgroundColor: Colors.theme,
          borderColor: Colors.theme,
        }
      : {};
  };

  const renderModal = () => {
    return (
      <>
        <StateModal
          visible={modalVisible}
          statelist={statelist}
          onPress={item => {
            if (item && item.id) {
            }
            setState(item.name);
            setModalVisible(false);
          }}
          onChangeState={text => {
            if (text == '' || !text) {
              setStateList(AllStates);
              return;
            }
            statelist = AllStates.filter(function (item) {
              return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            setStateList(statelist);
          }}
        />
      </>
    );
  };

  const saveAddress = () => {
    let message = '';

    if (hf_number == '') {
      message = 'Please Enter House Number.';
    } else if (address == '') {
      message = 'Please Enter Address.';
    } else if (landmark == '') {
      message = 'Please Enter Landmark.';
    } else if (state == '') {
      message = 'Please Select State.';
    } else if (pincode == '') {
      message = 'Please Enter PinCode.';
    } else if (type == '') {
      message = 'Please Select Type.';
    }

    if (message != '') {
      let messageInfo = {
        message: message,
      };
      showResponse(messageInfo);
      return;
    }

    let info = {
      user_id: user.id,
      type: type,
      hf_number: hf_number,
      address: address,
      landmark: landmark,
      state: state,
      pincode: pincode,
    };
    if (item && item.id) {
      info.address_id = item.id;
    }
    dispatch(Actions.AddAdress(info));
  };

  useEffect(() => {
    if (item) {
      setHouseno(item.hf_number);
      setAddress(item.address);
      setLandmark(item.landmark);
      setPin(item.pincode);
      setState(item.state);
      setType(item.type);
    }
  }, []);
  return (
    <View style={{flex: 1}}>
      {renderModal()}
      <Header
        transparent={true}
        title={I18n.t('addnewaddress')}
        dashboard={false}
        back={true}
        help={true}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors.bgGray,
        }}>
        <TextRegular
          text={I18n.t('fillther')}
          style={{fontSize: Sizes.semiLarge}}
        />
        <View style={{paddingStart: 7, paddingTop: 25}}>
          <TextInput
            value={hf_number}
            lable="House/Flat number"
            placeholder="Enter House No."
            keyboardType="default"
            borderColor={Colors.border}
            onChangeText={hf_number => setHouseno(hf_number)}
          />
          <TextInput
            value={address}
            lable="Address"
            placeholder="Enter Address"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={address => setAddress(address)}
          />
          <TextInput
            value={landmark}
            lable="Landmark"
            placeholder="Near by"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={landmark => setLandmark(landmark)}
          />
          <TextInput
            value={state}
            lable="Your State"
            placeholder="Your State"
            borderColor={Colors.border}
            keyboardType="default"
            onPress={() => {
              setModalVisible(true);
            }}
            rightIcon="sort-down"
          />
          <TextInput
            value={pincode}
            lable="Pincode"
            placeholder="Enter pin code"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={pincode => setPin(pincode)}
          />
        </View>
        <TextSemiBold
          text={I18n.t('saveas')}
          style={{
            fontSize: Sizes.semiLarge,
            color: Colors.parrot,
          }}
        />
        <View style={styles.btnSection}>
          <TouchableOpacity
            style={[styles.btn, selected('Home')]}
            onPress={() => setType('Home')}>
            <Icon
              name={'home'}
              size={25}
              color={type == 'Home' ? Colors.white : Colors.text}
            />
            <TextMedium
              text={I18n.t('home')}
              style={{
                fontSize: Sizes.medium,
                color: type == 'Home' ? Colors.white : Colors.text,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, selected('Work')]}
            onPress={() => setType('Work')}>
            <Icon
              name={'briefcase'}
              size={25}
              color={type == 'Work' ? Colors.white : Colors.text}
            />
            <TextMedium
              text={I18n.t('work')}
              style={{
                fontSize: Sizes.medium,
                color: type == 'Work' ? Colors.white : Colors.text,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, selected('Other')]}
            onPress={() => setType('Other')}>
            <Icon
              name={'location-pin'}
              size={28}
              color={type == 'Other' ? Colors.white : Colors.text}
            />
            <TextMedium
              text={I18n.t('other')}
              style={{
                fontSize: Sizes.medium,
                color: type == 'Other' ? Colors.white : Colors.text,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTile
        title={I18n.t('saveAddress')}
        onPress={() => {
          saveAddress();
        }}
      />
      <SafeAreaView style={{backgroundColor: Colors.parrot}}></SafeAreaView>
    </View>
  );
};

export default AddEditAddress;

const styles = StyleSheet.create({
  btnSection: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  btn: {
    width: '30%',
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
