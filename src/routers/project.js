const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const projectController = require("../controller/project");

router.post("/create", auth, projectController.create);
router.post("/", auth, projectController.getProject);
router.post("/addMembers", auth, projectController.addMembers);
router.post("/removeMembers", auth, projectController.removeMembers);
router.post("/delete", auth, projectController.delete);

module.exports = router;