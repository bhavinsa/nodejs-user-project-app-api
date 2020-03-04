const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const userController = require("../controller/user");


router.post("/", userController.users);
router.post("/login", userController.login);
router.post("/me", auth, userController.me);
router.post("/search", auth, userController.search);
router.post("/logout", auth, userController.logout);
router.post("/logoutAll", auth, userController.logoutAll);
router.post("/delete", auth, userController.delete);

module.exports = router;