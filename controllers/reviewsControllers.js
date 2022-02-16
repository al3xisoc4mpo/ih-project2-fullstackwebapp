// 1. IMPORTS
const mongoose = require("mongoose");
const Review = require("../models/Review");
const Dog = require("../models/Dog");
const Location = require("../models/Location");
const User = require("../models/User");

exports.getCreateReview = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const location = await Location.findById(id);
    // console.log(location);
    const userPets = await Dog.find({ owner: _id });
    // console.log(userPets);
    return res.render("reviews/create-review", {
      location,
      userPets,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCreateReview = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  const { dogs, rating, comment } = req.body;

  try {
    const newReview = await Review.create({
      user: _id,
      location: id,
      dogs,
      rating,
      comment,
    });

    const updatedLocation = await Location.findByIdAndUpdate(id, {
      $push: { reviews: newReview._id },
    });

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $push: { reviews: newReview._id },
    });

    return res.redirect(`/locations/${id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getUpdateReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    const dogs = await Dog.find({ owner: review.user });
    console.log(review);
    return res.render("reviews/update-review", {
      review,
      dogs,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postUpdateReview = async (req, res) => {
  const { id } = req.params;
  const { dogs, rating, comment } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, {
      dogs,
      rating,
      comment,
    });

    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    const deletedUserRelation = await User.findByIdAndUpdate(
      deletedReview.user,
      {
        $pull: { reviews: deletedReview._id },
      }
    );
    const deletedLocationRelation = await Location.findByIdAndUpdate(
      deletedReview.location,
      {
        $pull: { reviews: deletedReview._id },
      }
    );
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
