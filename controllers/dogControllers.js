// 1.IMPORTS

const { get } = require("express/lib/response");
const mongoose = require("mongoose");
const Dog = require("../models/Dog")

// 2. ROUTING

exports.getDogs = async (req, res) => {
  try {
    const allDogs = await Dog.find({}).populate({
      path: "owner",
      model: "User",
    });

    return res.render("pets/all-pets", {
      dogs: allDogs,
    });
  } catch (error) {
    console.log(error);
  }
};