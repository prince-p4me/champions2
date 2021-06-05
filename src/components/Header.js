import React from 'react';
import {
  TouchableOpacity,
  StatusBar,
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import styles from '../utility/Style';
import Constants from '../utility/Constant';
import SideIcon from '../assets/imgs/arrow.png';
import About from '../assets/imgs/user.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../redux/action';

import Logout from '../assets/imgs/home-logout.png';
import Back from '../assets/imgs/arrow.png';
import alarm from '../assets/imgs/alarm.png';
import Help from '../assets/imgs/help.png';
// import Icon from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';

import * as Navigation from '../navigation/navigation';
import Color from '../utility/Color';
import { TextMedium, TextThin } from './TextView';
import Sizes from '../utility/Sizes';

const Header = props => {
  const { title, transparent, bgColor, back, dashboard, help } = props;
  const isRtl = useSelector(state => state.isRtl);
  const user = useSelector(state => state.getUser);
  const data = useSelector(state => state.getNotification);
  const dispatch = useDispatch();

  return (
    <View style={{ width: '100%' }}>
      <SafeAreaView
        style={[
          styles.safeArea,
          transparent && { backgroundColor: Color.white },
          bgColor && { backgroundColor: bgColor },
        ]}></SafeAreaView>
      {!dashboard && (
        <View
          style={[
            styles.header,
            transparent && { backgroundColor: Color.white },
            bgColor && { backgroundColor: bgColor },
          ]}>
          {back && (
            <TouchableOpacity
              style={[
                styles.drawerButton,
                { position: 'relative', alignItems: 'flex-start' },
              ]}
              activeOpacity={0.7}
              onPress={() => Navigation.goBack()}>
              {isRtl ? (
                <Icon1
                  name="arrow-right-alt"
                  size={30}
                  color={transparent ? Color.black : '#fff'}
                />
              ) : (
                <Image
                  source={Back}
                  style={[
                    styles.sideIcon,
                    transparent && { tintColor: Color.black },
                  ]}></Image>
              )}
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={[styles.title, transparent && { color: Color.text }]}>
              {title}
            </Text>
          </View>
          {help && (
            <TouchableOpacity
              style={[
                styles.drawerButton,
                { position: 'relative', alignItems: 'flex-end' },
              ]}
              activeOpacity={0.7}
              onPress={() => Navigation.navigate('Help', { auth: false })}>
              <Icon
                name="help-circle-outline"
                size={30}
                color={transparent ? Color.black : '#fff'}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {dashboard && (
        <View style={styles.headerDashboard}>
          <View style={styles.headerContainer}>
            <View style={styles.headerCol}>
              <TouchableOpacity style={[styles.profileIcon, {
                borderWidth: 1, borderRadius: 25,
                overflow: "hidden", borderColor: Color.border
              }]} onPress={() => Navigation.navigate('Profilemain')}>
                <ImageBackground style={{ width: "100%", height: "100%" }}
                  source={About}>
                  <Image source={{ uri: Constants.IMAGE_URL + user.profile_photo }}
                    style={styles.profileIcon}></Image>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.headerRightRow}>
              <TouchableOpacity style={styles.notification}
                onPress={() => Navigation.navigate('Notification')}>
                <Image source={alarm} style={styles.notifImg} />
                {/* {(data[0]?.today && data[0]?.data.length) && <View style={[styles.badge, isRtl ? { left: 25 } : { right: 0 }]}>
                  <TextThin text={data[0]?.data.length} style={{ fontSize: Sizes.small, color: Color.theme }} />
                </View>} */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpSpacing}
                onPress={() => Navigation.navigate('Help', { auth: false })}>
                <Image source={Help} style={[styles.rightHeaderIcon, { tintColor: Color.white }]} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => dispatch(Actions.logOut())}>
                <Image source={Logout} style={styles.rightHeaderIcon}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
