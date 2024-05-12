const User = require("./user.model");



exports.createUserService = async (data) => {
    const result = await User.create(data);
    return result;
}

exports.getSingleUserService = async (email) => {
    const result = await User.findOne({ email: email });
    return result;
}

exports.updateUserInfoService = async (email, data) => {
    const result = await User.findOneAndUpdate(
        { email: email },
        { $set: data },
        { new: true }
    );
    return result;
}

exports.getSearchedUsersService = async (query, email) => {

    const regexQuery = {
        $or: [
            { email: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
        ],
    }
    const result = await User.find(regexQuery);
    if (result) {
        const searchedUsers = result.filter(user => user?.email !== email)
        return searchedUsers;
    }
}

exports.checkContactExistService = async (currentUser, newContact) => {

    const isSameContactExist = await User.findOne({
        email: currentUser,
        contacts: newContact,
    });
    return isSameContactExist;
}

exports.checkRequestExistService = async (requestFrom, requestTo) => {
    // Check if the user already exists in the requests
    const isSameRequestExist = await User.findOne({
        email: requestTo,
        addRequests: requestFrom,
    });
    return isSameRequestExist;
}

exports.addNewContactService = async (currentUser, newContact) => {

    // Update the current user contacts by pushing the new contact's email
    console.log(currentUser, newContact);
    const updatedContacts = await User.findOneAndUpdate(
        { email: currentUser },
        { $addToSet: { contacts: newContact }, $pull: { addRequests: newContact } },
        { new: true }
    );
    // Update the other user contacts by pushing the new contact's email
    const updatedContactsForNewContact = await User.findOneAndUpdate(
        { email: newContact },
        { $addToSet: { contacts: currentUser } },
        { new: true }
    );

    if (updatedContacts && updatedContactsForNewContact) {
        return { update: true };
    }
}


exports.addNewRequestService = async (requestFrom, requestTo) => {

    // Update the add requests by pushing the new contact's email
    const updatedRequests = await User.findOneAndUpdate(
        { email: requestTo },
        { $addToSet: { addRequests: requestFrom } },
        { upsert: true, new: true }

    );

    return updatedRequests;
}

exports.declineRequestService = async (email, request) => {

    const result = await User.findOneAndUpdate(
        { email: email },
        { $pull: { addRequests: request } },
        { new: true }
    )

    return result;
}





