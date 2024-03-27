const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please add a valid email'
        ]
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        minlength:6,
        select: false
    },
    tel:{
        type: String,
        required: [true,'Please add a telephone number']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createAt:{
        type:Date,
        default:Date.now
    },
    isGoogleAccount: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;