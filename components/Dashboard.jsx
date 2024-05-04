import React, {useEffect, useState} from 'react';
import { Text, View , StyleSheet, Image, FlatList,ScrollView ,Button as ReloadButton } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import InExMonthly from './InExMonthly';

function Dashboard() {
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');

  async function getTotalIncome(){
    axios.get("http://192.168.1.3:5002/totalIncome")
          .then(res=>{
            console.log(res.data.totalIncome);
            setTotalIncome(res.data.totalIncome)
          })
          .catch(e=>console.log(e))
  }

  async function getTotalExpense(){
    axios.get("http://192.168.1.3:5002/totalExpense")
          .then(res=>{
            console.log(res.data.totalExpense);
            setTotalExpense(res.data.totalExpense)
          })
          .catch(e=>console.log(e))
  }
  useFocusEffect(
    React.useCallback(() => {
      getTotalIncome();
      getTotalExpense();
    }, [])
  );
  const reloadAllComponents = () => {
    getTotalIncome();
    getTotalExpense();
  };

  const UserCard=({data})=>(
    <View style={styles.card}>
      <View style={styles.cardDetails}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={[styles.total, styles[data.sty]]}>Total: {data.total}</Text>
      </View>
    </View>
  )
    return (
    <ScrollView>
      <View style={styles.container}>
        <UserCard data={{ name: 'Income', total: totalIncome ,sty:'positive'}} />
        <UserCard data={{ name: 'Expense', total: totalExpense ,sty:'negative'}} />
        <ReloadButton title="Reload All" onPress={reloadAllComponents} />
        <InExMonthly/>
      </View>
    </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    userInfo: {
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 5,
    },
    userType: {
      fontSize: 18,
      color: '#777777',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    cardDetails: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 5,
    },
    email: {
      fontSize: 14,
      color: '#777777',
    },
    positive:{
      fontSize: 18,
      fontWeight: 'bold',
      color:'green',
      marginBottom: 5,
    },
    negative:{
      fontSize: 18,
      fontWeight: 'bold',
      color:'red',
      marginBottom: 5,
    }
  });
  export default Dashboard;