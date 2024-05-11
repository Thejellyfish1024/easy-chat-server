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
// exports.getUsersService = async(data)=>{
//     const result = await User.find(data);
//     return result;
// }

