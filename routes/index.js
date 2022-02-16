const router = require("express").Router();
const indexControllers = require("../controllers/indexControllers")
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", indexControllers.getHome);

/* GET profile page */
router.get("/profile", isLoggedIn, indexControllers.getProfile);

/* GET add pet profile page */
router.get("/profile/add-pet", isLoggedIn, indexControllers.getAddPet);

/* POST add pet profile page */
router.post("/profile/add-pet", isLoggedIn, indexControllers.postAddPet);

/* GET edit pet profile page */
router.get("/profile/update-pet/:id", isLoggedIn, indexControllers.getUpdatePet);

/* POST edit pet profile page */
router.post("/profile/update-pet/:id", isLoggedIn, indexControllers.postUpdatePet);

/* POST delete pet profile page */
router.post("/profile/delete-pet/:id", isLoggedIn, indexControllers.postDeletePet);

module.exports = router;
