import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../style/styles';

function Profile({ navigation,route}) {
    const { user, handleAuthentication } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'top', justifyContent: 'left' ,marginVertical:70,marginHorizontal:30}}>
        <View>  
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Button style={styles.ProfileButton} title="Logout" onPress={handleAuthentication} color="#e74c3c" />
            <View style={{ marginVertical: 10 }} />
            <Button title="MyProfile" onPress={() => navigation.navigate('Profile')} color="#e74c3c" /> 
            <View style={{ marginVertical: 10 }} />
            <Button onPress={() => navigation.goBack()} title="Go back home" color="#e74c3c"/>
        </View>
      </View>
    );
  }
  export default Profile;