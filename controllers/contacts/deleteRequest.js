const deleteRequest = async (req, res, userCollection) => {
    try {
        // console.log('hitting');
        const email = req?.params?.email;
        const { request } = req?.body;
        // console.log(email, request);
        const result = await userCollection.updateOne(
            { email: email },
            { $pull: { addRequests: request } }
        )
        res.send(result);
    } catch (error) {
        console.log("error to getting user database", error);
    }
};

module.exports = deleteRequest;