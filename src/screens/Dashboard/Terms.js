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


const Terms = () => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
            <Header title={I18n.t("termcondition")} dashboard={false} back={true} />
            <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
                <Text style={[styles.normalText, { fontStyle: "italic" }]}>
                    Please read these Terms & Conditions carefully before using the 10x chapmion basmati rice mobile application operated by GRM Foodkraft Pvt. Ltd.
                </Text>
                <Text style={styles.normalText}>
                    Your access to and use of the service is conditioned on your acceptanc of and compliance with these terms.
                    These apply to all visitors, users, and others who access or use the service.
                    </Text>
                <Text style={styles.normalText}>
                    By accessing or using the service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.
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
        fontFamily: Font.bold,
        marginTop: 25
    }
});

export default Terms;