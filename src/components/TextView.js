import PropTypes from "prop-types";
import React from 'react';
import { Text, View } from 'react-native';
import Color from "../utility/Color";
import Fonts from '../utility/Font'

const TextBold = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontFamily: Fonts.bold },
                props.style]}>{props.text}</Text>
    );
}

const TextSemiBold = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontFamily: Fonts.semiBold },
                props.style]}>{props.text}</Text>
    );
}
const TextMedium = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontFamily: Fonts.medium },
                props.style]}>{props.text}</Text>
    );
}
const TextRegular = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontFamily: Fonts.regular },
                props.style]}>{props.text}</Text>
    );
}

const TextLite = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontFamily: Fonts.regular, fontWeight: '400' },
                props.style]}>{props.text}</Text>
    );
}

const TextThin = props => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { color: Color.black },
                { fontWeight: '100', fontFamily: Fonts.regular },
                props.style]}>{props.text}</Text>
    );
}


const propsType = {
    style: Text.propTypes.style,
    text: PropTypes.any,
    numberOfLines: PropTypes.number,
    ellipsizeMode: PropTypes.string,
    marquee: PropTypes.bool
};

TextThin.propTypes = propsType;
TextLite.propTypes = propsType;
TextBold.propTypes = propsType;
TextRegular.propTypes = propsType;
TextSemiBold.propTypes = propsType;
TextMedium.propTypes = propsType;


export { TextThin, TextLite, TextBold, TextRegular, TextSemiBold, TextMedium };
