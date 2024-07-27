const express = require("express");
const router = express.Router();
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  doLoginValidators,
  loginValidatorsHandlers,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const page_title = "Login";
//login page
router.get("/", decorateHTMLResponse(page_title), redirectLoggedIn, getLogin);

router.post(
  "/",
  decorateHTMLResponse(page_title),
  doLoginValidators,
  loginValidatorsHandlers,
  login
);

router.delete("/", logout);

module.exports = router;
