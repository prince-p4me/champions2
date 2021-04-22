import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { TextRegular, TextSemiBold } from '../../components/TextView';
import I18n from '../../services/i18n';
import Images from '../../utility/Image';
import Header from '../../components/Header';
import * as Navigation from '../../navigation/navigation';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';
import Language from '../../assets/language/language.json';
import LanguageModal from '../../components/LanguageModal';
import RNRestart from 'react-native-restart';
import ProfilePicModal from '../../components/ProfilePicModal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Color from '../../utility/Color';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Constant from '../../utility/Constant';
import { showToast } from '../../utility/Index';

import About from '../../assets/imgs/user.jpeg';

const languages = ['English', 'Hindi', 'Punjabi', 'Bangla', 'Urdu'];
const langTypes = ['en', 'hn', 'pu', 'ba', 'ur'];

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const Profilemain = props => {
  const user = useSelector(state => state.getUser);
  let [modalVisible, setModalVisible] = useState(false);
  let [languageList, updateLanguageList] = useState(Language);
  let [profilePicVisible, setProfilePicVisible] = useState(false);
  let language = useSelector(state => state.getLanguage);
  const forceUpdate = React.useReducer(bool => !bool)[1];
  const dispatch = useDispatch();
  let [responseImg, setResponse] = useState(null);
  console.log('user', user);

  const getLanguage = () => {
    let index = langTypes.findIndex(lang => lang === language);
    return languages[index];
  };

  useEffect(() => {
    setTimeout(() => {
      I18n.locale = language;
      forceUpdate();
    }, 10);
  }, [language]);

  const renderHelpSection = () => {
    return (
      <>
        <TextSemiBold
          text={I18n.t('help')}
          style={{ margin: 10, alignSelf: 'flex-start' }}
        />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => Navigation.navigate('ContactUs')}>
          <Image
            source={Images.contactus}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('Contactus')} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => Navigation.navigate('SendQuery')}>
          <Image
            source={Images.about}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('sendquery')} />
        </TouchableOpacity>

        <View style={styles.line} />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => {
            Navigation.navigate('AboutUs');
          }}>
          <Image
            source={Images.about}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('about')} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => Navigation.navigate('Terms')}>
          <Image
            source={Images.termcondition}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular
            style={styles.textstyle}
            text={I18n.t('termcondition')}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => Navigation.navigate('Privacy')}>
          <Image
            source={Images.privacypolicy}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('Privacy')} />
        </TouchableOpacity>
      </>
    );
  };

  const upperSection = () => {
    return (
      <>
        <TouchableOpacity
          disabled={true}
          style={styles.closeImage}
          onPress={() => Navigation.navigate('Address')}>
          <Image
            source={Images.address}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('address')} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={[styles.closeImage, { alignItems: 'center' }]}
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
              style={[styles.textstyle, { color: Color.green }]}
              text={getLanguage()}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          disabled={true}
          style={styles.closeImage}
          onPress={() => Navigation.navigate('Editprofile')}>
          <Image
            source={Images.aadhar}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('Aadhar')} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.closeImage}
          onPress={() => Navigation.navigate('SendFeedback')}>
          <Image
            source={Images.feedback}
            style={styles.image}
            resizeMode="contain"></Image>
          <TextRegular style={styles.textstyle} text={I18n.t('Sendfeedback')} />
        </TouchableOpacity>
        <View style={styles.line} />
      </>
    );
  };

  const uploadImage = () => {
    let uploadInfo = user;
    uploadInfo.profile_photo =
      responseImg && responseImg.base64 ? responseImg.base64 : null;
    dispatch(Actions.uploadImage(uploadInfo));
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
              // dispatch(Actions.setRtl(true));
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
        <ProfilePicModal
          visible={profilePicVisible}
          onPress={imageType => {
            console.log(imageType);

            let option = {
              mediaType: 'photo',
              includeBase64: false,
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
          }}
        />
      </>
    );
  };

  const renderProfile = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginTop: 10,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          disabled={false}
          style={{ height: 100, width: 100, padding: 10 }}
          onPress={() => {
            setProfilePicVisible(true);
          }}>
          <Image
            source={
              user.profile_photo != ''
                ? { uri: Constants.IMAGE_URL + user.profile_photo }
                : About
            }
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
            resizeMode="cover"></Image>
          <View
            style={{
              position: 'relative',
              bottom: '45%',
              alignSelf: 'center',
            }}>
            <Icon name="camera" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TextRegular
            style={[styles.textstyle, { marginTop: 15 }]}
            text={user.name}
          />
          {user.email ? (
            <TextRegular
              style={[styles.textstyle, { marginTop: 7 }]}
              text={user.email}
            />
          ) : null}
          <TextRegular
            style={[styles.textstyle, { marginTop: 7 }]}
            text={user.mobile}
          />
        </View>

        <TouchableOpacity
          disabled={true}
          style={{
            width: 80,
            justifyContent: 'center',
          }}
          onPress={() => {
            Navigation.navigate('Editprofile');
          }}>
          <Image
            source={Images.edit}
            style={{
              height: 30,
              width: 30,
              alignSelf: 'center',
              marginEnd: 15,
            }}
            resizeMode="contain"></Image>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderModal()}
      <Header title={'Profile'} dashboard={false} back={true} help={true} />
      <ScrollView>
        {renderProfile()}
        <View style={styles.line} />
        {upperSection()}
        {renderHelpSection()}
        <TouchableOpacity
          style={[styles.closeImage, { backgroundColor: 'transparent' }]}
          onPress={() => {
            dispatch(Actions.logOut());
          }}>
          <View style={{ width: 40 }}>
            <Image
              source={Images.logout}
              style={{ height: 18, width: 18 }}
              resizeMode="contain"></Image>
          </View>
          <TextSemiBold text={I18n.t('logout')} style={{ marginStart: 5 }} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  closeImage: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
  },
  textstyle: {
    marginStart: 20,
  },
  image: {
    height: 25,
    width: 25,
  },
});

export default Profilemain;
