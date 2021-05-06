import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, FlatList} from 'react-native';
import Header from '../../components/Header';
import {
  TextBold,
  TextRegular,
  TextSemiBold,
  TextThin,
} from '../../components/TextView';
import styles from '../../utility/Style';
import Imagess from '../../utility/Image';
import {useSelector, useDispatch} from 'react-redux';
import SliderImg from '../../components/SliderImg';
import i18n from '../../services/i18n';
import Sizes from '../../utility/Sizes';

import PointsContainer from '../../components/PointsContainer';
import RewardPointlayout from '../../components/RewardPointlayout';
import PointsWonLayout from '../../components/PointsWonLayout';
import QRCodeContainer from '../../components/QRCodeContainer';
import Winnerlayout from '../../components/Winnerlayout';
import RewardLayout from '../../components/RewardLayout';
import FeedbackLayout from '../../components/FeedbackLayout';
import OfferLayout from '../../components/OfferLayout';
import RecipeLayout from '../../components/RecipeLayout';
import * as Actions from '../../redux/action';

import SuccessModal from './SuccessModal';
import {connect} from 'react-redux';
import OtpScreen from '../Auth/Otp';
import LandingScreen from '../Auth/Landing';
import Profilemain from './Profilemain';
// import { NavigationEvents } from 'react-navigation';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Navigation from '../../navigation/navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// class MyReward extends React.Component {
const MyReward = ({route, navigation, props}) => {
  const {data} = route.params;
  // render() {
  const [transactionType, setTransactionType] = useState('QR Scan');
  const transactionList = useSelector(state => state.getTransactionByCategory);
  const user = useSelector(state => state.getUser);
  const dispatch = useDispatch();

  function getTransaction(type) {
    let obj = {
      user_id: user.id,
      type: type,
    };
    dispatch(Actions.getTransactionCategory(obj));
  }
  useEffect(() => {
    let obj = {
      user_id: user.id,
      type: transactionType,
    };
    dispatch(Actions.getTransactionCategory(obj));
  }, []);
  console.log({ListTransaction: transactionList});
  return (
    <View style={[styles.containerDashboard, {backgroundColor: '#F1FFF2'}]}>
      <Header title={'My Reward'} dashboard={false} back={true} />
      <RewardPointlayout />

      <QRCodeContainer />
      <ScrollView>
        <View style={{backgroundColor: '#fff', flex: 1, margin: 10}}>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              height: 60,
              alignItems: 'center',
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setTransactionType('QR Scan');
                  getTransaction('QR Scan');
                }}>
                <TextRegular
                  text={i18n.t('EarnedWon')}
                  style={{textAlign: 'center'}}
                />

                {transactionType == 'QR Scan' && (
                  <View
                    style={{
                      height: 3,
                      backgroundColor: '#135338',
                      width: 100,
                      marginTop: 10,
                    }}></View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setTransactionType('Redeemed');
                  getTransaction('Redeemed');
                }}>
                <TextRegular
                  text={i18n.t('redeem')}
                  style={{textAlign: 'center'}}
                />
                {transactionType == 'Redeemed' && (
                  <View
                    style={{
                      height: 3,
                      backgroundColor: '#135338',
                      width: 100,
                      marginTop: 10,
                    }}></View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 0.3,
              backgroundColor: '#6AB8B8B8',
              width: '100%',
              opacity: 50,
            }}></View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {/* <PointsWonLayout />
            <PointsWonLayout /> */}

            <PointsWonLayout />
            {/* <PointsWonLayout /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(MyReward);
export default MyReward;
