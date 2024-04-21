//ChatbotApp.js

import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const ChatbotApp = () => {
	const [messages, setMessages] = useState([
		{
			_id: 1,
			text: "Hello! I am your SpendExpert. How can I help you?",
			createdAt: new Date(),
			user: { _id: 2, name: "Chatbot" },
		},
	]);

	const handleSend = (newMessages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);

		const userMessage = newMessages[0].text;
		const botResponse = generateChatbotResponse(userMessage);

		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, [
				{
					_id: Math.round(Math.random() * 1000000),
					text: botResponse,
					createdAt: new Date(),
					user: { _id: 2, name: "Chatbot" },
				},
			])
		);
	};

	const generateChatbotResponse = (userMessage) => {
		switch (userMessage.toLowerCase()) {
			case "hello":
				return "We're here to help you navigate your journey towards financial wellness. Whether you have questions about budgeting, saving, investing, or anything else related to your financial health, you're in the right place.\n need more information of our website ?\nOur website provides expense tracking at your fingertips. Would you like more information? \nYES \nNO";
			case "NO":
				return "byee !!"
			case "yes":
				return "Sure! Please choose from the following options:\n1. Why is financial literacy important?\n2. What is financial health?\n3. Still have doubts?";
			case "1":
			case "why is financial literacy important?":
				return "Financial literacy is important because it helps individuals make informed decisions about their personal finances and achieve financial well-being. It provides the knowledge and skills necessary to understand concepts such as budgeting, saving, investing, and managing debt.";
			case "2":
			case "what is financial health?":
				return "Financial health refers to the overall state of an individual's or organization's financial well-being. It encompasses various aspects such as income, expenses, savings, investments, and debt management.";
			case "3":
			case "still have doubts ?":
				return "Certainly! What question do you have?";
			case "end this conversation ?":
				return "Okay, feel free to reach out if you have any more questions in the future!";
			default:
				return "I'm sorry, I didn't understand that. Can you please rephrase?";
		}
	};

	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessages) => handleSend(newMessages)}
			user={{ _id: 1, name: "User" }}
		/>
	);
};

export default ChatbotApp;
