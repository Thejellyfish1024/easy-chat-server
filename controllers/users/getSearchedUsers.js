const getSearchedUsers = async (req, res, userCollection) => {
    try {
        // console.log('hitting');
        const { query, email } = req?.query;
        // console.log(query, email);
        const regexQuery = {
            $or: [
                { email: { $regex: query, $options: "i" } },
                { name: { $regex: query, $options: "i" } },
            ],
        }
        const result = await userCollection.find(regexQuery).toArray();
        if (result) {
            const searchedUsers = result.filter(user => user?.email !== email)
            // console.log(searchedUsers);
            res.send(searchedUsers);
        }
    } catch (error) {
        console.log("error to getting user database", error);
    }
};

module.exports = getSearchedUsers;