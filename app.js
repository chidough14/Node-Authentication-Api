const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const passport = require('passport');

// Connect to darabase
mongoose.connect(config.database);
let db = mongoose.connection;

// check connection
db.once('open', function(){
    console.log('Connected to mongodb');
});

// check for db errors
db.on('error', function(err){
    console.log(err);
});

// Init app
const app = express();

const port = 5000;

// cors middleware
app.use(cors());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));


//Body parser middleware
app.use(bodyParser.json());


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', require('./routes/users'));

// Index route
app.get('/', (req, res) => {
   res.send('Incalid Endpoint');
});


// start server
app.listen(port, () => {
        console.log('Server started on port ' +port);
    }
);