import React, { useState } from 'react';
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
import { TextRegular, TextBold, TextLite } from '../../components/TextView';
import I18n from '../../services/i18n';
import Images from '../../utility/Image';
import Header from '../../components/Header';
import * as Navigation from '../../navigation/navigation';
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/action';
import Sizes from '../../utility/Sizes';


const Help = (props) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const user = useSelector(state => state.getUser)
    console.log("user", user);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
            <Header title={I18n.t("help")} dashboard={false} back={true} />
            <View style={{ flex: 1, padding: 16, paddingTop: 25 }}>
                <TextBold text={I18n.t("yourquery")} style={{ fontSize: Sizes.medium, alignSelf: "flex-start" }}></TextBold>
                <TextInput style={styles.input}
                    placeholder={I18n.t("describequery")}
                    value={query}
                    onChangeText={query => setQuery(query)}
                    numberOfLines={10}
                    maxLength={500}
                    multiline={true}></TextInput>
                <View style={{ width: "100%", height: 40, justifyContent: "center", alignItems: "flex-end" }}>
                    <TextLite text={(query.length) + "/" + (500 - query.length)} />
                </View>
                <TouchableOpacity style={{
                    backgroundColor: Colors.white,
                    paddingVertical: 13, paddingHorizontal: 20,
                    borderWidth: 1, borderRadius: 8,
                    borderColor: Colors.text,
                    alignSelf: "center"
                }}>
                    <TextRegular text={I18n.t("requestcall")} style={{ color: Colors.text }}></TextRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 150, width: "100%",
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.green,
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
        color: Colors.text,
        justifyContent: "flex-start"
    }
});

export default Help;