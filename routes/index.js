const express = require("express");
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const projectRoutes = require("./project.routes");
const problemRoutes = require("./problem.routes");
const searchRoutes = require("./search.routes");
const router = express.Router();

router.use("/auth",authRoutes);
router.use("/profile",profileRoutes);
router.use("/projects",projectRoutes);
router.use("/problem",problemRoutes);
router.use("/search",searchRoutes);
module.exports = router