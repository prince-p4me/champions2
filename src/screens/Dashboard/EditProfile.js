import React, {useRef, useState, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import BottomTile from '../../components/BottomTile';
import Color from '../../utility/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TextInput from '../../components/TextInput';
import ProfilePicModal from '../../components/ProfilePicModal';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {showToast} from '../../utility/Index';
import DatePicker from 'react-native-datepicker';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('01-12-1994');
  const [aadhar, setAadhar] = useState('');
  const [showDatePicker, setDatePicker] = useState(false);
  let [profilePicVisible, setProfilePicVisible] = useState(false);
  const [responseImg, setResponse] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);
  const datePickerRef = useRef(null);

  const [adharImgUploaded, setUploaded] = useState(null);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
    }
    if (user.mobile) {
      setMobile(user.mobile);
    }
    if (user.email) {
      setEmail(user.email);
    }
    if (user.birth_date) {
      setDob(user.birth_date);
    }
    if (user.aadhaar_number) {
      setAadhar(user.aadhaar_number);
    }
    if (user.aadhaar_photo) {
      setUploaded(user.aadhaar_photo);
    }
  }, []);

  const chooseImage = imageType => {
    let option = {
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      includeBase64: true,
    };
    if (imageType == 'camera') {
      launchCamera(option, response => {
        if (response.didCancel) {
          showToast('Please select your profile picture');
          return;
        }
        if (response.errorCode) {
          showToast('Please select your profile picture');
          return;
        }
        setResponse(response);

        setTimeout(() => {
          uploadImage();
          setProfilePicVisible(false);
        }, 0);
      });
    } else if (imageType == 'gallery') {
      launchImageLibrary(option, response => {
        console.log({response: response});
        if (response.didCancel) {
          showToast('Please select your profile picture');
          return;
        } else {
          setResponse(response);
          setTimeout(() => {
            uploadImage();
            setProfilePicVisible(false);
          }, 0);
        }
      });
    } else {
      setProfilePicVisible(false);
    }
  };

  const uploadImage = () => {
    let uploadInfo = user;
    uploadInfo.aadhaar_photo =
      responseImg && responseImg.base64 ? responseImg.base64 : null;
    dispatch(Actions.uploadAdharImage(uploadInfo));
  };

  const updateProfile = () => {
    let message = '';
    const regex = /\S+@\S+\.\S+/;
    if (name == '') {
      message = 'Please enter your name';
    }
    // else if (email == '' || (email && !regex.test(email))) {
    //   message = 'Please enter valid email id.';
    // } else if (mobile == '' || (mobile.length && mobile.length < 10)) {
    //   message = 'Please enter valid 10 digit mobile number.';
    // } else if (dob == '') {
    //   message = 'Please enter your date of birth.';
    // }
    else if (
      (user.aadhaar_photo && !aadhar) ||
      !aadhar.length ||
      aadhar.length != 12
    ) {
      message = 'Please enter valid aadhar number.';
    }

    if (message != '') {
      showToast(message);
      return;
    }
    let userInfo = {
      user_id: user.id,
      name: name,
      email: email,
      mobile: mobile,
      birth_date: dob,
      aadhaar_number: aadhar,
      aadhaar_photo: user.aadhaar_photo,
      profile_photo: user.profile_photo,
    };

    dispatch(Actions.updateProfile(userInfo));
  };

  return (
    <View style={{flex: 1}}>
      <Header
        back={true}
        title={I18n.t('editdetails')}
        dashboard={false}
        help={true}
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {padding: 14, backgroundColor: Colors.white},
        ]}>
        <TextInput
          value={name}
          lable="Full Name"
          icon="user-o"
          returnKeyType="next"
          placeholder="Full name of user"
          onChangeText={full_name => setName(full_name)}
        />
        <TextInput
          value={mobile}
          lable="Mobile Number"
          icon="mobile-phone"
          placeholder="+91-**********"
          keyboardType="phone-pad"
          returnKeyType="next"
          maxLength={10}
          onChangeText={mobile => setMobile(mobile)}
        />
        <TextInput
          value={email}
          lable="Email"
          icon="envelope"
          placeholder="abc@your-domain.com"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          value={dob}
          lable="Date of Birth"
          icon="calendar-o"
          placeholder="03-JAN-1994"
          onPress={() => {
            setDatePicker(true);
            datePickerRef.current.onPressDate();
          }}
        />
        <TextInput
          value={aadhar}
          lable="Aadhar Card ID Number"
          keyboardType="numeric"
          icon="dashboard"
          iconColor="rgb(203,86,91)"
          placeholder="989896777788"
          onChangeText={text => setAadhar(text)}
          maxLength={12}
          returnKeyType="next"
        />

        <TextInput
          value={responseImg && responseImg.fileName}
          lable="Upload Aadhar ID Photo"
          icon="address-card-o"
          placeholder="aadhar_photo.png"
          onPress={() => {
            setProfilePicVisible(true);
          }}
          rightTick={adharImgUploaded}
          rightButton="UPLOAD"
        />
      </ScrollView>

      <ProfilePicModal
        visible={profilePicVisible}
        onPress={imageType => {
          console.log(imageType);
          if (imageType == 'camera' || imageType == 'gallery') {
            chooseImage(imageType);
          } else {
            setProfilePicVisible(false);
          }
        }}
      />

      <DatePicker
        date={dob}
        style={{width: 0, height: 0, opacity: 0}}
        ref={datePickerRef}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1994"
        maxDate="01-01-2021"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => {
          setDob(date);
        }}
      />

      <BottomTile title={I18n.t('uploadprofile')} onPress={updateProfile} />
      <SafeAreaView style={{backgroundColor: Colors.parrot}}></SafeAreaView>
    </View>
  );
};

export default EditProfile;
