import React, { useState, useEffect } from 'react';
import { ScrollView,View } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { app } from '../firebase/firebaseConfig'; // Import Firebase initialization
import AuthScreen from '../screens/AuthScreen';
import AuthenticatedScreen from '../screens/AuthenticatedScreen';
import { styles } from '../style/styles';
import Chatbot from './Chatbot';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    
    const handleAuthentication = async () => {
      try {
        if (user) {
          // If user is already authenticated, log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };
  
    return (
      <>
        <View style={styles.container}>
          {user ? (
            // Show user's email if user is authenticated
            <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
          ) : (
            // Show sign-in or sign-up form if user is not authenticated
            <AuthScreen
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleAuthentication={handleAuthentication}
            />
          )}
        </View>
      </>
    )};
export default LoginPage;