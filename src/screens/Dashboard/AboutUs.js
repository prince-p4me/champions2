import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Text,
    ScrollView,
    // Modal
} from 'react-native';
import Colors from '../../utility/Color';
import { TextRegular, TextBold, TextLite } from '../../components/TextView';
import I18n from '../../services/i18n';
import Header from '../../components/Header';
import Sizes from '../../utility/Sizes';
import Font from '../../utility/Font';


const AboutUs = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
            <Header title={I18n.t("about")} dashboard={false} back={true} />
            <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
                <Text style={styles.normalText}>Doing shopping with
                    <Text style={styles.boldInlineText}> Grm FoodKraft Pvt Ltd, </Text>
                    You'll get a QR code some reward points are saved in your application wallet.
                </Text>
                <Text style={styles.normalText}>The reward points program is one of the interesting features offered by
                    <Text style={styles.boldInlineText}> Grm FoodKraft Pvt Ltd. </Text>
                    The program allows
                    <Text style={styles.boldInlineText}> 10x Champion </Text>
                    distributors to earn while they spend, making it a cutomer-centric feature.
                    competing to offer more and more redemption benefits, the feature has become truly rewarding for customers.
                </Text>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    normalText: {
        fontSize: Sizes.regular,
        fontFamily: Font.light,
        marginTop: 15
    },
    boldInlineText: {
        fontSize: Sizes.medium,
        fontFamily: Font.semiBold,
        marginStart: 5
    },
    header: {
        fontSize: Sizes.semiLarge,
        fontFamily: Font.bold
    }
});

export default AboutUs;