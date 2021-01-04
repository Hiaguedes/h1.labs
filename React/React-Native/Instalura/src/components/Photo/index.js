import React from 'react';
import {Image, StyleSheet, Dimensions, Text} from 'react-native';

import Likes from '../Likes';

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const Photo = ({photoPost, description, likes}) => {
  return (
    <>
      <Image style={styles.img} source={{uri: photoPost}} />
      <Text style={styles.text}>{description}</Text>
      <Likes likes={likes} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: largura,
    height: 0.5 * altura,
  },
  text: {
    marginLeft: 5,
  },
});

export default Photo;
