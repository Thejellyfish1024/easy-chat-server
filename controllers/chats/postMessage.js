const postMessage = async (req, res, chatCollection, io, users) => {
    try {
        // console.log("hitting");
        // console.log("users in postMessage", users);
        const newMessage = req?.body;
        // console.log(newMessage);
        const result = await chatCollection.insertOne(newMessage);
        if (result?.insertedId) {
            const receiver = users?.find(user => user?.userEmail === newMessage?.receiver);
            io.to(receiver?.socketId).emit("getMessage", {
                refetch: true
            });
            res.send(result)
        }
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = postMessage;