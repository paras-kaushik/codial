/*2023 Creating a social media backend website* */
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
// used for session cookie with passport-local
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');// for sending flash with res
const cors=require('cors');

const app = express();
const port = 8000;

//8.
app.use(cors());
//6.  mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://paraskaushik12:3TB0bUBMWKPzaFDI@parascluster.cvgl4bo.mongodb.net/?retryWrites=true&w=majority',
            autoRemove: 'disabled'
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);// res.locals gets set of authenticated so views can render content

// 7. Flash messages are store in session cookie - we need to do this after session middleware
app.use(flash());
app.use(customMware.setFlash);

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
