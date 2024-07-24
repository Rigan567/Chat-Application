const express = require("express");
const router = express.Router();
const { getLogin } = require("../controller/loginController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");

//login page
router.get("/", decorateHTMLResponse("Login"), getLogin);

module.exports = router;
