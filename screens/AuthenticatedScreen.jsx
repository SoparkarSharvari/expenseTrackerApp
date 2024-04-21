import React from 'react';
import { View } from 'react-native';
import { styles } from '../style/styles';
import { NavigationContainer } from '@react-navigation/native';
import TopNavBar from '../components/TopNavBar';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    return (
        <NavigationContainer>
            <View style={styles.container1}>
                <TopNavBar user={user} handleAuthentication={handleAuthentication}/>
            </View>
        </NavigationContainer>
    );
  };
  
  export default AuthenticatedScreen;
  