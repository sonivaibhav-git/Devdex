const express = require("express");
const { logout, refresh, login, register } = require("../controller/auth.controller");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const { validateRegisterSchema } = require("../validators/register.validators.js");

router.post("/register",validate(validateRegisterSchema),register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/refresh",refresh);
module.exports = router;