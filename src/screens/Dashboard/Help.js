import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import {TextRegular, TextBold, TextLite} from '../../components/TextView';
import I18n from '../../services/i18n';
import Images from '../../utility/Image';
import Header from '../../components/Header';
import * as Navigation from '../../navigation/navigation';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../redux/action';
import Sizes from '../../utility/Sizes';
import {showToast} from '../../utility/Index';

const Help = props => {
  const dispatch = useDispatch();
  const {auth: isAuth} = props.route.params;
  const [query, setQuery] = useState('');
  const [mobile, setMobile] = useState('');
  const user = useSelector(state => state.getUser);
  console.log('isAuth', isAuth);

  const sentQuery = () => {
    if (isAuth && (!mobile || mobile.length != 10)) {
      showToast(I18n.t('enter_mobile') + ' . . .');
      return;
    }
    if (!query) {
      showToast('Please describe your query . . .');
      return;
    }
    // let obj = {
    //   mobile: isAuth ? mobile : user.mobile,
    //   query,
    // };
    // dispatch(Actions.help(obj));

    let obj = {
      user_id: user.id,
      message: query,
    };
    dispatch(Actions.help(obj));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightGreen}}>
      <Header title={I18n.t('help')} dashboard={false} back={true} />
      <View style={{flex: 1, padding: 16, paddingTop: 25}}>
        {isAuth && (
          <View style={{width: '100%'}}>
            <TextBold
              text={I18n.t('mobile')}
              style={{
                fontSize: Sizes.medium,
                alignSelf: 'flex-start',
              }}></TextBold>
            <TextInput
              style={[
                styles.input,
                {height: 40, width: '100%', marginBottom: 20},
              ]}
              value={mobile}
              maxLength={10}
              placeholder={I18n.t('enter_mobile')}
              onChangeText={mobile => setMobile(mobile)}
              returnKeyType="next"
              onSubmitEditing={setMobile}></TextInput>
          </View>
        )}
        <TextBold
          text={I18n.t('yourquery')}
          style={{fontSize: Sizes.medium, alignSelf: 'flex-start'}}></TextBold>
        <TextInput
          style={styles.input}
          placeholder={I18n.t('describequery')}
          value={query}
          onChangeText={query => setQuery(query)}
          numberOfLines={10}
          maxLength={500}
          multiline={true}
          returnKeyType="done"
          onSubmitEditing={sentQuery}></TextInput>
        <View
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TextLite text={query.length + '/' + (500 - query.length)} />
        </View>
        <TouchableOpacity style={styles.send} onPress={sentQuery}>
          <TextRegular
            text={I18n.t('requestcall')}
            style={{color: Colors.text}}></TextRegular>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 150,
    width: '100%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.theme,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    color: Colors.text,
    justifyContent: 'flex-start',
  },
  send: {
    backgroundColor: Colors.white,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.text,
    alignSelf: 'center',
  },
});

export default Help;
