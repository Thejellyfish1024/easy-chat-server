const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: String
        },
        time: {
            type: Number
        },
    }
    ,
    { timestamps: true }
)



const Chat = mongoose.model('chat', chatSchema);


module.exports = Chat;
