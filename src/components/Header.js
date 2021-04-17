import React from 'react';
import {
  TouchableOpacity,
  StatusBar,
  View,
  SafeAreaView,
  Text,
  Image,
  BackHandler
} from 'react-native';
import styles from '../utility/Style';
import Constants from '../utility/Constant';
import SideIcon from '../assets/imgs/arrow.png';
import About from '../assets/imgs/user.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../redux/action';

import Logout from '../assets/imgs/home-logout.png';
import Back from '../assets/imgs/arrow.png';
import Edit from '../assets/imgs/edit.png';
import Help from '../assets/imgs/help.png';
// import Icon from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';

import * as Navigation from '../navigation/navigation';
import Color from '../utility/Color';

const Header = (props) => {
  const { title, back, dashboard, help } = props;
  const isRtl = useSelector((state) => state.isRtl);

  const dispatch = useDispatch();
  console.log('back', back);
  return (
    <View style={{ width: '100%' }}>
      <SafeAreaView style={styles.safeArea}></SafeAreaView>
      {!dashboard && (
        <View style={styles.header}>
          {back && (
            <TouchableOpacity
              style={[styles.drawerButton, { position: "relative", alignItems: "flex-start" }]}
              activeOpacity={0.7}
              onPress={() => Navigation.goBack()}>
              {
                isRtl ?
                  <Icon1 name="arrow-right-alt" size={30} color="#fff" /> :
                  <Image source={Back} style={styles.sideIcon}></Image>
              }
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {help && <TouchableOpacity
            style={[styles.drawerButton, { position: "relative", alignItems: "flex-end" }]}
            activeOpacity={0.7}
            onPress={() => Navigation.navigate("Help")}>
            <Icon name="help-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>}
        </View>
      )}
      {dashboard && (
        <View style={styles.headerDashboard}>
          <View style={styles.headerContainer}>
            <View style={styles.headerCol}>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('Profilemain');
                }}>
                <Image source={About} style={styles.profileIcon}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.headerRightRow}>
              {/* <Image source={Edit} style={styles.rightHeaderIcon}></Image> */}
              <TouchableOpacity style={styles.helpSpacing}
                onPress={() => Navigation.navigate("Help")}>
                <Image source={Help} style={styles.rightHeaderIcon}></Image>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                dispatch(Actions.logOut());
              }}>
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
