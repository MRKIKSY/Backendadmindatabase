const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", authMiddleware, userController.updateUserById);
router.delete("/:id", authMiddleware, userController.deleteUserById);

module.exports = router;
