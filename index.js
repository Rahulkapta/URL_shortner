const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // to support data coming from form
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/url", restrictTo(['NORMAL']), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));