import React from 'react';
import {Text, StyleSheet, Image, Dimensions, View} from 'react-native';
const altura = Dimensions.get('screen').height;
const largura = Dimensions.get('screen').width;

const Header = ({userName}) => {
  return (
    <View style={styles.view}>
      <Image
        style={styles.imgProfile}
        source={require('../../../res/img/alura.jpg')}
      />
      <Text style={styles.nomeUsuario}>{userName}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  nomeUsuario: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  imgProfile: {
    width: 0.1 * largura,
    height: 0.1 * largura,
    borderRadius: 0.5 * 0.1 * largura,
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Header;
