const contactRequests = async (req, res, userCollection) => {
    try {
        const {requestFrom, requestTo}  = req.body;
        console.log("request from", requestFrom);
        console.log("request to", requestTo);

        // Check if the user already exists in the contacts
        const isSameContactExist = await userCollection.findOne({
            email: requestTo,
            addRequests: { $in: [requestFrom] },
        });
        console.log("exist", isSameContactExist);

        if (isSameContactExist) {
            return res.send({ error: "Already add request sent" });
        }

        // Update the add requests by pushing the new contact's email
        const updatedRequests = await userCollection.updateOne(
            { email: requestTo },
            { $addToSet: { addRequests: requestFrom } },
            { upsert: true }
        );

        
        if (updatedRequests?.modifiedCount) {
            res.send({ update: true })
        }

    } catch (error) {
        console.log("error to add new contact in database", error);
    }
};

module.exports = contactRequests;

