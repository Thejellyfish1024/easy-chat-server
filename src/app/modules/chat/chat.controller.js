const { getIO, getUsers } = require("../../socket/socket");
const { postMessageService, getSpecificChatsService, deleteMessageService } = require("./chat.service");

// function for getting specific messages
exports.getSpecificChats = async (req, res) => {
    try {
        const { sender, receiver } = req?.query;
        // console.log(sender, receiver);
        const result = await getSpecificChatsService(sender, receiver);
        return res.status(200).json({
            status: "Success",
            message: "Message created successful",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
        });
    }
}
// function for creating new message
exports.postMessage = async (req, res) => {
    try {
        const users = getUsers();
        const io = getIO();
        const newMessage = req.body;
        const result = await postMessageService(newMessage);
        if (result) {
            const receiver = users?.find(user => user?.userEmail === newMessage?.receiver);
            io?.to(receiver?.socketId)?.emit("getMessage", {
                refetch: true
            });
            return res.status(200).json({
                status: "Success",
                message: "Message created successful",
                data: result,
                insert: true
            });
        }


    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
        });
    }
}
// function for deleting message
exports.deleteMessage = async (req, res) => {
    try {
        const id = req?.params?.id;
        const result = await deleteMessageService(id);
        return res.status(200).json({
            status: "Success",
            message: "Deletion was successful",
            data: result,
            deleted: true
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
        });
    }
}


//   app.delete("/delete-message/:id", async (req, res) =>
//     deleteMessage(req, res, chatCollection)
//   );