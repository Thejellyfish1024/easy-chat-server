const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String
        },
        about: {
            type: String
        },
        phone: {
            type: String
        },
        addRequests: {
            type: Array
        },
        contacts: {
            type: Array
        },
    }
    ,
    { timestamps: true }
)



const User = mongoose.model('user', userSchema);


module.exports = User;
