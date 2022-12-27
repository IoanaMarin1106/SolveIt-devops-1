import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import problemRoutes from './routes/problems.js';
import userRoutes from './routes/users.js';
import batchRoutes from './routes/batch.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/problems', problemRoutes);
app.use('/users', userRoutes);
app.use('/batch', batchRoutes);

// const CONNECTION_URL = 'mongodb+srv://ediciurezu:OQh9FxplF5f9GJ0m@cluster0.8g72t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CONNECTION_URL = 'mongodb://root:test@mongodb:27017/?authMechanism=DEFAULT'
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
