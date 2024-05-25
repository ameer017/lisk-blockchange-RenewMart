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
router.get("/verify-email", verifyAccount);
router.get("/logout", logoutUser);


router.delete("/:id", deleteUser);
router.get("/:id", getUser);

module.exports = router;
