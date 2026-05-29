
const express = require("express");

const router = express.Router();

const {GlobalSearch} = require("../controller/search.controller");

const {validateQuery} = require("../middlewares/queryValidator.middleware");

const {searchQuerySchema} = require("../validators/search.validator");

router.get("/",validateQuery(searchQuerySchema),GlobalSearch);

module.exports = router;