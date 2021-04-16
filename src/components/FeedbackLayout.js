import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image,Text } from 'react-native';
import { TextBold,TextMedium, TextRegular, TextThin } from './TextView';
 import Color from'../utility/Color'

import star from '../assets/imgs/star.png';
import Images from'../utility/Image'
 import earned from '../assets/imgs/earned.png';
import Redeem from '../assets/imgs/Redeem.png';
import Balance from '../assets/imgs/Balance.png';
import Sizes from "../utility/Sizes"
import styles from '../utility/Style';
import FullButton from './FullButton';
import About from '../assets/imgs/user.jpeg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import I18n from '../services/i18n';
import StarRating from 'react-native-star-rating';

import { TouchableOpacity } from 'react-native-gesture-handler';

const FeedbackLayout = () => {
  const isRtl = useSelector((state) => state.isRtl);
  const align = isRtl ? "right" : "left";
  const data = useSelector((state) => state.getPoints);
   
  return (

     
    <View  >
        <View style={styles.offercontainer}>
          <Image source={Images.user} style={{height:80,width:80,marginLeft:15,borderRadius:100}}
          resizeMode="cover"></Image>
          <View style={{marginLeft:30}}>
              
          <TextMedium
            text="Vijay Gupta"
            style={{ textAlign: align,fontSize: Sizes.semiLarge,color:"#000",}}
          />

<TextRegular
            text="Very Tasty Briyani Very "
            style={{ textAlign: align, fontSize: Sizes.regular ,marginTop:5}}
          />
           
          
          <View style={{marginTop:10}}>
            
         <StarRating
        disabled={false}
        
        maxStars={5}
        //rating={this.state.starCount}
        rating={3}
        starSize={20}
        fullStarColor='golden'
      //  selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
      
      </View>
          
           </View>
        </View>
           
    </View>
  );
};

export default FeedbackLayout;
