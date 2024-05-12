const { createUserService, getSingleUserService, updateUserInfoService, getSearchedUsersService } = require("./user.service");

// function for creating new user
exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await createUserService(data);
        return res.status(200).json({
            status: "Success",
            message: "User created successful",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
        });
    }
}


exports.getSingleUser = async (req, res) => {
    try {
        const email = req?.params?.email;
        const result = await getSingleUserService(email);
        if (result) {
            return res.status(200).json(result);
        }
        else {
            return res.status(200).json({
                message: "No user with this email is available"
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
        });
    }
}

exports.updateUserInfo = async (req, res) => {
    try {
        const email = req?.params?.email;
        const data = req?.body;
        const result = await updateUserInfoService(email, data);
        if (result) {
            return res.status(200).json({
                status: "Success",
                update: true
            });
        }
        else {
            return res.status(200).json({
                message: "Update is unsuccessful",
                update: false
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error,
            update: false
        });
    }
}
exports.getSearchedUsers = async (req, res) => {
    try {
        const { query, email } = req?.query;
        const result = await getSearchedUsersService(query,email);
        if (result) {
            return res.status(200).json({
                status: "Success",
                data: result
            });
        }
        else {
            return res.status(200).json({
                message: "No user is found",
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!!",
            error: error
        });
    }
}