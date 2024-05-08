const mongoose=require("mongoose")

//income schema
const incomeDetails=new mongoose.Schema({
    IncomeTitle:{
        type:String,
        required:true
    },
    IncomeAmount:{
        type:Number,
        required:true
    },
    date:{
        type: Date,
        required:true
      },
    IncomeType:{
        type:String,
        required:true
    },
    IncomeRef:{
        type:String,
        required:true
    }
},{ timestamps: true })

const collection= mongoose.model("collection",incomeDetails)

//Expense schema
const ExpenseDetails=new mongoose.Schema({
    ExpenseTitle:{
        type:String,
        required:true
    },
    ExpenseAmount:{
        type:Number,
        required:true
    },
    date:{
        type: Date,
        required:true
      },
    ExpenseType:{
        type:String,
        required:true
    },
    ExpenseRef:{
        type:String,
        required:true
    }
},{ timestamps: true })

const collection2 = mongoose.model("collection2",ExpenseDetails)

module.exports = {
    collection,
    collection2
  };
