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

import * as Navigation from '../navigation/navigation';
import Color from '../utility/Color';

const Header = (props) => {
  const { title, back, dashboard } = props;
  const dispatch = useDispatch();
  console.log('back', back);
  return (
    <View style={{ width: '100%' }}>
      <SafeAreaView style={styles.safeArea}></SafeAreaView>
      {!dashboard && (
        <View style={styles.header}>
          {back && (
            <TouchableOpacity
              style={styles.drawerButton}
              activeOpacity={0.7}
              onPress={() => Navigation.goBack()}>
              <Image source={Back} style={styles.sideIcon}></Image>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
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
              <View style={styles.helpSpacing}>
                <Image source={Help} style={styles.rightHeaderIcon}></Image>
              </View>

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
