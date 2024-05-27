const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  verifyAccount,
  logoutUser,
  deleteUser,
} = require("../handler/userHandler");
const { authenticateToken } = require("../utils");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.patch("/verify", verifyAccount);
router.post("/logout", logoutUser);
router.get("/me", authenticateToken, getUser);

router.delete("/:id", deleteUser);

module.exports = router;
