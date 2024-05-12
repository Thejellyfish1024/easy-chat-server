const { createUserService, getSingleUserService, updateUserInfoService, getSearchedUsersService, addNewContactService, checkContactExistService, checkRequestExistService, addNewRequestService, declineRequestService } = require("./user.service");

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
                error: "No user with this email is available",
                exist: false
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
        const result = await getSearchedUsersService(query, email);
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

exports.addNewContact = async (req, res) => {
    try {
        const { currentUser, newContact } = req.body;

        //         Check if the user already exists in the contacts
        const isSameContactExist = await checkContactExistService(currentUser, newContact);

        if (isSameContactExist) {
            return res.send({ error: "User already exists in the contacts" });
        }

        const result = await addNewContactService(currentUser, newContact);
        if (result?.update) {
            return res.status(200).json({
                status: "Success",
                update: true
            });
        }
        else {
            return res.status(200).json({
                message: "Update was not successful",
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

exports.addNewRequest = async (req, res) => {
    try {
        const { requestFrom, requestTo } = req.body;

        //         Check if the user already exists in the contacts
        const isSameRequestExist = await checkRequestExistService(requestFrom, requestTo);

        if (isSameRequestExist) {
            return res.send({ error: "Already add request sent" });
        }

        const result = await addNewRequestService(requestFrom, requestTo);
        if (result) {
            return res.status(200).json({
                status: "Success",
                data: result,
                update: true
            });
        }
        else {
            return res.status(200).json({
                message: "Update was not successful",
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

exports.declineRequest = async (req, res) => {
    try {
        const email = req?.params?.email;
        const { request } = req?.body;

        const result = await declineRequestService(email, request);
        if (result) {
            return res.status(200).json({
                status: "Success",
                data: result,
                update: true
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





