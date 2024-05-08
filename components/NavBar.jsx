
import Income from './Income';
import Expense from './Expense';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from expo/vector-icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator  keyboardHidesTabBar={true}>
      <Tab.Screen 
        name="Dashboard" component={Dashboard} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
        ),
    }}/>
      <Tab.Screen name="INCOME" component={Income} options={{
        tabBarLabel: 'Add Income',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-plus" size={30} color="black" />
        ),
    }}
      />
      <Tab.Screen name="EXPENSE" component={Expense} options={{
        tabBarLabel: 'Add Expense',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-remove" size={30} color="black" />
        ),
    }}/>
      <Tab.Screen name="MyBot" component={Chatbot} options={{
        tabBarLabel: 'MyBot',
        tabBarIcon: ({ color, size }) => (
            <AntDesign name="aliwangwang" size={24} color="black" />
        ),
    }}/>
    </Tab.Navigator>
  );
}

export default NavBar;
