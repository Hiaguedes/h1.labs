import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const informacoes = [
  {
    usuario: 'Hiago',
  },
  {
    usuario: 'Maria',
  },
];

const App = () => {
  return (
    <ScrollView>
      <StatusBar />
      <View style={styles.view}>
        <FlatList
          data={informacoes}
          renderItem={({item}) => (
            <>
              <Text style={styles.text}>{item.usuario}</Text>
              <Image
                source={require('./res/img/alura.jpg')}
                style={styles.img}
              />
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  text: {
    color: 'red',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
  img: {
    width: 0.5 * largura,
    height: 0.5 * altura,
  },
});

export default App;
