// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig =async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')  
  try {
    conn.connection.on('connected', () => {
      console.log('MongoDB connected')
    })
    conn.connection.on('error', (err) => {
      console.log(`MongoDB connection error: ${err}`)
      process.exit(1)
    })
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`)
    process.exit(1)
  }



}

module.exports = dbConfig;