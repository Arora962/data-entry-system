import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Data from './models/Data.js';

dotenv.config();  // For environment variables

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// POST route to handle form submission
app.post('/api/submit', async (req, res) => {
  const { name, email, city } = req.body;

  const newData = new Data({ name, email, city });
  try {
    await newData.save();
    res.status(200).send({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error saving data' });
  }
});

// GET route to retrieve data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching data' });
  }
});

// DELETE route to delete data by ID
app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received delete request for ID: ${id}`); // Log the received ID

  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (deletedData) {
      console.log(`Deleted data:`, deletedData); // Log the deleted data
      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      console.error(`Data with ID ${id} not found`); // Log if no data found for the ID
      res.status(404).send({ message: 'Data not found' });
    }
  } catch (err) {
    console.error('Error deleting data:', err); // Log the error if something goes wrong
    res.status(500).send({ message: 'Error deleting data' });
  }
});

// PUT route to update data by ID
app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, city } = req.body;
  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { name, email, city },
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).send({ message: 'Error updating data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;