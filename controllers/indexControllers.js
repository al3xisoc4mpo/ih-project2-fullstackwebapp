const User = require("../models/User");
const Dog = require("../models/Dog");
const Location = require("../models/Location");
const Review = require("../models/Review");

exports.getHome = (req, res) => {
  res.render("index");
};

exports.getProfile = async (req, res) => {
  const { currentUser } = req.session;

  const username = currentUser ? currentUser.username : "";
  const email = currentUser ? currentUser.email : "";
  const msg = currentUser ? currentUser.msg : "";

  const { _id } = req.session.currentUser;


  const userLocations = await Location.find({ host: _id }).populate({
    path: "reviews",
    model: "Review",
  });


  const userReviews = await Review.find({ user: _id }).populate({
    path: "location",
    model: "Location",
  });


  res.render("profile", { currentUser, userPets, userLocations, userReviews });
};

exports.getAddPet = (req, res) => {
  res.render("pets/add-pet");
};

exports.postAddPet = async (req, res) => {
  const { name, picture, breed, aboutMe } = req.body;
  const { _id } = req.session.currentUser;

  try {
    const newPet = await Dog.create({
      owner: _id,
      name,
      picture,
      breed,
      aboutMe,
    });


    const updatedUser = await User.findByIdAndUpdate(_id, {
      $push: { dogs: newPet._id },
    });


    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

exports.getUpdatePet = async (req, res) => {
  const { id } = req.params;

  try {
    const foundPet = await Dog.findById(id);
    res.render("pets/update-pet", { foundPet });
  } catch (error) {
    console.log(error);
  }
};

exports.postUpdatePet = async (req, res) => {
  const { id } = req.params;
  const { name, picture, breed, aboutMe } = req.body;
  const { _id } = req.session.currentUser;

  try {
    const foundPet = await Dog.findByIdAndUpdate(id, {
      owner: _id,
      name,
      picture,
      breed,
      aboutMe,
    });

    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeletePet = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;

  try {
    const deletedPet = await Dog.findByIdAndDelete(id);

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $pull: { dogs: deletedPet._id },
    });

    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
