// 1. IMPORTS
const router = require("express").Router();
const authController = require("../controllers/authControllers");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET sign up page */
router.get("/signup", isLoggedOut, authController.getSignUp);

/* POST sign up page */
router.post("/signup", isLoggedOut, authController.postSignUp);

/* GET login page */
router.get("/login", isLoggedOut, authController.getLogIn);

/* POST login page */
router.post("/login", isLoggedOut, authController.postLogIn);

/* POST logout page */
router.post("/logout", isLoggedIn, authController.postLogOut);

// 3. EXPORTS
module.exports = router;
