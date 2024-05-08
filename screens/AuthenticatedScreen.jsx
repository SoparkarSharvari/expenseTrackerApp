import React from 'react';
import { View } from 'react-native';
import { styles } from '../style/styles';
import { NavigationContainer } from '@react-navigation/native';
import TopNavBar from '../components/TopNavBar';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    return (
            <View style={styles.container1}>
                <TopNavBar user={user} handleAuthentication={handleAuthentication}/>
            </View>
  
    );
  };
  
  export default AuthenticatedScreen;
  