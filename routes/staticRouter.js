const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async(req, res) => {
  const allURLS =await URL.find({});
  return res.render("Home", { urls: allURLS });
});

module.exports = router;
