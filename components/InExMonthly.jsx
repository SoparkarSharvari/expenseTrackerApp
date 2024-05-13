import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import UpdateIncome from './UpdateIncome';

const InExMonthly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const incomeResponse = await axios.get('http://192.168.41.40:5002/monthlyIncome');
      const expenseResponse = await axios.get('http://192.168.41.40:5002/monthlyExpense');
      setIncomes(incomeResponse.data);
      setExpenses(expenseResponse.data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setError('Error fetching data. Please try again later.');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchMonthlyData()
    }, [])
  );

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://192.168.41.40:5002/${type}/${id}`);
      fetchMonthlyData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleUpdate = async (id, type) => {
    try {
      if (type === 'monthlyIncome') {
        navigation.navigate('UpdateIncome', { id }); // Navigate to UpdateIncome component with id parameter
      } else {
        navigation.navigate('UpdateExpense', { id }); // Navigate to UpdateExpense component with id parameter
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Monthly Incomes</Text>
      <FlatList
        data={incomes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text>Title: {item.IncomeTitle}</Text>
              <Text>Amount: {item.IncomeAmount}</Text>
              <Text>Type: {item.IncomeType}</Text>
              <Text>Reference: {item.IncomeRef}</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40, padding: 2 }}>
              <Button style={{ backgroundColor: 'white', marginHorizontal: 77, marginRight: 5 }} color="black" title="Update" onPress={() => handleUpdate(item._id, 'monthlyIncome')} />
              <Button title="Delete" onPress={() => handleDelete(item._id, 'monthlyIncome')} />
            </View>
          </View>
        )}
      />

      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Monthly Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text>Title: {item.ExpenseTitle}</Text>
              <Text>Amount: {item.ExpenseAmount}</Text>
              <Text>Type: {item.ExpenseType}</Text>
              <Text>Reference: {item.ExpenseRef}</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40, padding: 2 }}>
              <Button style={{ backgroundColor: 'white', marginHorizontal: 77, marginRight: 5 }} color="black" title="Update" onPress={() => handleUpdate(item._id, 'monthlyExpense')}/>
              <Button title="Delete" onPress={() => handleDelete(item._id, 'monthlyExpense')} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default InExMonthly;
