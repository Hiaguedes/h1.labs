import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Text,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginCommunication from '../../api/Login';
let altura = 0;
Platform.OS === 'ios' ? (altura = 35) : (altura = 0);

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginCommunication(user, password);
      await AsyncStorage.setItem('appToken', token);
      setMensagemErro('');

      navigation.navigate('Feed');
    } catch (e) {
      setMensagemErro(e.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.erroMessage}>{mensagemErro}</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.button}>
          <Button title="Login" color="green" onPress={handleLogin} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexGrow: 2,
    height: height,
    width: width,
    marginTop: altura,
  },
  title: {
    fontSize: 20,
  },
  erroMessage: {
    color: 'red',
    marginTop: 5,
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

export default Login;
