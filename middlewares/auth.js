const { getUser } = require("../service/auth");
async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  // console.log("Cookie UID:", userUid);

  if (!userUid) return res.redirect("/login");

  const user = await getUser(userUid);
  // console.log("Fetched User in Middleware:", user); 
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  // console.log("Cookie UID:", userUid);


  const user = await getUser(userUid);
  // console.log("Fetched User in Middleware:", user); 
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
