// 1. IMPORTS
const router = require("express").Router();
const locationsControllers = require("../controllers/locationsControllers");
const reviewsControllers = require("../controllers/reviewsControllers")
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

// 2. ROUTING

/* GET all locations COMPLETED */
router.get("/", locationsControllers.getLocations);

/* GET location create COMPLETED */
router.get("/create", locationsControllers.getCreateLocation);

/* POST location create COMPLETED */
router.post("/create", locationsControllers.postCreateLocation);

/* GET location update COMPLETED */
router.get("/:id/update", locationsControllers.getUpdateLocation);

/* POST location update COMPLETED*/
router.post("/:id/update", locationsControllers.postUpdateLocation);

/* POST location delete COMPLETED */
router.post("/:id/delete", locationsControllers.postDeleteLocation);

/* GET location details COMPLETED */
router.get("/:id", locationsControllers.getLocationDetails);

/* GET create review for location COMPLETED*/
router.get("/:id/create-review", reviewsControllers.getCreateReview);

/* POST create review for location COMPLETED*/
router.post("/:id/create-review", reviewsControllers.postCreateReview);

/* GET update review for location COMPLETED*/
router.get("/:id/update-review", reviewsControllers.getUpdateReview);

/* POST update review for location COMPLETED*/
router.post("/:id/update-review", reviewsControllers.postUpdateReview);

/* POST delete review for location COMPLETED */
router.post("/:id/delete-review", reviewsControllers.postDeleteReview);

module.exports = router;
