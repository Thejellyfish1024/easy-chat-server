const express = require("express");
const { createUser, getSingleUser } = require("./user.controller");

const router = express.Router();

router.get("/:email", getSingleUser);
router.post("/", createUser);



//   app.get("/users/:email", async (req, res) =>
//     getSingleUser(req, res, userCollection)
//   );


module.exports = router;
