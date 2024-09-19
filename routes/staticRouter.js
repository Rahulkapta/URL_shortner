const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/", restrictTo(['NORMAL']), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allURLS = await URL.find({ createdBy: req.user._id });
  return res.render("Home", { urls: allURLS });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;