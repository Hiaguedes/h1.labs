import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

import Likes from '../Likes';

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const Photo = ({photoPost, description, likes}) => {

  return (
    <>
      <Image style={styles.img} source={{uri: photoPost}} />
      <Text>{description}</Text>
      <Likes likes={likes} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 0.8 * largura,
    height: 0.5 * altura,
  }
});

export default Photo;
