const postMessage = async (req, res, chatCollection) => {
    try {
        // console.log("hitting");
        const newMessage = req.body;
        // console.log(newMessage);
        const result = await chatCollection.insertOne(newMessage);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = postMessage;