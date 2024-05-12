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



