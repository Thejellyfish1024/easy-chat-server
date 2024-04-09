const postNewContact = async (req, res, userCollection) => {
    try {
        const { currentUser, newContact } = req.body;
        console.log(currentUser, newContact);

        // Check if the user already exists in the contacts
        const isSameContactExist = await userCollection.findOne({
            email: currentUser,
            contacts: { $in: [newContact] },
        });

        if (isSameContactExist) {
            return res.send({ error: "User already exists in the contacts" });
        }

        // Update the current user contacts by pushing the new contact's email
        const updatedContacts = await userCollection.updateOne(
            { email: currentUser },
            { $addToSet: { contacts: newContact } }
        );
        // Update the other user contacts by pushing the new contact's email
        const updatedContactsForNewContact = await userCollection.updateOne(
            { email: newContact },
            { $addToSet: { contacts: currentUser } }
        );

        if (updatedContacts?.modifiedCount && updatedContactsForNewContact?.modifiedCount) {
            res.send({ update: true })
        }

        console.log("current", updatedContacts);
        console.log("other", updatedContactsForNewContact);

        // const result = await userCollection.insertOne(newUser);
        // res.send(result)
    } catch (error) {
        console.log("error to add new contact in database", error);
    }
};

module.exports = postNewContact;

