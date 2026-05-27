const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validator.middleware");
const {getOneProject,addProject,delProject,UpdateProject,allProject} = require("../controller/project.controller.js");
const { validateProjectSchema } = require("../validators/project.validators.js");

const router  = express.Router();

router.post("/create",authMiddleware,validate(validateProjectSchema),addProject);
router.get("/project/:id",getOneProject);
router.get("/all/:technology",allProject);
router.delete("/project/:id",authMiddleware,delProject);
module.exports = router