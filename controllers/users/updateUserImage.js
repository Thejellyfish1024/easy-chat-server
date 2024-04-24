const updateUserImage = async (req, res, userCollection) => {
    try {
        // console.log('hitting', req.body);
        const filter = { email: req?.params?.email };
        const { image } = req?.body;
        const updateOperation = {
            $set: { image: image }
        };

        await userCollection.findOneAndUpdate(filter, updateOperation);
        res.send({ update: true });

    } catch (error) {
        console.log("error to add new contact in database", error);
    }
};

module.exports = updateUserImage;

