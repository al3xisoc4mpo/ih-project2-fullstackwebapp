const User = require("../models/User");
const Dog = require("../models/Dog");
const Location = require("../models/Location");
const Review = require("../models/Review");

exports.getHome = (req, res) => {
  res.render("index");
};

exports.getProfile = async (req, res) => {
  // console.log("session:", req.session);
  const { currentUser } = req.session;

  const username = currentUser ? currentUser.username : "";
  const email = currentUser ? currentUser.email : "";
  const msg = currentUser ? currentUser.msg : "";

  const { _id } = req.session.currentUser;

  const userPets = await Dog.find({ owner: _id });
  // console.log(userPets);

  const userLocations = await Location.find({ host: _id });

  // console.log(userLocations);

  const userReviews = await Review.find({ user: _id })
  .populate({
    path: "location",
    model: "Location",
  });
  // console.log(userReviews);

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

    console.log(newPet);

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $push: { dogs: newPet._id },
    });

    console.log(updatedUser);

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
    console.log(foundPet);
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
    console.log(deletedPet);
    const updatedUser = await User.findByIdAndUpdate(_id, {
      $pull: { dogs: deletedPet._id },
    });
    console.log(updatedUser);
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
