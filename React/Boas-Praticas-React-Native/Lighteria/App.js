import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,  Image, StyleSheet, Dimensions } from 'react-native';
import Home from './src/pages/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontLoader from './assets/fonts/fontLoader';

const { width } = Dimensions.get('window');

export default function App() {
  useEffect(async() => {
    await FontLoader();
});
  return (
    <>
    <StatusBar backgroundColor="#f1f1f1"/>
    <SafeAreaView style={styles.areaView}>
      <View style={styles.containerTitulo}>
        <Text style={{fontSize: 40, fontWeight: '800', fontFamily: 'openSansBold'}}>Lighteria</Text>
        <View style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30.,backgroundColor: 'white'}}>
          <Image source={require('./assets/img/cadeado.png')} style={styles.logo}/>
        </View>
      </View>
      <Home />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
  },
  areaView: {
    flex: 1,
    backgroundColor: '#f4f0f4'
  },
  containerTitulo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  }
})