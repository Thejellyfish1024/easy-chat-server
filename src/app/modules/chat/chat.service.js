const Chat = require("./chat.model");

exports.postMessageService = async (data) => {
    const result = await Chat.create(data);
    return result;
}

exports.getSpecificChatsService = async (sender, receiver) => {

    const result = await Chat.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    });
    if (result) {
        return result;
    }
}
exports.deleteMessageService = async (id) => {
    
    const result = await Chat.deleteOne({_id: id})
    return result;
}
