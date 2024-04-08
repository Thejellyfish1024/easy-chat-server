const getSpecificChats = async (req, res, chatCollection) => {
    try {
        // console.log('hitting');
        const { sender, receiver } = req?.query
        // console.log(sender, receiver);
        const result = await chatCollection.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).toArray();
        res.send(result)
    } catch (error) {
        console.log("error to getting user database", error);
    }
};

module.exports = getSpecificChats;