const express = require("express");
const { createUser, getSingleUser, updateUserInfo, getSearchedUsers, addNewContact, addNewRequest, declineRequest } = require("./user.controller");
const upload = require("../../middlewares/multer.middleware");

const router = express.Router();

router.post("/", createUser);
router.put("/update-user/:email", upload.single("image"), updateUserInfo);
router.get("/search", getSearchedUsers);
router.put("/add-request", addNewRequest);
router.put("/add-contact", addNewContact);
router.put("/delete-request/:email", declineRequest);
router.get("/:email", getSingleUser);



module.exports = router;
