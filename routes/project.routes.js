const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {getOneProject,addProject,delProject,UpdateProject,allProject} = require("../controller/project.controller.js")

const router  = express.Router();

router.post("/create",authMiddleware,addProject);
router.get("/project/:id",getOneProject);
router.get("/all/:technology",allProject);
router.delete("/project/:id",authMiddleware,delProject);
module.exports = router