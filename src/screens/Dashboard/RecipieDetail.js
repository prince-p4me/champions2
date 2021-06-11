import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import SliderImg from '../../components/SliderImg';
import * as Actions from '../../redux/action';
import * as Navigation from '../../navigation/navigation';
import I18n from '../../services/i18n';
import RecipeLayout from '../../components/RecipeLayout';
import receipiImg from '../../assets/imgs/receipi.jpeg';
import Constant from '../../utility/Constant';
import Color from '../../utility/Color';
import {
  TextMedium,
  TextLite,
  TextRegular,
  TextBold,
  TextSemiBold,
} from '../../components/TextView';
import Sizes from '../../utility/Sizes';
import FullButton from '../../components/FullButton';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { showToast } from '../../utility/Index';
import HTML from 'react-native-render-html';

const SendFeedback = ({ id, navigation }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const user = useSelector(state => state.getUser);
  const [star, setStar] = useState(1);
  const [isFocus, setFocus] = useState(false);
  console.log('user', user);

  const sentQuery = () => {
    if (!query) {
      showToast('Please describe your query . . .');
      return;
    }
    let obj = {
      user_id: user.id,
      recipe_id: id,
      star_rate: star,
      review: query,
    };
    dispatch(Actions.sendRecipeReview(obj));
  };

  return (
    <View
      style={[{ flex: 1 }, isFocus ? { marginBottom: 260 } : { marginBottom: 40 }]}>
      <View style={{ flex: 1, padding: 16, paddingTop: 25 }}>
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
          onChangeText={query => setQuery(query)}
          numberOfLines={10}
          maxLength={500}
          multiline={true}
          returnKeyType="done"
          onSubmitEditing={sentQuery}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}></TextInput>
        <View
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TextLite text={query.length + '/' + (500 - query.length)} />
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

const RecipieDetail = ({ route, navigation }) => {
  const { id } = route.params;

  const receipeDetail = useSelector(state => state.getReceipeDetail);

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const user = useSelector(state => state.getUser);
  console.log('user', user);
  const content =
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

  const sentQuery = () => {
    if (!query) {
      showToast('Please describe your query . . .');
      return;
    }
    let obj = {
      mobile: user.mobile,
      query,
    };
    dispatch(Actions.help(obj));
  };

  useEffect(() => {
    let receipeInfo = {
      recipe_id: id,
    };
    console.log({ receipeInfo: receipeInfo });
    if (receipeInfo?.recipe_id) {
      dispatch(Actions.getReceipeDetail(receipeInfo));
    }
  }, []);

  return (
    <View style={styles.containerDashboard}>
      <ImageBackground
        style={{ width: '100%', height: Constant.height / 2.7 }}
        source={{ uri: Constant.IMAGE_URL + receipeDetail.image }}
      />
      <View style={styles.container}>
        <Header
          title={receipeDetail.title}
          dashboard={false}
          back={true}
          help={true}
          bgColor="rgba(128,128,128,.8)"
        />
        <ScrollView
          style={styles.roundSection}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <TextSemiBold
              text={receipeDetail.title}
              style={{ fontSize: Sizes.medium }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <HTML
              source={{ html: receipeDetail?.description }}
              contentWidth={Constant.width}
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: '17%',
              marginVertical: 30,
            }}>
            <FullButton
              bgColor={Color.theme}
              text="See more Receipes"
              textColor={Color.white}
              onPress={() => Navigation.navigate("RecipieAll")}
            />
          </View>
          {<SendFeedback item={id} />}
        </ScrollView>
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
  heading: {
    marginBottom: 20,
    width: '90%',
    height: 50,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.parrot,
  },
  roundSection: {
    flex: 1,
    backgroundColor: Color.white,
    marginTop: Constant.height / 3 - 100,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  containerDashboard: { flex: 1, backgroundColor: Color.white },
  container: {
    height: Constant.height,
    width: Constant.width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
export default RecipieDetail;
