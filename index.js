const express= require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoSanitize  = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const globalHandleErrors = require('./controller/errorController');
const app = express();

// import all routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');

// limit nums of request
app.use(express.json({ limit: '20kb' }));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(xss())
const limiter = rateLimit({
    windowMs: 24 * 60 * 3, // next request to endpoint
    max: 100, // maximal request for all endpoint
    message: 'To many request, send back request after 3 minutes',
  });
app.use('/', limiter);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//all routes
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/post',postRoutes);

app.use((request,response,next)=>{
    response.status(404).json({
        status:404,
        message:'Not Found'
    })
});

app.use(globalHandleErrors);

module.exports = app;