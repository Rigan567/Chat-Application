const User = require("../models/People");
const bcrypt = require("bcryptjs");
// const { cookie } = require("express-validator");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const getLogin = (req, res, next) => {
  res.render("index");
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //generate cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        //set logged-in user in local identifier
        res.locals.loggedInUser = userObject;
        // console.log(cookie);
        res.render("inbox");
      } else {
        throw createError("Login Failed! Invalid Password");
      }
    } else {
      throw createError("Login Failed!");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },

      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const logout = (req, res) => {
  // clear cookie
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
};

module.exports = {
  getLogin,
  login,
  logout,
};
