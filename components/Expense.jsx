import {TextInput, Button} from 'react-native';
import { styles } from '../style/styles';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

function Expense() {
    const [text, setText] = useState('');
    const [currency, setCurrency] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [multilineText, setMultilineText] = useState('');
  
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
    };

    const handleExpenseData=()=>{
      const ExpenseData ={
        ExpenseTitle:text,
        ExpenseAmount:currency, 
        date:date,
        ExpenseType:selectedOption,
        ExpenseRef :multilineText
      };
        
      axios.post("http://192.168.41.40:5002/expense",ExpenseData)
            .then(res=>{console.log(res.data)
              setText('');
              setCurrency('');
              setDate(null);
              setSelectedOption('');
              setMultilineText('')
            })
            .catch(e=>console.log(e))
    }
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}> 
         <Text style={{ marginRight: 200, width: 100 }}>Expense title :</Text>
          <TextInput
            style={styles.inputbox}
            onChangeText={(value)=>setText(value)}
            value={text}
            placeholder="Expense title "
          />
          <Text style={{ marginRight: 190, width: 'max-content' }}>Expense Amount :</Text>
          <TextInput
            style={styles.inputbox}
            onChangeText={setCurrency}
            value={currency}
            placeholder="Enter currency"
            keyboardType="numeric"
          />
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ marginRight: 10 }}>Select date: {date ? date.toLocaleDateString() : ''}</Text>
        <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DatePicker
            testID="datePicker"
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Text style={{ marginRight: 200, width: 'auto' }}>Select a Option :</Text>
      <View style={{ borderColor: '#ddd', borderRadius: 4,height: 40, width: 300 ,borderWidth: 1,paddingBottom:49 }}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
          >
            <Picker.Item label="Home Expense" value="Home Expense" />
            <Picker.Item label="Personal Expense" value="Personal Expense" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
      </View>
      <View style={{ marginVertical: 10 }} />
          <Text style={{ marginRight: 200, width: 'auto' }}>Add a reference :</Text>
          <TextInput
            style={[styles.inputbox, { height: 70 }]}
            onChangeText={setMultilineText}
            value={multilineText}
            placeholder="Enter expense reference"
            multiline
          />
          <View style={{ borderRadius: 19, overflow: 'hidden' }}>
            <Button color='#ff338d' title="+   Add Expense" onPress={() => handleExpenseData()} />
          </View>
  
        </View>
      );
    };

  export default Expense;