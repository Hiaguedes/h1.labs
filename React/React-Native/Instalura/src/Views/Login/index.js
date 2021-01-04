import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Platform,
  Text,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Feed = () => {
  let altura = 0;
  Platform.OS === 'ios' ? (altura = 35) : (altura = 0);
  return (
    <ScrollView style={{marginTop: altura}}>
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Usuário" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <View style={styles.button}>
          <Button title="Login" color="green" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexGrow: 2,
    height: 0.9 * height,
    width: width,
  },
  title: {
    fontSize: 20,
  },
  button: {
    backgroundColor: 'green',
    width: 0.6 * width,
    marginTop: 15,
  },
  input: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 2,
    marginBottom: 10,
    width: 0.6 * width,
  },
});

export default Feed;
