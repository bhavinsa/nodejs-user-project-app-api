const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const projectController = require("../controller/project");
const projectAuth = require('../middleware/projectAuth');
router.post("/create", auth, projectController.create);
router.post("/", auth, projectController.getProject);
router.post("/addMembers", [auth, projectAuth], projectController.addMembers);
router.post("/removeMembers", [auth, projectAuth], projectController.removeMembers);
router.post("/delete", [auth, projectAuth], projectController.delete);
router.post("/assigned", auth, projectController.assigned);
router.post("/search", auth, projectController.search);

module.exports = router;