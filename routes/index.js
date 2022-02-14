const router = require("express").Router();
const indexControllers = require("../controllers/indexControllers")
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", indexControllers.getHome);

/* GET profile page */
router.get("/profile", isLoggedIn, indexControllers.getProfile);

module.exports = router;
