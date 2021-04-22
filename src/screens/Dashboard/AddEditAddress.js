import React, { useRef, useState, useEffect } from 'react';
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

import { TextRegular, TextBold, TextSemiBold, TextMedium } from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import { useSelector, useDispatch } from 'react-redux';
import BottomTile from '../../components/BottomTile';
import TextInput from '../../components/TextInput';
import Icon from 'react-native-vector-icons/dist/Entypo';

const AddEditAddress = () => {
  const [hf_number, setHouseno] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPin] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');

  const selected = value => {
    return value == type ? {
      backgroundColor: Colors.theme,
      borderColor: Colors.theme,
    } : {}
  }

  return (
    <View style={{ flex: 1 }}>
      <Header transparent={true} title={I18n.t("addnewaddress")} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={{ flex: 1, padding: 16, backgroundColor: Colors.bgGray }}>
        <TextRegular text={I18n.t("fillther")} style={{ fontSize: Sizes.semiLarge }} />
        <View style={{ paddingStart: 7, paddingTop: 25 }}>
          <TextInput value={hf_number}
            lable="House/Flat number"
            placeholder="Enter House No."
            keyboardType="default"
            borderColor={Colors.border}
            onChangeText={hf_number => setHouseno(hf_number)}
          />
          <TextInput value={address}
            lable="Address"
            placeholder="Enter Address"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={address => setAddress(address)}
          />
          <TextInput value={landmark}
            lable="Landmark"
            placeholder="Near by"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={landmark => setLandmark(landmark)}
          />
          <TextInput value={state}
            lable="Your State"
            placeholder="Your State"
            borderColor={Colors.border}
            keyboardType="default"
            onPress={() => alert("opening state modal")}
            rightIcon="sort-down"
          />
          <TextInput value={pincode}
            lable="Pincode"
            placeholder="Enter pin code"
            borderColor={Colors.border}
            keyboardType="default"
            onChangeText={pincode => setPin(pincode)}
          />
        </View>
        <TextSemiBold text={I18n.t("saveas")} style={{
          fontSize: Sizes.semiLarge,
          color: Colors.parrot
        }} />
        <View style={styles.btnSection}>
          <TouchableOpacity style={[styles.btn, selected("Home")]}
            onPress={() => setType("Home")}>
            <Icon name={"home"} size={25}
              color={type == "Home" ? Colors.white : Colors.text} />
            <TextMedium text={I18n.t("home")}
              style={{
                fontSize: Sizes.medium,
                color: type == "Home" ? Colors.white : Colors.text
              }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, selected("Work")]}
            onPress={() => setType("Work")}>
            <Icon name={"briefcase"} size={25}
              color={type == "Work" ? Colors.white : Colors.text} />
            <TextMedium text={I18n.t("work")}
              style={{
                fontSize: Sizes.medium,
                color: type == "Work" ? Colors.white : Colors.text
              }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, selected("Other")]}
            onPress={() => setType("Other")}>
            <Icon name={"location-pin"} size={28}
              color={type == "Other" ? Colors.white : Colors.text} />
            <TextMedium text={I18n.t("other")}
              style={{
                fontSize: Sizes.medium,
                color: type == "Other" ? Colors.white : Colors.text
              }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTile title={I18n.t("addnewaddress")} onPress={() => {
        alert("saving details")
      }} />
      <SafeAreaView style={{ backgroundColor: Colors.parrot }}></SafeAreaView>
    </View>
  );
};

export default AddEditAddress;

const styles = StyleSheet.create({
  btnSection: {
    width: "100%", height: 60,
    flexDirection: "row", padding: 10,
    justifyContent: "space-between"
  },
  btn: {
    width: "30%",
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
})
