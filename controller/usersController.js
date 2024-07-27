const bcrypt = require("bcryptjs");
const User = require("../models/People");
const { unlink } = require("fs");
const path = require("path");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    // console.log(result);
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown Error Occured !!",
        },
      },
    });
  }
  next();
};

const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "User was removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
};
module.exports = { getUsers, addUser, removeUser };
