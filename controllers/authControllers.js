const mongoose = require("mongoose");
// Handles password encryption
const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.getSignUp = (req, res) => {
  res.render("auth/signup");
};

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.render("auth/signup", {
      errorMessage:
        "Your password must at least include 8 characters, a number, a lowercase and an uppercase letter.",
    });
  }

  // How many rounds should bcrypt run the salt (default [10 - 12 rounds])
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      username,
      email,
      passwordHash: passwordHash,
    });


    return res.redirect("/profile");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage:
          "Username and email need to be unique. Either username or email is already used.",
      });
    } else {
      console.log(error);
    }
  }
};

exports.getLogIn = (req, res) => {
  res.render("auth/login");
};

exports.postLogIn = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.render("auth/login", {
      errorMessage: "Email is not registered. Try with other email.",
    });
    return;
  }

  const verifiedPass = await bcrypt.compareSync(password, user.passwordHash);

  if (!verifiedPass) {
    res.render("auth/login", {
      errorMessage: "Incorrect password provided",
    });
    return;
  }

  req.session.currentUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    msg: "This is your ticket",
  };

  return res.redirect("/profile");
};

exports.postLogOut = (req, res) => {

	req.session.destroy((error) => {

		if(error){
			console.log(error)
			return
		}

		res.redirect("/")


	})

}