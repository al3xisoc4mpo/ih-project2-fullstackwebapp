// 1. IMPORTS
const router = require("express").Router();
const locationsControllers = require("../controllers/locationsControllers");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET all locations */
router.get("/", locationsControllers.getLocations);

/* GET profile page */
router.get("/create", locationsControllers.getCreate);

/* GET profile page */
router.post("/create", locationsControllers.postCreate);

module.exports = router;
