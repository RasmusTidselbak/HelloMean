const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.js');

mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('open', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();
const port = 9000;
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', require('./routes/users.js'));

app.get('/', (req, res) => {
    res.send('HELLO MEAN!');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});