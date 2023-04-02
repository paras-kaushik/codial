const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://paraskaushik12:3TB0bUBMWKPzaFDI@parascluster.cvgl4bo.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
