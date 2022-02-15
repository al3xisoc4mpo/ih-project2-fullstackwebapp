// 1. IMPORTS
const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const Location = require("../models/Location");

// 2. CONTROLLERS

exports.getLocations = async(req, res) => {
  const allLocations = await Location.find({})
  return res.render("locations/locations",{
    location: allLocations
  });
};

exports.getCreate = (req, res) => {
  res.render("locations/location-create");
};

exports.postCreate = async (req, res) => {
  // console.log(req.body)
  const { name, image, country, city, price, guests, classification } =
    req.body;
  const rating = 0;
  const host = req.session.currentUser.username;

  const newLocation = await Location.create({
    name,
    image,
    country,
    city,
    price,
    guests,
    classification,
    rating,
    host,
  });

  console.log(newLocation);

  res.redirect("/locations");
};
