import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import UpdateIncome from './components/UpdateIncome'; // Import the UpdateIncome component
import UpdateExpense from './components/UpdateExpense';
import { KeyboardAvoidingView, Platform } from 'react-native';
import FirstPage from './components/FirstPage';
const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage" headerMode="none">
        <Stack.Screen name='FirstPage' component={FirstPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="UpdateIncome" component={UpdateIncome} />
        <Stack.Screen name="UpdateExpense" component={UpdateExpense} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
