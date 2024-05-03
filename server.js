const express =require('express');
const app=express()
const mongoose =require("mongoose")
app.use(express.json());
const mongoUrl ="mongodb+srv://sharvarisoparkar:GDPSys2TdxYrtHEf@cluster0.6f98846.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl).then(()=>{
    console.log("database connected !!")
}).catch((e)=>{
    console.log(e)
})
app.get("/",(req,res)=>{
    res.send({status:"started"})
})
app.listen(5002,()=>{
    console.log("server is running");
})

require('./Schema')
const IncomeDet = mongoose.model('collection')

app.post('/income', async (req, res) => {
    const { IncomeTitle, IncomeAmount, date, IncomeType, IncomeRef } = req.body;
    try {
        const income = await IncomeDet.create({
            IncomeTitle,
            IncomeAmount,
            date,
            IncomeType,
            IncomeRef
        });
        console.log("Income created:", income);
        res.status(201).send({ status: "ok", data: "Income details created" });
    } catch (error) {
        console.error("Error creating income:", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

const ExpenseDet = mongoose.model('collection2')
app.post('/expense', async (req, res) => {
    const { ExpenseTitle, ExpenseAmount, date, ExpenseType, ExpenseRef } = req.body;
    try {
        const expense = await ExpenseDet.create({
            ExpenseTitle,
            ExpenseAmount,
            date,
            ExpenseType,
            ExpenseRef
        });
        console.log("Expense created:", expense);
        res.status(201).send({ status: "ok", data: "Expense details created" });
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

//GET TOTAL INCOME

app.get("/totalIncome", async (req,res)=>{
    try{
        const totalIncome = await IncomeDet.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$IncomeAmount" }
                }
            }
        ]);
        if (totalIncome.length > 0) {
            res.status(200).json({ totalIncome: totalIncome[0].totalAmount });
        } else {
            res.status(404).json({ error: "No income records found." });
        }
    }catch(error){
        return res.send({error:error});
    }
})

//GET TOTAL EXPENSE

app.get("/totalExpense", async (req,res)=>{
    try{
        const totalExpense = await ExpenseDet.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$ExpenseAmount" }
                }
            }
        ]);
        if (totalExpense.length > 0) {
            res.status(200).json({ totalExpense: totalExpense[0].totalAmount });
        } else {
            res.status(404).json({ error: "No income records found." });
        }
    }catch(error){
        return res.send({error:error});
    }
})

//monthly income 
app.get('/income-details-by-month', async (req, res) => {
    try {
      // Aggregate income details by month
      const aggregatedData = await IncomeDet.aggregate([
        {
          $group: {
            _id: { $month: "$date" },
            totalIncome: { $sum: "$IncomeAmount" }
          }
        }
      ]);
  
      // Prepare data for the chart
      const labels = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const datasets = [{
        data: labels.map(month => {
          const dataPoint = aggregatedData.find(item => item._id === (labels.indexOf(month) + 1));
          return dataPoint ? dataPoint.totalIncome : 0;
        }),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }];
      
      const chartData = { labels, datasets };
  
      res.json(chartData);
    } catch (error) {
      console.error("Error fetching income details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//monthly expense

  app.get('/expense-details-by-month', async (req, res) => {
    try {
      // Aggregate income details by month
      const aggregatedData = await ExpenseDet.aggregate([
        {
          $group: {
            _id: { $month: "$date" },
            totalIncome: { $sum: "$ExpenseAmount" }
          }
        }
      ]);
      // Prepare data for the chart
      const labels = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const datasets = [{
        data: labels.map(month => {
          const dataPoint = aggregatedData.find(item => item._id === (labels.indexOf(month) + 1));
          return dataPoint ? dataPoint.totalIncome : 0;
        }),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }];
      
      const chartData = { labels, datasets };
  
      res.json(chartData);
    } catch (error) {
      console.error("Error fetching expense details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });