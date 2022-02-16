// 1. IMPORTS
const mongoose = require("mongoose");
const Location = require("../models/Location");
const Review = require("../models/Review");
const User = require("../models/User");
const Dog = require("../models/Dog");

// 2. CONTROLLERS

exports.getLocations = async (req, res) => {
  try {
    const allLocations = await Location.find({});
    return res.render("locations/all-locations", {
      location: allLocations,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCreateLocation = (req, res) => {
  return res.render("locations/location-create");
};

exports.postCreateLocation = async (req, res) => {
  console.log(req.body)
  const { name, image, country, city, price, guests } = req.body;
  const rating = 0;
  const { _id } = req.session.currentUser;

  const newLocation = await Location.create({
    name,
    image,
    country,
    city,
    price,
    guests,
    rating,
    host: _id,
  });

  // console.log(newLocation);

  const updatedUser = await User.findByIdAndUpdate(_id, {
    $push: { locations: newLocation._id },
  });

  // console.log(updatedUser);

  res.redirect("/locations");
};

exports.getUpdateLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const foundLocation = await Location.findById(id);
    res.render("locations/location-update", { foundLocation });
  } catch (error) {
    console.log(error);
  }
};

exports.postUpdateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, image, country, city, price, guests } = req.body;

  try {
    const updatedLocation = await Location.findOneAndUpdate(id, {
      name,
      image,
      country,
      city,
      price,
      guests,
    });
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLocation = await Location.findOneAndDelete(id);

    const deletedUserRelation = await User.findByIdAndUpdate(
      deletedLocation.host,
      {
        $pull: { locations: deletedLocation._id },
      }
    );

    const deletedReviewsRelation = await Review.deleteMany({
      locations: deletedLocation.host,
    });

    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

exports.getLocationDetails = async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id)
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
      },
    });
  console.log(location);
  res.render("locations/location-detail", {
    location,
  });
};

exports.getLocationCreateReview = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const location = await Location.findById(id);
    console.log(location);
    const userPets = await Dog.find({ owner: _id });
    console.log(userPets);
    return res.render("locations/location-create-review", {
      location,
      userPets,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postLocationAddReview = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  const { dogs, rating, comment } = req.body;
  try {
    const location = await Location.findById(id);

    const newReview = await Review.create({
      user: _id,
      location,
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
