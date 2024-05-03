import React ,{useState,useEffect}from 'react';
import { View, Text, Button, ScrollView  } from 'react-native';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const chartConfig = {
    backgroundGradientFrom: "#0E1726",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#283E51",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false
};
const screenWidth = Dimensions.get("window").width;

function DetailedView({ navigation,route}) {
    const { user, handleAuthentication } = route.params;
    const [Incomedata, setIncomeData] = useState(null);
    const [Expensedata, setExpenseData] = useState(null);
    useFocusEffect(
        React.useCallback(() => {
           fetchData();
           fetchData2();
        }, [])
      );
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.4:5002/income-details-by-month");
        setIncomeData(res.data);
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
        try {
          const res = await axios.get("http://192.168.1.4:5002/expense-details-by-month");
          setExpenseData(res.data);
          console.log(res.data)
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
    return (
        <ScrollView> 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, marginTop: 60 ,scrollable:true}}>
          <Text style={{fontSize:25,padding:4}}>Current Year Detailed view</Text>
          <View style={{ marginVertical: 10 }} />
          {Incomedata && (
            <LineChart
              data={Incomedata}
              width={screenWidth}
              height={256}
              verticalLabelRotation={40}
              chartConfig={chartConfig}
              bezier
            />
          )}
        <View style={{ marginVertical: 10 }} />
          {Expensedata && (
            <LineChart
              data={Expensedata}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          )}
        </View> 
        </ScrollView> 
      )
    }
  export default DetailedView;