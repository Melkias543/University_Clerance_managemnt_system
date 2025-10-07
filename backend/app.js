// const express = require('express');
import express from 'express';
// const index = require('./routeIndex');
import index from './routeIndex.js';
// const cors = require('cors')
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/dbConfig.js';
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT||2002
// app.use(cors)

connectDB();
// ROUTES ENTRY POINT
app.use('/api',index)


app.listen(port, () => {
  console.log(`Server is runing at port ${port}`);
});