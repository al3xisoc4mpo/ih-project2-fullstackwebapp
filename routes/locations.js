// 1. IMPORTS
const router = require("express").Router();
const locationsControllers = require("../controllers/locationsControllers");
const reviewsControllers = require("../controllers/reviewsControllers")
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

// 2. ROUTING

/* GET all locations */
router.get("/", locationsControllers.getLocations);

/* GET location create */
router.get("/create", locationsControllers.getCreate);

/* POST location create */
router.post("/create", locationsControllers.postCreate);

/* GET location update */
router.get("/:id/update", locationsControllers.getUpdateLocation);

/* POST location update */
router.post("/:id/update", locationsControllers.postUpdateLocation);

/* GET location details */
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
