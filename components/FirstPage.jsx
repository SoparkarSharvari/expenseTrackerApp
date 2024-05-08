import React, { useState, useEffect } from 'react';
import { Text, View , ImageBackground } from 'react-native';
import LoginPage from './LoginPage';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
const FirstPage = () => {
    const navigation = useNavigation();
    return (
        <>
         <ImageBackground
            source={require('/Users/sharvarisoparkar/Desktop/ExpenseTracker/expenseTrackerApp/assets/image33.jpg')} // Provide the path to your image
            style={{ flex: 1, justifyContent: 'center' }} // Adjust styles as needed
        >
            <View style={{ marginTop: 40,height:'100%'}}>
                <Text style={{marginTop:65,fontStyle:'italic',fontWeight: 'bold',fontSize:30,paddingLeft:20}}>Expense Ease </Text> 
                <Text style={{marginTop:35,fontSize:80,paddingLeft:20,fontWeight: 'bold'}}>Track,</Text>
                <Text style={{fontSize:80,paddingLeft:20,fontWeight: 'bold'}}>Save,</Text>
                <Text style={{fontSize:80,paddingLeft:20,fontWeight: 'bold'}}>Thrive!</Text>
                <Button style={{justifyContent: 'center',alignItems: 'center',backgroundColor:'black', height:80,width:80, marginLeft:250,marginTop:160}} title="LoginPage" onPress={() => navigation.navigate('LoginPage')}  >
                   <Icon name="arrow-right" size={20} color="white" /> 
                </Button>
            </View></ImageBackground>
        </>
    );
};

export default FirstPage;
