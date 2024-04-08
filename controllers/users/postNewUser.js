const postNewUser = async (req, res, userCollection) => {
    try {
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = postNewUser;