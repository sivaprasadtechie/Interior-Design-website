const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/formdata'; // Replace 'formdata' with your DB name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema for the data
const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    num: { type: String, required: true },
    whatsapp: { type: Boolean, required: true },
    prop: { type: String, required: true }
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

// POST route to handle form submissions
app.post('/', async (req, res) => {
    try {
        const { name, email, num, whatsapp, prop } = req.body;

        // Validate the received data
        if (!name || !email || !num || !prop) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Save data to MongoDB
        const newFormData = new FormData({ name, email, num, whatsapp, prop });
        await newFormData.save();

        // Send success response
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'book.html'));
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



