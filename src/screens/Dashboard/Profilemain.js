import React from 'react';
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
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/action';
import ChangeLanguage from '../Auth/ChangeLanguage';


const Profilemain = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.getUser)
    console.log("user", user);

    return (
        <ScrollView>

            <View  >

                <Header title={'Profile'} dashboard={false} back={true} help={true} />

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
                <TouchableOpacity style={[styles.closeImage, { flexDirection: "row", alignItems: "center", justifyContent: "space-around" }]}>

                    <Image
                        source={Images.language}

                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('chooselanguage')}

                    />
                    <ChangeLanguage />


                </TouchableOpacity>
                <View style={styles.closeImage}>
                    <Image
                        source={Images.address}
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
                <TextSemiBold text="Help" style={{ margin: 10 }} />
                <View style={styles.closeImage}>
                    <Image source={Images.contactus}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('Contactus')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.about}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('sendquery')}
                    />
                </View>

                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.about}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('about')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.termcondition}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('termcondition')}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.closeImage}>
                    <Image
                        source={Images.privacypolicy}
                        style={styles.image}
                        resizeMode="contain"></Image>
                    <TextRegular
                        style={styles.textstyle}
                        text={I18n.t('Privacy')}
                    />
                </View>
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
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    closeImage: {
        backgroundColor: "#fff",
        padding: 20,
        flexDirection: 'row',
        alignItems: "center",
    },
    line: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10
    },
    textstyle: {
        marginStart: 20
    },
    image: {
        height: 25,
        width: 25
    }
});

export default Profilemain;