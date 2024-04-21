import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ChatbotApp from './ChatbotApp';
 
const Chatbot = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ChatbotApp />
        </SafeAreaView>
    );
};
 
export default Chatbot;