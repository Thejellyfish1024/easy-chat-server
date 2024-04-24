const { ObjectId } = require("mongodb");

const deleteMessage = async (req, res, chatCollection) => {
    try {
        // console.log('hitting');
        const id = req?.params?.id;
        const result = await chatCollection.deleteOne({_id:new ObjectId(id)})
        res.send(result);
    } catch (error) {
        console.log("error to getting user database", error);
    }
};

module.exports = deleteMessage;