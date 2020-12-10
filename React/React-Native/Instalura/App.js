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
import Header from './src/components/Header'

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const informacoes = [
  {
    id: 1,
    usuario: 'Hiago',
  },
  {
    id: 2,
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
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => (
            <>
              <Header userName={item.usuario}/>
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
  img: {
    width: 0.8 * largura,
    height: 0.5 * altura,
  },
});

export default App;
