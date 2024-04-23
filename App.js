import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { styles } from './style/styles';
import LoginPage from './components/LoginPage'; // Import the LoginPage component

export default function App() {
  return (
    <View style={styles.container1}>
       <LoginPage /> 
    </View>
  );
}