import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
const Likes = ({likes}) => {
  const [press, setPressed] = useState(false);
  const handlePress = () => {
    setPressed(!press);
  };
  return (
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
      <Text style={styles.likeCount}>{press ? Number(likes) + 1 : likes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Likes;
