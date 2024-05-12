const express = require("express");
const { createUser, getSingleUser, updateUserInfo, getSearchedUsers } = require("./user.controller");

const router = express.Router();

router.get("/search", getSearchedUsers);
router.post("/", createUser);
router.put("/update-user/:email", updateUserInfo);
router.get("/:email", getSingleUser);



module.exports = router;
