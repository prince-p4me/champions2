import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  I18nManager,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utility/Color';
import styles from '../../utility/Style';
import Loader from '../../components/Loader';
import * as Actions from '../../redux/action';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import i18n from '../../services/i18n';
import FullButton from '../../components/FullButton';

import { TextRegular, TextBold, TextSemiBold, TextMedium } from '../../components/TextView';
import TextDevider from '../../components/TextDevider';
import LinkButton from '../Auth/LinkButton';
import Sizes from '../../utility/Sizes';
import ChangeLanguage from '../Auth/ChangeLanguage';
import { useSelector, useDispatch } from 'react-redux';
import BottomTile from '../../components/BottomTile';
import Color from '../../utility/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TextInput from '../../components/TextInput';

const EditProfile = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <Header title={I18n.t("editdetails")} dashboard={false} back={true} help={true} />
      <ScrollView contentContainerStyle={[styles.container, { padding: 14, backgroundColor: Colors.white }]}>
        <TextInput value={name}
          lable="Full Name"
          icon="user-o"
          placeholder="Full name of user"
          onChangeText={full_name => setName(full_name)}
        />
        <TextInput value={mobile}
          lable="Mobile Number"
          icon="mobile-phone"
          placeholder="+91-**********"
          keyboardType="phone-pad"
          onChangeText={mobile => setMobile(mobile)}
        />
        <TextInput value={email}
          lable="Email"
          icon="envelope"
          placeholder="abc@your-domain.com"
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
        />
        <TextInput value={dob}
          lable="Date of Birth"
          icon="calendar-o"
          placeholder="03-JAN-1994"
          onPress={() => alert("opening date picker modal")}
        />
        <TextInput value={aadhar}
          lable="Aadhar Card ID Number"
          icon="dashboard"
          iconColor="rgb(203,86,91)"
          placeholder="989896777788"
          keyboardType="email-address"
          onChangeText={aadhar => setAadhar(aadhar)}
        />
        <TextInput value={mobile}
          lable="Upload Aadhar ID Photo"
          icon="address-card-o"
          placeholder="aadhar_photo.png"
          onPress={() => alert("opening aadhar card option camera/gallery")}
          rightButton="UPLOAD"
        />
      </ScrollView>
      <BottomTile title={I18n.t("uploadprofile")} onPress={() => {
        alert("saving details")
      }} />
      <SafeAreaView style={{ backgroundColor: Colors.parrot }}></SafeAreaView>
    </View>
  );
};

export default EditProfile;
