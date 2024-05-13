import {TextInput, Button} from 'react-native';
import { styles } from '../style/styles';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, {useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

function UpdateExpense({route}) {
    const { id } = route.params; 

    const [ExpenseData, setExpenseData] = useState({
        ExpenseTitle:'',
        ExpenseAmount:'', 
        date:new Date(),
        ExpenseType:'',
        ExpenseRef :''
      });
      const [showDatePicker, setShowDatePicker] = useState(false);
    
      useEffect(() => {
        // Fetch existing income data based on the provided id
        const fetchIncomeData = async () => {
          try {
            const response = await axios.get(`http://192.168.41.40:5002/expense/${id}`);
            setExpenseData(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching income data:', error);
          }
        };
        fetchIncomeData();
      }, [id]);
    
      const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || ExpenseData.date;
        setShowDatePicker(false);
        setExpenseData({ ...ExpenseData, date: new Date(currentDate) });
      };
      


  const  handleUpdateExpenseData = () => {
    // Send PUT request to update income data
    axios.put(`http://192.168.41.40:5002/expense/${id}`, {
        ...ExpenseData,
        ExpenseAmount: parseInt(ExpenseData.ExpenseAmount) // Parse to number
      })
      .then(res => {
        console.log(res.data);
        // Reset input fields
        setExpenseData({
            ExpenseTitle:'',
            ExpenseAmount:'', 
            date:'',
            ExpenseType:'',
            ExpenseRef :''
        });
      })
      .catch(e => console.log(e));
  };
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}> 
         <Text style={{ marginRight: 200, width: 100 }}>Expense title :</Text>
          <TextInput
            style={styles.inputbox}
            onChangeText={value => setExpenseData({ ...ExpenseData, ExpenseTitle: value })}
            value={ExpenseData.ExpenseTitle}
            placeholder="Expense title "
          />
          <Text style={{ marginRight: 190, width: 'max-content' }}>Expense Amount :</Text>
          <TextInput
            style={styles.inputbox}
            onChangeText={value => setExpenseData({ ...ExpenseData, ExpenseAmount: value })}
            value={ExpenseData.ExpenseAmount.toString()}
            placeholder="Enter currency"
            keyboardType="numeric"
          />
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ marginRight: 10 }}>Select date: {ExpenseData.date.toLocaleString()}</Text>
        <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DatePicker
            testID="datePicker"
            value={ new Date()}
            mode="date"
            display={ExpenseData.date}
            onChange={handleDateChange}
          />
        )}
      </View>
      <Text style={{ marginRight: 200, width: 'auto' }}>Select a Option :</Text>
      <View style={{ borderColor: '#ddd', borderRadius: 4,height: 40, width: 300 ,borderWidth: 1,paddingBottom:49 }}>
          <Picker
           selectedValue={ExpenseData.ExpenseType}
           onValueChange={itemValue => setExpenseData({ ...ExpenseData, ExpenseType: itemValue })}
          >
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
      </View>
      <View style={{ marginVertical: 10 }} />
          <Text style={{ marginRight: 200, width: 'auto' }}>Add a reference :</Text>
          <TextInput
            style={[styles.inputbox, { height: 70 }]}
            onChangeText={value => setExpenseData({ ...ExpenseData, ExpenseRef: value })}
            value={ExpenseData.ExpenseRef}
            placeholder="Enter expense reference"
            multiline
          />
          <View style={{ borderRadius: 19, overflow: 'hidden' }}>
            <Button color='#ff338d' title="+   Add Expense" onPress={() => handleUpdateExpenseData()} />
          </View>
  
        </View>
      );
    };

  export default UpdateExpense;