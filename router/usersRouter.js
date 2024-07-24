const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

//users page
router.get("/", decorateHTMLResponse("Users"), getUsers);

//add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

//removeUser
router.delete("/:id", removeUser);

module.exports = router;
