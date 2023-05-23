const Joi = require('joi');
const mongoose =  require('mongoose')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rental = require('./routes/rentals');
const express = require('express');
const app = express();

app.use(express.json());
app.use(genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rental);

mongoose.connect('mongodb://localhost/vidly').then(() => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));