const mongoose =require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');
dotenv.config('.env');

process.on('uncaughtException',(err)=>{
    console.log('Uncaught Exception',err);
    process.exit(1);
});

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    family:4
}).then(()=>{
    console.log('Connected to Database Successfully');
    app.listen(PORT,()=>{
        console.log(`App is running on port ${PORT}`);
    })
}).catch(err=> console.error(err));
process.on('unhandledRejection', (err)=>{
    console.log('Unhandled rejection',err);
    process.exit(1);
});
