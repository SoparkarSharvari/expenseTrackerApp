import React from 'react';
import { View, Text, Button } from 'react-native';
import NavBar from '../components/NavBar';
import DetailedView from './DetailedView';
import Profile from './Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';

  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        <Drawer.Screen name="DetailedView" component={Profile}
            initialParams={{ user: user, handleAuthentication: handleAuthentication }}
            options={{ headerShown: false }}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
      );
    };
    
    export default TopNavBar;
    