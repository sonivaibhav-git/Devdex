const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { Profile,DeleteProfile ,getMyProjects,addTechnologies} = require("../controller/profile.controller");
const router  = express.Router();

router.get("/me",authMiddleware,Profile);
router.delete("/me/delete",authMiddleware,DeleteProfile)
router.get("/me/projects",authMiddleware,getMyProjects)
router.post("/technologies",authMiddleware,addTechnologies);


module.exports = router