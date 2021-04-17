import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import { TextRegular, TextBold, TextSemiBold } from '../../components/TextView';
import I18n from '../../services/i18n';
import Images from '../../utility/Image';
import Header from '../../components/Header';
import * as Navigation from '../../navigation/navigation';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../redux/action';
import ChangeLanguage from '../Auth/ChangeLanguage';
import Language from '../../assets/language/language.json';
import LanguageModal from '../../components/LanguageModal';
import RNRestart from 'react-native-restart';

const Profilemain = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.getUser);
    let [modalVisible, setModalVisible] = useState(false);
    let [languageList, updateLanguageList] = useState(Language);
    let [AllLanguage] = useState(Language);
    let language = useSelector(state => state.getLanguage);
    const forceUpdate = React.useReducer(bool => !bool)[1];

    console.log('user', user);

    useEffect(() => {
        setTimeout(() => {
            I18n.locale = language;
            forceUpdate();
        }, 10);
    }, [language]);

    const renderHelpSection = () => {
        return (
            <>
                <TextSemiBold text={I18n.t("help")} style={{ margin: 10, alignSelf: "flex-start" }} />
                <TouchableOpacity style={styles.closeImage}
                    onPress={() => Navigation.navigate("ContactUs")}>
                    <Image source={Images.contactus}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular style={styles.textstyle}
                        text={I18n.t('Contactus')}
                    />
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.closeImage}
                    onPress={() => Navigation.navigate("SendQuery")}>
                    <Image source={Images.about}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular style={styles.textstyle}
                        text={I18n.t('sendquery')}
                    />
                </TouchableOpacity>

                <View style={styles.line} />
                <TouchableOpacity style={styles.closeImage} onPress={() => {
                    Navigation.navigate("AboutUs")
                }}>
                    <Image
                        source={Images.about}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('about')}
                    />
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.closeImage}
                    onPress={() => Navigation.navigate("Terms")}>
                    <Image source={Images.termcondition}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular style={styles.textstyle}
                        text={I18n.t('termcondition')}
                    />
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.closeImage}
                    onPress={() => Navigation.navigate("Privacy")}>
                    <Image
                        source={Images.privacypolicy}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('Privacy')}
                    />
                </TouchableOpacity>
            </>
        )
    }

    const upperSection = () => {
        return (
            <>
                <TouchableOpacity
                    style={[
                        styles.closeImage,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        },
                    ]}
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <Image
                        source={Images.language}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('chooselanguage')}
                    />
                </TouchableOpacity>
                <View style={styles.closeImage}>
                    <Image source={Images.address}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('address')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.language}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('language')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image source={Images.aadhar}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('Aadhar')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.feedback}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('Sendfeedback')}
                    />
                </View>
                <View style={styles.line} />
            </>
        )
    }

    const renderModal = () => {
        return (
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
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderModal()}
            <Header title={'Profile'} dashboard={false} back={true} help={true} />
            <ScrollView>
                <View style={{ flexDirection: 'row', backgroundColor: "white", marginTop: 10, paddingBottom: 10 }}>

                    <View style={{ height: 100, width: 100, padding: 10, }} >
                        <Image source={Images.user}
                            style={{ width: "100%", height: "100%", borderRadius: 100 }}
                            resizeMode="cover"></Image>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                        <TextRegular
                            style={[styles.textstyle, { marginTop: 15 }]}
                            text={user.name}
                        />
                        {user.email ? <TextRegular
                            style={[styles.textstyle, { marginTop: 7 }]}
                            text={user.email}
                        /> : null}
                        <TextRegular
                            style={[styles.textstyle, { marginTop: 7 }]}
                            text={user.mobile}
                        />
                    </View>

                    <TouchableOpacity style={{
                        width: 80,
                        justifyContent: "center"
                    }} onPress={() => {
                        Navigation.navigate('Editprofile');
                    }}>
                        <Image source={Images.edit}
                            style={{ height: 30, width: 30, alignSelf: 'center', marginEnd: 15 }}
                            resizeMode="contain"></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
                {/* {upperSection()} */}
                {renderHelpSection()}
                <TouchableOpacity
                    style={[styles.closeImage, { backgroundColor: "transparent" }]}
                    onPress={() => {
                        dispatch(Actions.logOut());
                    }}>
                    <View style={{ width: 40, }}>
                        <Image
                            source={Images.logout}
                            style={{ height: 18, width: 18 }}
                            resizeMode="contain"></Image>
                    </View>
                    <TextSemiBold text={I18n.t('logout')} style={{ marginStart: 5, }} />

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
