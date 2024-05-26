const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  verifyAccount,
  logoutUser,
  deleteUser,
} = require("../handler/userHandler");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.patch("/verify-email", verifyAccount);
router.get("/logout", logoutUser);
router.get("/get-user", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
