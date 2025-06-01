const express=require('express');
const app=express();

require('dotenv').config(); // at the top
app.use(express.json());
const connectDB = require('./config/dbConfig');
const usersRoute=require('./routes/usersRoute');
const transactionRoute=require('./routes/transactionsRoute');

app.use('/api/users',usersRoute);
app.use('/api/transactions',transactionRoute);

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});

