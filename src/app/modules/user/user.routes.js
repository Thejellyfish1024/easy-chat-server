const express = require("express");
const { createUser, getSingleUser, updateUserInfo } = require("./user.controller");

const router = express.Router();

router.get("/:email", getSingleUser);
router.post("/", createUser);
router.put("/update-user/:email", updateUserInfo);



//   app.get("/users/:email", async (req, res) =>
//     getSingleUser(req, res, userCollection)
//   );


module.exports = router;
