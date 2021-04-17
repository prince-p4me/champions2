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


const Privacy = () => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightGreen }}>
            <Header title={I18n.t("Privacy")} dashboard={false} back={true} />
            <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
                <Text style={[styles.normalText]}>
                    As a general rule, this website does not collect Personal information about you when you visit the site.
                    You can generally visit the site without revealing Personal information unless you choose to provide such information.
                    </Text>
                <Text style={styles.normalText}>
                    Any personal information collected shall be used only for the started purpose and shall NOT be shared with any other department/organization (public/private) This site may contain links to non-governmental sites whose data protection and privacy practices may differ from ours.
                    </Text>
                <Text style={styles.normalText}>
                    We are not responsible for the content and privacy practices of these other websites and encourage you to consult the privacy notices of those sites.
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

export default Privacy;