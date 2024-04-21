import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../style/styles';
import HomePage from '../components/HomePage';
import NavBar from '../components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function Profile({ navigation,route}) {
    const { user, handleAuthentication } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
               <Text style={styles.title}>Welcome</Text>
               <Text style={styles.emailText}>{user.email}</Text>
               <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
           <Button title="MyProfile" onPress={() => navigation.navigate('Profile')} color="#e74c3c" /> 
     </View>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  const Drawer = createDrawerNavigator();
  const TopNavBar = ({ user, handleAuthentication }) => {
      return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={NavBar} />
        <Drawer.Screen name="Profile" component={Profile}
            initialParams={{ user: user, handleAuthentication: handleAuthentication }}
            options={{ headerShown: false }}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
      );
    };
    
    export default TopNavBar;
    