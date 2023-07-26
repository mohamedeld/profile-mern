const express= require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoSanitize  = require('express-mongo-sanitize');
const morgan = require('morgan');
const globalHandleErrors = require('./controller/errorController');
const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(helmet());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit:'100kb'}));

app.use((request,response,next)=>{
    response.status(404).json({
        status:404,
        message:'Not Found'
    })
});

app.use(globalHandleErrors);

module.exports = app;