/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Olá</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  text: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
