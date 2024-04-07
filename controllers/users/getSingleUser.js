const getSingleUser = async (req, res, userCollection) => {
    try {
        // console.log('hitting');
      const email = req?.params.email;
      // console.log(email);
      const result = await userCollection.findOne({ email: email })
      res.send(result);
    } catch (error) {
        console.log("error to getting user database", error);
    }
};

module.exports = getSingleUser;