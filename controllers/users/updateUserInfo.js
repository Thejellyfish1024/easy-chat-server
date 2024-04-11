const updateUserInfo = async (req, res, userCollection) => {
    try {
        // console.log("hitting");
        // console.log("users in postMessage", users);
        const userInfo = req.body;
        const email = req?.params?.email;
        // console.log(newMessage);
        const result = await userCollection.updateOne({email : email}, userInfo);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = updateUserInfo;