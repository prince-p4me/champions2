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
import RNRestart from 'react-native-restart';

import Images from '../../utility/Image';
import Constant from '../../utility/Constant';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import { useSelector, useDispatch } from 'react-redux';
import BottomTile from '../../components/BottomTile';
import Color from '../../utility/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TextInput from '../../components/TextInput';
import ProfilePicModal from '../../components/ProfilePicModal';
import * as API from "../../services/Api";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { showToast } from '../../utility/Index';
import DatePicker from 'react-native-datepicker';
import { TextRegular } from '../../components/TextView';
import LanguageModal from '../../components/LanguageModal';
import Language from '../../assets/language/language.json';
import { Keyboard } from 'react-native';
const languages = ['English', 'Hindi', 'Punjabi', 'Bangla', 'Urdu'];
const langTypes = ['en', 'hn', 'pu', 'ba', 'ur'];

const EditProfile = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [bought_from, setboughtFrom] = useState('');
  const [pincode, setPinCode] = useState('');
  const [full_adress, setFulladdress] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('01-12-1994');
  const [aadhar, setAadhar] = useState('');
  const [showDatePicker, setDatePicker] = useState(false);
  let [profilePicVisible, setProfilePicVisible] = useState(false);
  const [responseImg, setResponse] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.getUser);
  const datePickerRef = useRef(null);
  let [modalVisible, setModalVisible] = useState(false);
  let [languageList, updateLanguageList] = useState(Language);
  let [states, setStates] = useState([]);
  let [selectedState, setSelectedState] = useState(null);

  let [categories, setCategories] = useState([]);
  let [category, setSelectCategory] = useState(null);
  let [allStates, setAllStates] = useState([]);
  let [cities, setCities] = useState([]);
  let [city, selectCity] = useState(null);

  let [religions, setReligions] = useState([]);
  let [religion, selectReligion] = useState(null);
  let language = useSelector(state => state.getLanguage);
  const forceUpdate = React.useReducer(bool => !bool)[1];

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
    if (user.state) {
      setSelectedState(user.state);
    }
    if (allStates.length && user.state) {
      getCities(user.state);
    }
    if (user.city) {
      selectCity(user.city);
    }
    if (user.pincode) {
      setPinCode(user.pincode);
    }
    if (user.full_adress) {
      setFulladdress(user.full_adress);
    }
    if (user.bought_from) {
      setboughtFrom(user.bought_from);
    }
    if (user.religion) {
      selectReligion(user.religion);
    }
  }, [user]);

  const getLanguage = () => {
    let index = langTypes.findIndex(lang => lang === language);
    return languages[index];
  };

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 100);
  }, [language]);

  useEffect(() => {
    dispatch(Actions.setLoading(true));
    API.getStates().then((res) => {
      console.log(res);
      let data = [];
      if (res.data) {
        res.data.forEach((val) => {
          data.push(val.name);
        });
      }
      setAllStates(res.data);
      setStates(data);
      dispatch(Actions.setLoading(false));
      if (user.state) {
        getCities(user.state);
      }
    });
    API.getCategory().then((res) => {
      console.log(res);
      let data = [];
      if (res.data) {
        res.data.forEach((val) => {
          data.push(val.name);
        });
      }
      setCategories(data);
      dispatch(Actions.setLoading(false));
    });
    API.getReligions().then((res) => {
      console.log(res);
      let data = [];
      if (res.data) {
        res.data.forEach((val) => {
          data.push(val.name);
        });
      }
      setReligions(data);
      dispatch(Actions.setLoading(false));
    });
  }, [])

  useEffect(() => {
    // selectCity(null);
    setCities([]);
    getCities(selectedState);
  }, [selectedState]);

  const getCities = (state) => {
    let obj = {};
    if (!allStates.length) {
      return;
    }
    for (let i = 0; i < allStates.length; i++) {
      if (state === allStates[i].name) {
        obj = allStates[i];
        break;
      }
    }
    if (!obj.id) {
      return
    }
    API.getCities({ state_id: obj.id }).then((res) => {
      let data = [];
      if (res.data) {
        res.data.forEach((val) => {
          data.push(val.name);
        });
      }
      setCities(data);
      dispatch(Actions.setLoading(false));
    });
  };

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
        console.log({ response: response });
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
    if (name == '' || !name) {
      message = 'Please enter your name';
    }
    // else if (email == '' || (email && !regex.test(email))) {
    //   message = 'Please enter valid email id.';
    // }
    else if (mobile == '' || (mobile.length && mobile.length < 10)) {
      message = 'Please enter valid 10 digit mobile number.';
    } else if (!selectedState) {
      message = "Please select your state";
    } else if (!city) {
      message = "Please select your city";
    } else if (!bought_from) {
      message = "Please enter where did your buy";
    } else if (!pincode) {
      message = "Please enter your pincode";
    } else if (!full_adress) {
      message = "Please enter your full address";
    }

    // else if (dob == '') {
    //   message = 'Please enter your date of birth.';
    // }

    // else if (
    //   (user.aadhaar_photo && !aadhar) ||
    //   !aadhar.length ||
    //   aadhar.length != 12
    // ) {
    //   message = 'Please enter valid aadhar number.';
    // }

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
      state: selectedState,
      city,
      pincode,
      full_adress,
      bought_from,
      category,
      religion,
    };

    dispatch(Actions.updateProfile(userInfo));
  };

  const renderModal = () => {
    return (
      <>
        <LanguageModal
          visible={modalVisible}
          Language={languageList}
          onPress={item => {
            if (item && item.code) {
              dispatch(Actions.setLanguage(item.code));
              dispatch(Actions.setRtl(item.code == 'ur'));
              I18n.locale = item.code;
              setTimeout(() => {
                RNRestart.Restart();
              }, 2500);
            }
            setModalVisible(false);
          }}
          onChangeLanguage={text => {
            console.log(text);
            if (text == '' || !text) {
              //   alert(Language.length);
              console.log({ Language: Language });
              updateLanguageList(Language);
              return;
            }

            languageList = Language.filter(function (item) {
              console.log('232');
              console.log(item.name.toLowerCase());
              console.log(text.toLowerCase());
              return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            updateLanguageList(languageList);
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderModal()}
      <Header
        back={true}
        title={I18n.t('editdetails')}
        dashboard={false}
        help={true}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 14, backgroundColor: Colors.white,
          flexGrow: 1, alignItems: "center"
        }}>
        <TouchableOpacity
          style={[styles.closeImage, styles.languageItem]}
          onPress={() => setModalVisible(true)}>
          <View
            style={{
              flex: 7,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Images.language}
              style={styles.image}
              resizeMode="contain"></Image>
            <TextRegular style={styles.textstyle} text={I18n.t('language')} />
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'flex-end',
            }}>
            <TextRegular
              style={[styles.textstyle, { color: Color.theme }]}
              text={getLanguage()}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          value={name}
          lable={I18n.t('full_name') + " *"}
          icon="user-o"
          returnKeyType="next"
          keyboardType="default"
          placeholder={I18n.t('full_name') + " *"}
          onChangeText={full_name => setName(full_name)}
        />
        <TextInput
          value={mobile}
          lable={I18n.t('mobile') + " *"}
          icon="mobile-phone"
          placeholder="+91-**********"
          keyboardType="phone-pad"
          returnKeyType="next"
          maxLength={10}
          onChangeText={mobile => setMobile(mobile)}
        />
        <TextInput
          value={email}
          lable={I18n.t('email') + " *"}
          icon="envelope"
          placeholder="abc@your-domain.com"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          value={dob}
          lable={I18n.t("dob")}
          icon="calendar-o"
          placeholder="03-JAN-1994"
          onPress={() => {
            setDatePicker(true);
            datePickerRef.current.onPressDate();
          }}
          keyboardType="default"
        />

        <TextInput
          value={selectedState || user?.state}
          lable={I18n.t("select_state") + " *"}
          icon="dashboard"
          placeholder={I18n.t("select_state")}
          dropdownData={states}
          onChangeText={value => setSelectedState(value)}
          keyboardType="default"
        />

        <TextInput
          value={city || user.city}
          lable={I18n.t("select_city") + " *"}
          icon="dashboard"
          placeholder={I18n.t("select_city")}
          dropdownData={cities}
          onChangeText={value => selectCity(value)}
          keyboardType="default"
        />

        <TextInput
          value={bought_from}
          lable={I18n.t("bought_from") + " *"}
          icon="user-o"
          placeholder={I18n.t("bought_from")}
          keyboardType="default"
          returnKeyType="next"
          onChangeText={bought_from => setboughtFrom(bought_from)}
        />

        <TextInput
          value={pincode}
          lable={I18n.t("pincode") + " *"}
          icon="location-arrow"
          placeholder={I18n.t("pincode")}
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={pincode => setPinCode(pincode)}
        />

        <TextInput
          value={full_adress}
          lable={I18n.t("Full_Address") + " *"}
          icon="location-arrow"
          placeholder={I18n.t("Full_Address")}
          keyboardType="default"
          returnKeyType="next"
          // row={3}
          onChangeText={full_adress => setFulladdress(full_adress)}
        // onSubmitEditing={() => {
        //   Keyboard.dismiss();
        // }}
        />

        <TextInput
          value={category || user?.category}
          lable={I18n.t("Select_Category")}
          icon="dashboard"
          placeholder={I18n.t("Select_Category")}
          dropdownData={categories}
          onChangeText={value => setSelectCategory(value)}
          keyboardType="default"
        />
        <TextInput
          value={religion || user?.religion}
          lable={I18n.t("Select_Religion")}
          icon="dashboard"
          placeholder={I18n.t("Select_Religion")}
          dropdownData={religions}
          onChangeText={value => selectReligion(value)}
          keyboardType="default"
        />

        <TextInput
          value={aadhar}
          lable={I18n.t("aadhar")}
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
          lable={I18n.t("upload_aadhar")}
          icon="address-card-o"
          placeholder="aadhar_photo.png"
          onPress={() => {
            setProfilePicVisible(true);
          }}
          rightTick={adharImgUploaded}
          rightButton={I18n.t("UPLOAD")}
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
        style={{ width: 0, height: 0, opacity: 0 }}
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
      <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>
    </View>
  );
};

export default EditProfile;
