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
const updateUserAbout = async (req, res, userCollection) => {
    try {
        // console.log("hitting");
        const updatedAbout = req.body.updatedSection;
        // console.log("updated Name", updatedAbout);
        const email = req?.params?.email;
        // console.log("email", email);
        const updateDoc = {
            $set: {
                about: updatedAbout
            },
        };
        const result = await userCollection.updateOne({ email: email }, updateDoc);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};
const updateUserPhone = async (req, res, userCollection) => {
    try {
        // console.log("hitting");
        const updatedPhone = req.body.updatedSection;
        // console.log("updated Name", updatedPhone);
        const email = req?.params?.email;
        // console.log("email", email);
        const updateDoc = {
            $set: {
                phone: updatedPhone
            },
        };
        const result = await userCollection.updateOne({ email: email }, updateDoc);
        res.send(result)
    } catch (error) {
        console.log("error to add new message in database", error);
    }
};

module.exports = {
    updateUserName,
    updateUserAbout,
    updateUserPhone
  };