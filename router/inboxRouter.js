const express = require("express");
const router = express.Router();
const { getInbox } = require("../controller/inboxController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");

router.get("/", decorateHTMLResponse("Inbox"), getInbox);

module.exports = router;
