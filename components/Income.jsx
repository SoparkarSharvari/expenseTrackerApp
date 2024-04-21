import {TextInput, Button} from 'react-native';
import { styles } from '../style/styles';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react';
import { Text, View } from 'react-native';

function Income() {
    const [text, setText] = useState('');
    const [currency, setCurrency] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [multilineText, setMultilineText] = useState('');
  
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Enter text"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCurrency}
          value={currency}
          placeholder="Enter currency"
          keyboardType="numeric"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ marginRight: 10 }}>Select date:</Text>
          <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DatePicker
              testID="datePicker"
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Picker
          selectedValue={selectedOption}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
        <TextInput
          style={[styles.input, { height: 100 }]}
          onChangeText={setMultilineText}
          value={multilineText}
          placeholder="Enter multiline text"
          multiline
        />
        <Button title="Submit" onPress={() => console.log('Form submitted')} />
      </View>
    );
  };

  export default Income