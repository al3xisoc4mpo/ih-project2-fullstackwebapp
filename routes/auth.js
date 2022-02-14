// 1. IMPORTS
const router = require("express").Router();
const authController = require("../controllers/authControllers");
// const routeGuard = require("../middlewares/route-guard");

/* GET sign up page */
router.get("/signup", authController.getSignUp);

/* POST sign up page */
router.post("/signup", authController.postSignUp);

/* GET login page */
router.get("/login", authController.getLogIn);

/* POST login page */
router.post("/login", authController.postLogIn);

/* POST logout page */
router.post("/logout", authController.postLogOut);

// 3. EXPORTS
module.exports = router;
