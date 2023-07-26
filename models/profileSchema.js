const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company:{
        type:String,
        required:[true,'please enter your company']
    },
    website:String,
    location:{
        type:String,
        required:[true,'please enter your location']
    },
    status:{
        type:String,
        required:[true,'please enter your status']
    },
    skills:{
        type:[String],
        required:[true,'please enter your skills']
    },
    bio:{
        type:String,
        required:[true,'please enter your bio']
    },
    githubusername:{
        type:String,
        required:[true,'please enter your github username']
    },
    experience:[
        {
            title:{
                type:String,
                required:[true,'please enter your experience title']
            },
            company:{
                type:String,
                required:[true,'please enter your company']
            },
            location:{
                type:String,
                required:[true,'please enter your location']
            },
            from:{
                type:Date,
                required:[true,'please enter your from date']
            },
            to:{
                type:Date,
                required:[true,'please enter your to date']
            },
            current:{
                type:Boolean,
                default:false,
                required:[true,'please enter your current status']
            },
            description:{
                type:String,
                required:[true,'please enter your description']
            }
        }
    ],
    education:[
        {
            school:{
                type:String,
                required:[true,'please enter your school']
            },
            degree:{
                type:String,
                required:[true,'please enter your degree']
            },
            fieldOfStudy:{
                type:String,
                required:[true,'please enter your field of study']
            },
            from:{
                type:Date,
                required:[true,'please enter your from date']
            },
            to:{
                type:Date,
                required:[true,'please enter your to date']
            },
            current:{
                type:Boolean,
                default:false,
                required:[true,'please enter your current status']
            },
            description:{
                type:String,
                required:[true,'please enter your description']
            }
        }
    ],
    social:{
        youtube:String,
        linkedin:String,
        facebook:String,
        twitter:String,
        instagram:String
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});
profileSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name avatar'
    });
    next();
})
module.exports = mongoose.model('Profile',profileSchema);