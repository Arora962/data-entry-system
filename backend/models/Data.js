import mongoose from 'mongoose';

// Define schema
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String
});

// Create and export the model
const Data = mongoose.model('Data', DataSchema);

export default Data;
