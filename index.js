/*2023 Creating a social media backend website* */
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
//5. allowing us to read and write to cookies and reading post requests
app.use(cookieParser());
app.use(express.urlencoded());

//4. Setting up static files access
app.use(express.static('./assets'));

//3. Use layouts and extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// 2. set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//1. use express routes
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
// mongo password: 3TB0bUBMWKPzaFDI
