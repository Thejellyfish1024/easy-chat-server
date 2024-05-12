const express = require("express");
const { postMessage, getSpecificChats, deleteMessage } = require("./chat.controller");

const router = express.Router();


router.get("/", getSpecificChats);
router.post("/", postMessage);
router.delete("/:id", deleteMessage);



module.exports = router;
