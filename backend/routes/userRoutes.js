const express = require("express");
const { register, login } = require("../controller/userController");

//funcctions to give to the API calls import.

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
