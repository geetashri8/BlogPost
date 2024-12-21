require('dotenv').config();
 const express = require('express');
 const app = express();

 const mongoose = require('mongoose');

 const expenseSchema = new mongoose.Schema({
    expense_amount:Number,
    expense_category:String,
    expense_date:String,
    expense_total:Number
 });



 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("listening  on port "+process.env.PORT);
    });
 })
 .catch(err => console.log(err));
