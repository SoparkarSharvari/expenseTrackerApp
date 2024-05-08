import {TextInput, Button} from 'react-native';
import { styles } from '../style/styles';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, {useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';


function UpdateIncome({ route }) {
  const { id } = route.params;
  const [incomeData, setIncomeData] = useState({
    IncomeTitle: '',
    IncomeAmount: '',
    date: new Date(), // Provide a default date value
    IncomeType: '',
    IncomeRef: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Fetch existing income data based on the provided id
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.3:5002/income/${id}`);
        setIncomeData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };
    fetchIncomeData();
  }, [id]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || incomeData.date;
    setShowDatePicker(false);
    setIncomeData({ ...incomeData, date: new Date(currentDate) });
    console.log(typeof incomeData.date);
  };
  

  const handleIncomeData = () => {
    // Send PUT request to update income data
    axios.put(`http://192.168.1.3:5002/income/${id}`, {
        ...incomeData,
        IncomeAmount: parseInt(incomeData.IncomeAmount) // Parse to number
      })
      .then(res => {
        console.log(res.data);
        // Reset input fields
        setIncomeData({
          IncomeTitle: '',
          IncomeAmount: '',
          date: '',
          IncomeType: '',
          IncomeRef: '',
        });
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Text style={{ marginRight: 200, width: 100 }}>Income title :</Text>
      <TextInput
        style={styles.inputbox}
        onChangeText={value => setIncomeData({ ...incomeData, IncomeTitle: value })}
        value={incomeData.IncomeTitle}
        placeholder="Income title"
      />
      <Text style={{ marginRight: 200, width: 'max-content' }}>Income Amount :</Text>
      <TextInput
        style={styles.inputbox}
        onChangeText={value => setIncomeData({ ...incomeData, IncomeAmount: value })}
        value={incomeData.IncomeAmount.toString()}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
    <Text style={{ marginRight: 10 }}>Select date: {incomeData.date.toLocaleString()}</Text>
    <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
    {showDatePicker && (
        <DatePicker
        testID="datePicker"
        value={new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
        )}

    </View>
      <Text style={{ marginRight: 200, width: 'auto' }}>Select an Option :</Text>
      <View style={{ borderColor: '#ddd', borderRadius: 4, height: 40, width: 300, borderWidth: 1, paddingBottom: 49 }}>
        <Picker
          selectedValue={incomeData.IncomeType}
          onValueChange={itemValue => setIncomeData({ ...incomeData, IncomeType: itemValue })}
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
        onChangeText={value => setIncomeData({ ...incomeData, IncomeRef: value })}
        value={incomeData.IncomeRef}
        placeholder="Enter income reference"
        multiline
      />
      <View style={{ borderRadius: 19, overflow: 'hidden' }}>
        <Button color="#ff338d" title="+   Add Income" onPress={handleIncomeData}></Button>
      </View>
    </View>
  );
}

export default UpdateIncome;

