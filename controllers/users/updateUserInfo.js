const updateUserName = async (req, res, userCollection) => {
    try {
        // console.log("hitting");
        const updatedName = req.body.updatedSection;
        // console.log("updated Name", updatedName);
        const email = req?.params?.email;
        // console.log("email", email);
        const updateDoc = {
            $set: {
                name: updatedName
            },
        };
        const result = await userCollection.updateOne({ email: email }, updateDoc);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = updateUserName;