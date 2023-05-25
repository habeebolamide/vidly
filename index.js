const config =  require('config')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose =  require('mongoose')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const middleware = require('./middleware/auth')

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey is nor defined ');   
    process.exit(1)
}
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth)
app.use(middleware)
app.use(genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


mongoose.connect('mongodb://localhost/vidly').then(() => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));