import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const Photo = ({photoPost, description, likes}) => {
  const [press, setPressed] = useState(false);
  const handlePress = () => {
    setPressed(!press);
  };
  return (
    <>
      <Image style={styles.img} source={{uri: photoPost}} />
      <Text>{description}</Text>
      <View style={styles.viewLikes}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={styles.like}
            source={
              press
                ? require('../../../res/img/s2-checked.png')
                : require('../../../res/img/s2.png')
            }
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>
          {press ? Number(likes) + 1 : likes}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 0.8 * largura,
    height: 0.5 * altura,
  },
  like: {
    width: 30,
    height: 30,
    margin: 5,
  },
  viewLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 18,
  },
});

export default Photo;
