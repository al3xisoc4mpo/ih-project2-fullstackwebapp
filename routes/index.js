const router = require("express").Router();
const indexControllers = require("../controllers/indexControllers")

/* GET home page */
router.get("/", indexControllers.getHome);

/* GET profile page */
router.get("/profile", indexControllers.getProfile);

module.exports = router;
