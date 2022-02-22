import React from 'react';
import {Platform} from 'react-native';
import {Feed, Login} from './src/Views';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerStyle: {backgroundColor: '#fefefe'}}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={
            Platform.OS === 'android'
              ? {headerShown: false}
              : {title: 'Bem Vindo ao Instalura'}
          }
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={Platform.OS === 'android' && {headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
