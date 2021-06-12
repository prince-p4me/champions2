import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import { TextRegular, TextBold, TextLite } from '../../components/TextView';
import I18n from '../../services/i18n';
import Images from '../../utility/Image';
import Header from '../../components/Header';
import * as Navigation from '../../navigation/navigation';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';
import Sizes from '../../utility/Sizes';
import { showToast } from '../../utility/Index';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FullButton from '../../components/FullButton';

const SendFeedback = props => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const user = useSelector(state => state.getUser);
  const [star, setStar] = useState(1);
  console.log('user', user);

  const sentQuery = () => {
    if (!query || !query.trim().length) {
      showToast('Please describe your query . . .');
      return;
    }
    let obj = {
      mobile: user.mobile,
      query,
    };
    dispatch(Actions.help(obj));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
      <Header
        title={I18n.t('Sendfeedback')}
        dashboard={false}
        back={true}
        help={true}
      />
      <View style={{ flex: 1, padding: 16, paddingTop: 25 }}>
        <TextBold
          text={I18n.t('hi') + ' ' + user.name}
          style={{ fontSize: Sizes.medium, alignSelf: 'flex-start' }}
        />
        <TextRegular
          text={I18n.t('feedbacklongtext')}
          style={{ fontSize: Sizes.medium, alignSelf: 'flex-start' }}
        />
        <TextBold
          text={I18n.t('rate')}
          style={{
            fontSize: Sizes.medium,
            alignSelf: 'flex-start',
            marginTop: 20,
          }}></TextBold>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          {[1, 2, 3, 4, 5].map((value, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginStart: index != 0 ? 10 : 0 }}
              onPress={() => setStar(value)}
              activeOpacity={0.9}>
              <Icon
                name={star >= value ? 'star' : 'star-o'}
                size={30}
                color={star >= value ? Colors.orange : Colors.text}></Icon>
            </TouchableOpacity>
          ))}
        </View>
        <TextBold
          text={I18n.t('Yourfeedback')}
          style={{
            fontSize: Sizes.medium,
            alignSelf: 'flex-start',
            marginTop: 20,
          }}></TextBold>
        <TextInput
          style={styles.input}
          placeholder={I18n.t('describequery')}
          value={query}
          onChangeText={query => setQuery(query?.trimStart())}
          numberOfLines={10}
          maxLength={500}
          multiline={true}
          returnKeyType="done"
          onSubmitEditing={sentQuery}

        ></TextInput>
        <View
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TextLite text={query.length + '/' + (1000 - query.length)} />
        </View>
        <FullButton
          bgColor={Colors.theme}
          text={I18n.t('sendnow')}
          textColor={Colors.white}
          onPress={sentQuery}
          btnStyle={{ width: '80%', marginHorizontal: '10%', marginTop: 30 }}
        />
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
    borderColor: Colors.green,
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

export default SendFeedback;
