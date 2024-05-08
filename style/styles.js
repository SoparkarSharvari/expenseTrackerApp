import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      backgroundColor: '#EBEDEF',
    },
    container1: {
        width: '100%',
        marginTop:0,
        maxWidth: 700,
        backgroundColor:'pink',
          flexGrow: 1,
          backgroundColor: 'white',
        },
    authContainer: {
      width: 300,
      maxWidth: 400,
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    title: {
        width:'100%',
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
    },
    buttonContainer: {
      marginBottom: 16,
    },
    toggleText: {
      color: '#3498db',
      textAlign: 'center',
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
    ProfileButton:{
      margin:30
    },
    inputbox:{
      height: 40,
      width:300,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
    },
  });