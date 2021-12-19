const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'This feild is required.'
    },
    email:{
        type:String,
        required: 'This feild is required.'
    },
    mobile:{
        type:String,
        required: 'This feild is required.'
    },
    city:{
        type:String,
        required: 'This feild is required.'
    }
});

// studentSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"] + (\.[^<>()\[\]\\.,;:\s@"]+)*) | (".+"))@((\[0-9]{1,3}\.[0-9]{1,3})) / ;
//     return emailRegex.test(val);   
// },'Invalid email.');

mongoose.model('Student',studentSchema);
