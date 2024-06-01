import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullName: {
        type : String,
        required : [true,'Please provide your fullname ']
    },
    email:{
        type : String,
        required : [true,' enter your enail']
    },
    password :{
        type : String,
        required : [true,'Please provide a password'],
        minLength :[6,'your password must be 6 did=gits ']
    },
    Image :{
        type : String,

    },
    isAdmin :{
    type : Boolean,
    default : false, 
    },
    likedMovies:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie',

    }],
},
{
    timestamps : true,
});


export default mongoose.model('user',userSchema);