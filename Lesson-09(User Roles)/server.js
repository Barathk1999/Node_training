//waterfall flow
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

//custom middleware logger

app.use(logger);


app.use(credentials);

app.use(cors(corsOptions)); // cross origin resource sharing.

app.use(express.urlencoded(/* Options */{extended: false}));
 
app.use(express.json());

//middleware fir cookies
app.use(cookieParser());

app.use('/',express.static(path.join(__dirname, '/public')));

app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }
    else{
        res.type('txt').send("404 Not Found");
    }
     //302 is the default code. But we need to use 301.
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //302 is the default code. But we need to use 301.
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));