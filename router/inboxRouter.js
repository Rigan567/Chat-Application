const express = require("express");
const router = express.Router();
const { getInbox } = require("../controller/inboxController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.get("/", decorateHTMLResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
