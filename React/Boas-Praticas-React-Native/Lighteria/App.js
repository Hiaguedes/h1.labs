import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontLoader from './assets/fonts/fontLoader';

import ListaProdutos from './src/views/ListaProdutos';

const { width } = Dimensions.get('window');

export default App = ()  => {

    const isLoaded = FontLoader();

 return !isLoaded? <AppLoading /> : 
  (
    <>
    <StatusBar backgroundColor="#f1f1f1"/>
    <SafeAreaView style={styles.areaView}>
      <ListaProdutos />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    backgroundColor: '#f4f0f4',
  },
})